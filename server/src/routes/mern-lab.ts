import { Blob, File } from 'node:buffer';
import { randomBytes, randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import express, { Router } from 'express';
import type { Request, RequestHandler } from 'express';
import mongoose from 'mongoose';
import type { Connection } from 'mongoose';
import { HttpError } from '../middleware/errors.js';
import { disposeMongoLab, isDuplicate, objectId, openMongoLab } from './mongo-tools.js';
import { hashPassword, issueAccess, matchesPassword, newRefreshToken, readAccess, refreshDigest } from './mern-auth.js';
import type { Role } from './mern-auth.js';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  category: { type: String, required: true }
});
type Account = { username: string; salt: string; hash: string; role: Role };
type Refresh = { digest: string; username: string; role: Role; expires: number };
interface Workspace {
  connection: Connection;
  key: Buffer;
  active: number;
  authAttempts: number[];
  expired: boolean;
  releaseJob?: Promise<void>;
  timer: ReturnType<typeof setTimeout>;
}

function items(scope: Workspace) {
  return scope.connection.models.LabItem as ReturnType<typeof modelItems>;
}
function modelItems(connection: Connection) {
  return connection.model('LabItem', itemSchema, 'mern_items');
}
const bad = (message: string) => new HttpError(400, 'INVALID_MERN_INPUT', message);
function titleOf(body: unknown) {
  if (!body || typeof body !== 'object' || !('title' in body) || typeof body.title !== 'string' ||
      body.title.trim().length < 3 || body.title.length > 60) throw bad('Use a title from 3 to 60 characters.');
  return body.title.trim();
}
function credentials(body: unknown) {
  if (!body || typeof body !== 'object' || !('username' in body) || !('password' in body) ||
      typeof body.username !== 'string' || !/^[a-z][a-z0-9-]{2,23}$/.test(body.username) ||
      typeof body.password !== 'string' || body.password.length < 8 || body.password.length > 64) {
    throw bad('Use a teaching username and an 8–64 character sample password.');
  }
  return { username: body.username, password: body.password };
}
function validId(req: Request) {
  const id = req.params.id;
  if (typeof id !== 'string') throw bad('Select a valid item.');
  return objectId(id);
}
function authAccounts(scope: Workspace) { return scope.connection.db!.collection<Account>('mern_accounts'); }
function authRefresh(scope: Workspace) { return scope.connection.db!.collection<Refresh>('mern_refresh'); }
async function session(scope: Workspace, username: string, role: Role) {
  const refresh = newRefreshToken();
  await authRefresh(scope).insertOne({ digest: refreshDigest(refresh), username, role, expires: Date.now() + 120_000 });
  return { access: issueAccess(username, role, scope.key), refresh, role };
}

