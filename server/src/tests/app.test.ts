import { fileURLToPath } from 'node:url';
import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';
import { handleError } from '../middleware/errors.js';

describe('actual Express API', () => {
  it('reports liveness honestly without a database connection', async () => {
    const response = await request(createApp()).get('/api/v1/health').expect(200);
    expect(response.body).toMatchObject({ ok: true, data: { status: 'healthy', database: { status: 'not_checked' } } });
    expect(Number.isNaN(Date.parse(response.body.data.timestamp))).toBe(false);
    expect(response.headers['x-request-id']).toBe(response.body.requestId);
    expect(response.headers['cache-control']).toBe('no-store');
    expect(response.headers['x-powered-by']).toBeUndefined();
    const next = await request(createApp()).get('/api/v1/health');
    expect(next.body.requestId).not.toBe(response.body.requestId);
  });

  it('validates input and does not leak implementation errors', async () => {
    const response = await request(createApp()).get('/api/v1/health?unexpected=1').expect(400);
    expect(response.body.error.code).toBe('INVALID_QUERY');
    expect(response.body.error.stack).toBeUndefined();
    await request(createApp()).post('/api/v1/health').set('Content-Type', 'application/json').send('{').expect(400).expect(({ body }) => { expect(body.error.code).toBe('INVALID_JSON'); });
    await request(createApp()).post('/api/v1/health').send({ text: 'x'.repeat(17000) }).expect(413);
  });

  it('returns consistent JSON 404s for unknown API paths and methods', async () => {
    for (const path of ['/api/v1/missing', '/api', '/api/not-a-page']) {
      const response = await request(createApp()).get(path).expect(404).expect('Content-Type', /json/);
      expect(response.body).toMatchObject({ ok: false, error: { code: 'NOT_FOUND' } });
    }
    await request(createApp()).post('/api/v1/health').expect(404);
  });

  it('keeps unexpected errors public and generic', async () => {
    const app = express();
    app.get('/', () => { throw new Error('private-secret-and-stack'); });
    app.use(handleError);
    const response = await request(app).get('/').expect(500);
    expect(response.body.error).toEqual({ code: 'INTERNAL_ERROR', message: 'An unexpected server error occurred.' });
    expect(response.text).not.toContain('private-secret');
  });
});

describe('production SPA fallback', () => {
  const directory = fileURLToPath(new URL('./fixtures/client', import.meta.url));
  const app = createApp({ clientDirectory: directory });
  it.each(['/', '/foundation?example=api', '/learn/react/react-028?example=react-059.e01'])('serves a direct browser route %s', async (path) => {
    const response = await request(app).get(path).expect(200).expect('Content-Type', /html/);
    expect(response.text).toContain('MERN fixture');
    expect(response.headers['content-security-policy']).toContain("frame-ancestors 'none'");
  });
  it('never serves HTML for a missing API or asset', async () => {
    await request(app).get('/api/v1/missing').expect(404).expect('Content-Type', /json/);
    await request(app).get('/assets/missing.js').expect(404).expect('Content-Type', /json/);
  });
  it('issues a fresh style nonce matching HTML and CSP on every page response', async () => {
    const first = await request(app).get('/learn/react/react-041').expect(200);
    const second = await request(app).get('/index.html').expect(200);
    const nonce = first.text.match(/name="csp-nonce" content="([^"]+)"/)?.[1];
    expect(nonce).toBeTruthy();
    expect(first.headers['content-security-policy']).toContain(`'nonce-${nonce}'`);
    expect(first.headers['content-security-policy']).not.toContain('unsafe-inline');
    expect(first.headers['cache-control']).toBe('no-store');
    expect(second.text).not.toContain(`content="${nonce}"`);
  });
});
