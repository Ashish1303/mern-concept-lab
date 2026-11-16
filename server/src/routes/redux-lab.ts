import { Router } from 'express';
import { HttpError } from '../middleware/errors.js';

interface Task { id: number; title: string }
interface Workspace { tasks: Task[]; nextId: number; reads: number; touched: number }
const workspaceId = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i;
const lifetime = 10 * 60_000;

export function createReduxLabRouter() {
  const router = Router();
  const workspaces = new Map<string, Workspace>();

  function workspace(id: string) {
    if (!workspaceId.test(id)) throw new HttpError(400, 'INVALID_WORKSPACE', 'Use a lab workspace ID.');
    const now = Date.now();
    for (const [key, entry] of workspaces) if (now - entry.touched > lifetime) workspaces.delete(key);
    let entry = workspaces.get(id);
    if (!entry) {
      if (workspaces.size >= 128) throw new HttpError(429, 'LAB_CAPACITY', 'Too many active lab workspaces. Try again later.');
      entry = { tasks: [{ id: 1, title: 'Read Redux' }, { id: 2, title: 'Try RTK Query' }, { id: 3, title: 'Review tests' }], nextId: 4, reads: 0, touched: now };
      workspaces.set(id, entry);
    }
    entry.touched = now;
    return entry;
  }

  function title(body: unknown) {
    if (!body || typeof body !== 'object' || !('title' in body) || typeof body.title !== 'string' ||
      !body.title.trim() || body.title.length > 60 || Object.keys(body).some(key => !['title', 'fail'].includes(key)) ||
      ('fail' in body && typeof body.fail !== 'boolean')) {
      throw new HttpError(400, 'INVALID_TASK', 'Use a title from 1 to 60 characters.');
    }
    return body.title.trim();
  }

  router.use((_request, response, next) => { response.setHeader('Cache-Control', 'no-store'); next(); });
  router.get('/users', (_request, response) => response.json({ data: [{ id: 1, name: 'Ada' }, { id: 2, name: 'Grace' }] }));
  router.get('/profile', (request, response) => {
    // This published teaching value exercises HTTP authentication flow without real credentials.
    if (request.get('authorization') !== 'Bearer redux-lab-demo') {
      throw new HttpError(401, 'DEMO_AUTH_REQUIRED', 'A demo session is required.');
    }
    response.json({ data: { name: 'Ada', role: 'reader' } });
  });
  router.get('/:workspace/tasks', (request, response) => {
    const { page = '0', fail = '0' } = request.query;
    if (Object.keys(request.query).some(key => key !== 'page' && key !== 'fail') ||
      typeof page !== 'string' || !/^(0|[1-9][0-9]?)$/.test(page) || (fail !== '0' && fail !== '1')) {
      throw new HttpError(400, 'INVALID_TASK_QUERY', 'Use page 0–99 and fail 0 or 1.');
    }
    if (fail === '1') throw new HttpError(503, 'DEMO_UNAVAILABLE', 'Controlled task service failure.');
    const entry = workspace(request.params.workspace);
    const start = (Number(page) - 1) * 2;
    response.json({ data: page === '0' ? entry.tasks : entry.tasks.slice(start, start + 2), total: entry.tasks.length, read: ++entry.reads });
  });
  router.post('/:workspace/tasks', (request, response) => {
    const name = title(request.body);
    const entry = workspace(request.params.workspace);
    if (entry.tasks.length >= 20) throw new HttpError(409, 'TASK_LIMIT', 'The lab list can hold up to 20 tasks.');
    const task = { id: entry.nextId++, title: name };
    entry.tasks.push(task);
    response.status(201).json({ data: task });
  });
  router.get('/:workspace/tasks/:id', (request, response) => {
    const entry = workspace(request.params.workspace);
    const task = entry.tasks.find(task => String(task.id) === request.params.id);
    if (!task) throw new HttpError(404, 'TASK_NOT_FOUND', 'Task not found.');
    response.json({ data: task });
  });
  router.patch('/:workspace/tasks/:id', (request, response) => {
    const name = title(request.body);
    const entry = workspace(request.params.workspace);
    const task = entry.tasks.find(task => String(task.id) === request.params.id);
    if (!task) throw new HttpError(404, 'TASK_NOT_FOUND', 'Task not found.');
    if (request.body.fail === true) {
      // The delay makes the optimistic preview observable before the server rejects it.
      const timer = setTimeout(() => response.status(409).json({ error: { code: 'DEMO_CONFLICT' } }), 450);
      response.once('close', () => clearTimeout(timer));
      return;
    }
    task.title = name;
    response.json({ data: task });
  });
  router.delete('/:workspace/tasks/:id', (request, response) => {
    const entry = workspace(request.params.workspace);
    const index = entry.tasks.findIndex(task => String(task.id) === request.params.id);
    if (index < 0) throw new HttpError(404, 'TASK_NOT_FOUND', 'Task not found.');
    entry.tasks.splice(index, 1);
    response.json({ data: { id: Number(request.params.id) } });
  });
  return router;
}