export function createMernLab(port?: number, mode = 'development') {
  const router = Router();
  const workspaces = new Map<string, Workspace>();
  let opening = 0;
  const lifetime = 180_000;
  async function release(id: string, scope: Workspace) {
    if (scope.releaseJob) return scope.releaseJob;
    clearTimeout(scope.timer);
    scope.releaseJob = disposeMongoLab(scope.connection).finally(() => { workspaces.delete(id); });
    return scope.releaseJob;
  }
  function expire(id: string, scope: Workspace) {
    scope.expired = true;
    if (scope.active) {
      scope.timer = setTimeout(() => expire(id, scope), 500);
      scope.timer.unref();
      return;
    }
    void release(id, scope).catch(() => {});
  }

  router.use((_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
  router.post('/workspaces', async (_req, res) => {
    if (!port) throw new HttpError(503, 'DB_LAB_DISABLED', 'Start the dedicated MongoDB lab and configure MONGO_LAB_PORT.');
    if (workspaces.size + opening >= 12) throw new HttpError(429, 'MERN_LAB_BUSY', 'The lab has reached its workspace limit.');
    opening++;
    let connection: Connection | undefined;
    try {
      connection = await openMongoLab(port);
      const Item = modelItems(connection);
      await Item.insertMany([{ title: 'Express Guide', category: 'web' }, { title: 'Mongo Notes', category: 'db' }, { title: 'React Patterns', category: 'web' }]);
      const id = randomUUID();
      const scope: Workspace = { connection, key: randomBytes(32), active: 0, authAttempts: [], expired: false,
        timer: setTimeout(() => expire(id, scope), lifetime) };
      scope.timer.unref();
      workspaces.set(id, scope);
      res.status(201).json({ data: { id } });
    } catch (error) {
      if (connection) await disposeMongoLab(connection);
      throw error;
    } finally { opening--; }
  });

  const lookup: RequestHandler = (req, res, next) => {
    const id = req.params.workspace;
    const scope = typeof id === 'string' ? workspaces.get(id) : undefined;
    if (!scope || scope.expired || scope.releaseJob) throw new HttpError(404, 'WORKSPACE_EXPIRED', 'Restart the demo to open a new workspace.');
    res.locals.scope = scope;
    next();
  };
  router.delete('/workspaces/:workspace', lookup, async (req, res) => {
    const scope = res.locals.scope as Workspace;
    if (scope.active) {
      clearTimeout(scope.timer);
      expire(String(req.params.workspace), scope);
      res.status(202).end();
      return;
    }
    await release(String(req.params.workspace), scope);
    res.status(204).end();
  });

  const api = Router({ mergeParams: true });
  router.use('/workspaces/:workspace', lookup, api);
  api.use((_req, res, next) => {
    const scope = res.locals.scope as Workspace;
    if (scope.active >= 4) throw new HttpError(429, 'MERN_LAB_BUSY', 'Wait for the pending requests.');
    scope.active++;
    res.once('close', () => { scope.active--; });
    next();
  });
  api.get('/items', async (req, res) => {
    const { q = '', sort = 'asc', page = '1', slow = '0', fail = '0' } = req.query;
    if (typeof q !== 'string' || q.length > 60 || (sort !== 'asc' && sort !== 'desc') ||
        typeof page !== 'string' || !/^[1-9][0-9]?$/.test(page) ||
        (slow !== '0' && slow !== '1') || (fail !== '0' && fail !== '1')) throw bad('Invalid list options.');
    if (slow === '1') await delay(650);
    if (fail === '1') throw new HttpError(503, 'FIXTURE_FAILURE', 'Controlled service failure. Retry the healthy request.');
    const Item = items(res.locals.scope);
    const filter = q ? { title: { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } } : {};
    const direction = sort === 'asc' ? 1 : -1;
    const pageSize = 2;
    const [rows, total] = await Promise.all([
      Item.find(filter).sort({ title: direction, _id: 1 }).skip((Number(page) - 1) * pageSize).limit(pageSize).lean(),
      Item.countDocuments(filter)
    ]);
    res.json({ data: { rows, total, page: Number(page), pageSize } });
  });
  api.post('/items', async (req, res) => {
    const Item = items(res.locals.scope);
    const title = titleOf(req.body);
    if (await Item.countDocuments() >= 30) throw new HttpError(409, 'ITEM_LIMIT', 'The workspace is full.');
    const item = await Item.create({ title, category: 'lab' });
    res.status(201).json({ data: item });
  });
  api.patch('/items/:id', async (req, res) => {
    const id = validId(req);
    const title = titleOf(req.body);
    if (req.body.reject === true) {
      await delay(650);
      throw new HttpError(409, 'FIXTURE_CONFLICT', 'The server rejected the optimistic edit.');
    }
    const item = await items(res.locals.scope).findByIdAndUpdate(id, { title }, { returnDocument: 'after', runValidators: true }).lean();
    if (!item) throw new HttpError(404, 'ITEM_NOT_FOUND', 'Item not found.');
    res.json({ data: item });
  });
  api.delete('/items/:id', async (req, res) => {
    const result = await items(res.locals.scope).deleteOne({ _id: validId(req) });
    if (!result.deletedCount) throw new HttpError(404, 'ITEM_NOT_FOUND', 'Item not found.');
    res.status(204).end();
  });

  api.use(['/register', '/login', '/refresh'], (_req, res, next) => {
    const scope = res.locals.scope as Workspace;
    const now = Date.now();
    const windowMs = 15_000;
    scope.authAttempts = scope.authAttempts.filter(attempt => attempt > now - windowMs);
    if (scope.authAttempts.length >= 16) {
      const retrySeconds = Math.ceil((scope.authAttempts[0]! + windowMs - now) / 1000);
      res.set('Retry-After', String(retrySeconds));
      throw new HttpError(429, 'AUTH_RATE_LIMIT', 'Wait before trying more demo authentication requests.');
    }
    scope.authAttempts.push(now);
    next();
  });

  api.post('/register', async (req, res) => {
    const { username, password } = credentials(req.body);
    if (username === 'lab-editor') throw bad('Choose a reader username.');
    const accounts = authAccounts(res.locals.scope);
    await accounts.createIndex({ username: 1 }, { unique: true });
    if (await accounts.countDocuments() >= 20) throw new HttpError(409, 'ACCOUNT_LIMIT', 'The workspace account limit was reached.');
    const verifier = await hashPassword(password);
    try { await accounts.insertOne({ username, ...verifier, role: 'reader' }); }
    catch (error) { if (isDuplicate(error)) throw new HttpError(409, 'ACCOUNT_EXISTS', 'That teaching account already exists.'); throw error; }
    res.status(201).json({ data: { username, role: 'reader', saltedHashStored: true } });
  });
  api.post('/login', async (req, res) => {
    const { username, password } = credentials(req.body);
    const scope = res.locals.scope as Workspace;
    const account = await authAccounts(scope).findOne({ username });
    // An editor fixture exists only inside the isolated teaching workspace.
    if (username === 'lab-editor' && password === 'lab-editor-sample') {
      res.json({ data: await session(scope, username, 'editor') });
      return;
    }
    if (!account || !(await matchesPassword(password, account))) throw new HttpError(401, 'INVALID_LOGIN', 'Check the sample credentials.');
    res.json({ data: await session(scope, account.username, account.role) });
  });
  api.post('/refresh', async (req, res) => {
    const token: unknown = req.body?.refresh;
    if (typeof token !== 'string' || !/^[\w-]{32}$/.test(token)) throw bad('Supply the active refresh value.');
    const scope = res.locals.scope as Workspace;
    const old = await authRefresh(scope).findOneAndDelete({ digest: refreshDigest(token), expires: { $gt: Date.now() } });
    if (!old) throw new HttpError(401, 'REFRESH_REJECTED', 'That refresh value is expired or already used.');
    res.json({ data: await session(scope, old.username, old.role) });
  });
  api.get(['/profile', '/editor'], (req, res) => {
    const scope = res.locals.scope as Workspace;
    const claims = readAccess(req.get('authorization'), scope.key);
    if (req.path === '/editor' && claims.role !== 'editor') throw new HttpError(403, 'EDITOR_REQUIRED', 'The editor role is required.');
    res.json({ data: { username: claims.sub, role: claims.role, signed: true } });
  });
  api.post('/upload', express.raw({ type: 'multipart/form-data', limit: '2kb' }), async (req, res) => {
    if (!Buffer.isBuffer(req.body)) throw bad('Use a generated multipart text fixture.');
    let body: FormData;
    try {
      body = await new Response(await new Blob([req.body]).arrayBuffer(), { headers: { 'content-type': req.get('content-type') ?? '' } }).formData();
    } catch { throw bad('Malformed multipart data.'); }
    const files = body.getAll('file');
    const file = files[0];
    if (files.length !== 1 || !(file instanceof File) || file.type !== 'text/plain' || file.size > 120) throw bad('Supply one small text fixture.');
    const { insertedId } = await (res.locals.scope as Workspace).connection.db!.collection('mern_uploads').insertOne({
      name: 'fixture.txt', bytes: file.size, text: await file.text()
    });
    const stored = await (res.locals.scope as Workspace).connection.db!.collection('mern_uploads').findOne({ _id: insertedId });
    res.status(201).json({ data: { bytes: stored?.bytes, text: stored?.text, persisted: !!stored } });
  });
  api.get('/environment', (_req, res) => {
    res.json({ data: { databaseReady: true, runtime: process.versions.node, mode } });
  });

  return { router, close: async () => {
    await Promise.allSettled([...workspaces].map(([id, scope]) => release(id, scope)));
  } };
}
