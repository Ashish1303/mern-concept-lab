import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';

describe('Phase 2 real network teaching support', () => {
  it('filters the fixed teaching dataset without claiming database persistence', async () => {
    const response = await request(createApp()).get('/api/v1/lab/items?q=ada').expect(200);
    expect(response.body).toMatchObject({ ok: true, data: [{ id: 1, name: 'Ada' }] });
    expect(response.body.requestId).toBeTruthy();
    expect(response.headers['cache-control']).toBe('no-store');
  });
  it.each(['delay=1201', 'delay=-1', 'delay=0.5', 'fail=2', 'q[]=a', 'unknown=1', `q=${'a'.repeat(41)}`])('rejects unsupported query %s', async query => {
    await request(createApp()).get(`/api/v1/lab/items?${query}`).expect(400);
  });
  it('provides a real bounded HTTP failure and delayed response', async () => {
    const failure = await request(createApp()).get('/api/v1/lab/items?fail=1').expect(503);
    expect(failure.body.error.code).toBe('LAB_FAILURE');
    await request(createApp()).get('/api/v1/lab/items?delay=10').expect(200);
  });
});

describe('Phase 3 real Action acknowledgements', () => {
  it('acknowledges normalized input without claiming persistence', async () => {
    const response = await request(createApp()).post('/api/v1/lab/ack').send({ label: ' Ada ' }).expect(200);
    expect(response.body).toMatchObject({ ok: true, data: { label: 'Ada', persisted: false } });
    expect(response.body.requestId).toBeTruthy();
    expect(response.headers['cache-control']).toBe('no-store');
  });
  it.each([{}, { label: '' }, { label: ' '.repeat(4) }, { label: 'a'.repeat(41) }, { label: 1 }, { label: 'Ada', fail: '1' }, { label: 'Ada', slow: 1 }, { label: 'Ada', extra: true }])('rejects invalid Action payload %j', async body => {
    await request(createApp()).post('/api/v1/lab/ack').send(body).expect(400);
  });
  it('returns an actual bounded failure and supports slow acknowledgement', async () => {
    await request(createApp()).post('/api/v1/lab/ack').send({ label: 'Ada', fail: true }).expect(503).expect(({ body }) => { expect(body.error.code).toBe('LAB_FAILURE'); });
    await request(createApp()).post('/api/v1/lab/ack').send({ label: 'Grace', slow: true }).expect(200);
  });
});
