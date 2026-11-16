import { Router } from 'express';
import { HttpError } from '../middleware/errors.js';

// Fixed teaching data, not database persistence. No user-supplied URLs or queries.
const items = [
  { id: 1, name: 'Ada', role: 'engineer' },
  { id: 2, name: 'Grace', role: 'engineer' },
  { id: 3, name: 'Linus', role: 'maintainer' }
];
export const labRouter = Router();
labRouter.post('/ack', (request, response) => {
  const body: unknown = request.body;
  if (!body || typeof body !== 'object' || !('label' in body) || typeof body.label !== 'string' || !body.label.trim() || body.label.length > 40 || Object.keys(body).some(key => !['label', 'fail', 'slow'].includes(key))) throw new HttpError(400, 'INVALID_BODY', 'Use a nonempty label up to 40 characters.');
  const fail = 'fail' in body ? body.fail : false;
  const slow = 'slow' in body ? body.slow : false;
  if (typeof fail !== 'boolean' || typeof slow !== 'boolean') throw new HttpError(400, 'INVALID_BODY', 'fail and slow must be booleans.');
  const label = body.label.trim();
  response.setHeader('Cache-Control', 'no-store');
  const timer = setTimeout(() => {
    if (response.destroyed) return;
    if (fail) response.status(503).json({ ok: false, error: { code: 'LAB_FAILURE', message: 'Controlled acknowledgement failure.' }, requestId: response.locals.requestId });
    else response.json({ ok: true, data: { label, persisted: false }, requestId: response.locals.requestId });
  }, slow ? 800 : 100);
  response.once('close', () => clearTimeout(timer));
});
labRouter.get('/items', (request, response) => {
  const allowed = new Set(['q', 'delay', 'fail']);
  if (Object.keys(request.query).some((key) => !allowed.has(key))) throw new HttpError(400, 'INVALID_QUERY', 'Unknown lab query parameter.');
  const { q = '', delay = '0', fail = '0' } = request.query;
  if (typeof q !== 'string' || q.length > 40 || typeof delay !== 'string' || !/^\d+$/.test(delay) || Number(delay) > 1200 || (fail !== '0' && fail !== '1')) throw new HttpError(400, 'INVALID_QUERY', 'Use q up to 40 characters, delay 0–1200 ms, and fail 0 or 1.');
  response.setHeader('Cache-Control', 'no-store');
  const timer = setTimeout(() => {
    if (response.destroyed) return;
    if (fail === '1') {
      response.status(503).json({ ok: false, error: { code: 'LAB_FAILURE', message: 'Controlled lab failure.' }, requestId: response.locals.requestId });
    } else {
      response.json({ ok: true, data: items.filter((item) => item.name.toLowerCase().includes(q.toLowerCase())), requestId: response.locals.requestId });
    }
  }, Number(delay));
  response.once('close', () => clearTimeout(timer));
});
