import express from 'express';
import type { Express, RequestHandler } from 'express';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { handleError, HttpError } from '../middleware/errors.js';

export type Send = (path: string, init?: RequestInit) => Promise<{
  status: number; body: unknown; headers: Record<string, string>;
}>;
export interface Demo {
  setup: (app: Express) => void;
  run: (send: Send, input: string) => Promise<unknown>;
}

export function json(method: string, body: unknown): RequestInit {
  return { method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) };
}
export function requestDemo(setup: Demo['setup'], run: Demo['run']): Demo {
  return { setup, run };
}

export async function exercise(demo: Demo, input: string) {
  const app = express();
  app.disable('x-powered-by');
  app.use((_req, res, next) => { res.locals.requestId = 'express-lesson'; next(); });
  demo.setup(app);
  app.use((_req, _res, next) => next(new HttpError(404, 'NOT_FOUND', 'Resource not found')));
  app.use(handleError);
  const server = createServer(app);
  const ready = once(server, 'listening');
  server.listen(0, '127.0.0.1');
  try {
    await ready;
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Missing local API address');
    const send: Send = async (path, init) => {
      const result = await fetch('http://127.0.0.1:' + address.port + path, {
        ...init, redirect: 'manual', signal: AbortSignal.timeout(1500)
      });
      const text = await result.text();
      const body: unknown = result.headers.get('content-type')?.startsWith('application/json') ? JSON.parse(text) : text;
      const headers = Object.fromEntries([...result.headers].filter(([name]) =>
        ['location', 'content-type', 'allow', 'set-cookie', 'retry-after', 'www-authenticate', 'vary'].includes(name) ||
        /^(access-control-|x-lab-|x-content-type-options|referrer-policy)/.test(name)
      ));
      return { status: result.status, body, headers };
    };
    return await demo.run(send, input);
  } finally {
    server.closeAllConnections();
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
}

export const titleBody: RequestHandler = (req, _res, next) => {
  const body: unknown = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length !== 1 ||
      !('title' in body) || typeof body.title !== 'string' || !body.title.trim() || body.title.length > 60) {
    throw new HttpError(400, 'INVALID_TITLE', 'Provide a title of 1–60 characters.');
  }
  req.body = { title: body.title.trim() };
  next();
};

export const authenticate: RequestHandler = (req, res, next) => {
  const credential = req.get('authorization');
  if (credential !== 'Bearer lab-reader' && credential !== 'Bearer lab-editor') {
    res.set('WWW-Authenticate', 'Bearer');
    throw new HttpError(401, 'SESSION_REQUIRED', 'A teaching session is required.');
  }
  res.locals.role = credential === 'Bearer lab-editor' ? 'editor' : 'reader';
  next();
};
export const requireEditor: RequestHandler = (_req, res, next) => {
  if (res.locals.role !== 'editor') throw new HttpError(403, 'EDITOR_REQUIRED', 'An editor role is required.');
  next();
};

export const books = [
  { id: 1, title: 'Express Guide', category: 'web', price: 30 },
  { id: 2, title: 'Node Handbook', category: 'runtime', price: 20 },
  { id: 3, title: 'HTTP Basics', category: 'web', price: 10 },
  { id: 4, title: 'Streams Guide', category: 'runtime', price: 20 }
];

export function mountBooks(app: Express) {
  const records = new Map(books.map(book => [book.id, { ...book }]));
  let nextId = 5;
  app.use(express.json({ limit: '1kb' }));
  app.get('/books', (_req, res) => res.json([...records.values()]));
  app.get('/books/:id', (req, res) => {
    const record = records.get(Number(req.params.id));
    if (!record) throw new HttpError(404, 'BOOK_NOT_FOUND', 'Book not found.');
    res.json(record);
  });
  app.post('/books', titleBody, (req, res) => {
    const record = { id: nextId++, title: req.body.title as string, category: 'web', price: 0 };
    records.set(record.id, record);
    res.location('/books/' + record.id).status(201).json(record);
  });
  app.put('/books/:id', titleBody, (req, res) => {
    const id = Number(req.params.id);
    if (!records.has(id)) throw new HttpError(404, 'BOOK_NOT_FOUND', 'Book not found.');
    const record = { id, title: req.body.title as string, category: 'web', price: 0 };
    records.set(id, record);
    res.json(record);
  });
  app.patch('/books/:id', titleBody, (req, res) => {
    const id = Number(req.params.id);
    const previous = records.get(id);
    if (!previous) throw new HttpError(404, 'BOOK_NOT_FOUND', 'Book not found.');
    const record = { ...previous, title: req.body.title as string };
    records.set(id, record);
    res.json(record);
  });
  app.delete('/books/:id', (req, res) => {
    if (!records.delete(Number(req.params.id))) throw new HttpError(404, 'BOOK_NOT_FOUND', 'Book not found.');
    res.status(204).end();
  });
}
