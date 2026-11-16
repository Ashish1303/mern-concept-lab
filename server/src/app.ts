import { randomBytes, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import express from 'express';
import { createNodeLabRouter } from './routes/node-lab.js';
import { createExpressLabRouter } from './routes/express-lab.js';
import { createMernLab } from './routes/mern-lab.js';
import { createMongoLabRouter } from './routes/mongo-lab.js';
import { healthRouter } from './routes/health.js';
import { createReduxLabRouter } from './routes/redux-lab.js';
import { labRouter } from './routes/lab.js';
import { handleError, HttpError } from './middleware/errors.js';

export function createApp(options: { clientDirectory?: string; playgroundOrigin?: string; mongoLabPort?: number; runtimeMode?: string } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.use((_request, response, next) => {
    response.locals.requestId = randomUUID();
    response.setHeader('X-Request-Id', response.locals.requestId as string);
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'no-referrer');
    next();
  });
  app.use(express.json({ limit: '16kb' }));
  app.use('/api/v1', healthRouter);
  app.use('/api/v1/lab', labRouter);
  const mernLab = createMernLab(options.mongoLabPort, options.runtimeMode);
  app.locals.closeMernLab = mernLab.close;
  app.use('/api/v1/lab/mern', mernLab.router);
  app.use('/api/v1/lab/mongodb', createMongoLabRouter(options.mongoLabPort));
  app.use('/api/v1/lab/express', createExpressLabRouter());
  app.use('/api/v1/lab/node', createNodeLabRouter());
  app.use('/api/v1/lab/redux', createReduxLabRouter());
  app.use('/api', (_request, _response, next) => next(new HttpError(404, 'NOT_FOUND', 'API route not found.')));

  if (options.clientDirectory) {
    app.use((_request, response, next) => {
      const nonce = randomBytes(16).toString('base64');
      response.locals.styleNonce = nonce;
      response.setHeader('Content-Security-Policy', `default-src 'self'; script-src 'self'; worker-src 'self'; frame-src ${options.playgroundOrigin ?? 'http://127.0.0.2:4001'}; style-src 'self' 'nonce-${nonce}'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'`);
      next();
    });
    app.get(['/', '/index.html', '/foundation', '/learn', '/learn/{*path}'], async (_request, response) => {
      const html = await readFile(join(options.clientDirectory!, 'index.html'), 'utf8');
      response.setHeader('Cache-Control', 'no-store');
      response.type('html').send(html.replace('<head>', `<head><meta name="csp-nonce" content="${response.locals.styleNonce as string}"><meta name="playground-origin" content="${options.playgroundOrigin ?? 'http://127.0.0.2:4001'}">`));
    });
    app.use(express.static(options.clientDirectory, { index: false }));
  }
  app.use((_request, _response, next) => next(new HttpError(404, 'NOT_FOUND', 'Route not found.')));
  app.use(handleError);
  return app;
}
