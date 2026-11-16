import request from 'supertest';
import { afterEach, describe, expect, it } from 'vitest';
import { createApp } from '../app.js';
import { parseEnvironment } from '../config/env.js';

const port = parseEnvironment(process.env).mongoLabPort;
const base = '/api/v1/lab/mern/workspaces';

it('reports that the database lab needs explicit local configuration', async () => {
  await request(createApp()).post(base).expect(503)
    .expect(({ body }) => expect(body.error.code).toBe('DB_LAB_DISABLED'));
});

describe.skipIf(!port)('live MERN HTTP contracts', () => {
  const app = createApp(port ? { mongoLabPort: port, runtimeMode: 'test' } : {});
  const client = request(app);
  afterEach(async () => { await (app.locals.closeMernLab as () => Promise<void>)(); });

  async function open() {
    const result = await client.post(base).expect(201);
    return base + '/' + String(result.body.data.id);
  }
  const credential = { username: 'fixture-reader', password: 'lab-reader-sample' };

  it('persists CRUD, literal search, sorting and pagination in an isolated workspace', async () => {
    const path = await open();
    const other = await open();
    const created = await client.post(path + '/items').send({ title: 'A [literal] fixture' }).expect(201);
    const id = created.body.data._id;
    await client.get(path + '/items').query({ q: '[literal]' }).expect(200)
      .expect(({ body }) => expect(body.data).toMatchObject({ total: 1, rows: [{ _id: id }] }));
    await client.get(other + '/items').query({ q: '[literal]' }).expect(200)
      .expect(({ body }) => expect(body.data.total).toBe(0));
    await client.get(path + '/items').query({ sort: 'desc', page: 2 }).expect(200)
      .expect(({ body }) => expect(body.data).toMatchObject({ total: 4, page: 2, rows: [{ title: 'Express Guide' }, { title: 'A [literal] fixture' }] }));
    await client.patch(path + '/items/' + id).send({ title: 'Renamed item' }).expect(200)
      .expect(({ body }) => expect(body.data.title).toBe('Renamed item'));
    await client.delete(path + '/items/' + id).expect(204);
    await client.get(path + '/items').query({ q: 'Renamed item' }).expect(200)
      .expect(({ body }) => expect(body.data.total).toBe(0));
    await client.delete(path).expect(204);
    await client.get(path + '/items').expect(404);
  });

  it('enforces session verification, atomic refresh rotation, and role authorization', async () => {
    const path = await open();
    const other = await open();
    await client.get(path + '/profile').expect(401);
    await client.post(path + '/register').send(credential).expect(201)
      .expect(({ body }) => expect(body.data).toEqual({ username: credential.username, role: 'reader', saltedHashStored: true }));
    await client.post(path + '/register').send(credential).expect(409);
    await client.post(path + '/login').send({ ...credential, password: 'another-fixture' }).expect(401);
    const signed = (await client.post(path + '/login').send(credential).expect(200)).body.data;
    const authorization = 'Bearer ' + signed.access;
    await client.get(path + '/profile').set('Authorization', authorization).expect(200)
      .expect(({ body }) => expect(body.data).toEqual({ username: credential.username, role: 'reader', signed: true }));
    await client.get(other + '/profile').set('Authorization', authorization).expect(401);
    await client.get(path + '/editor').set('Authorization', authorization).expect(403);
    const concurrent = await Promise.all([1, 2].map(() => client.post(path + '/refresh').send({ refresh: signed.refresh })));
    expect(concurrent.map(response => response.status).sort()).toEqual([200, 401]);
    expect(concurrent.find(response => response.status === 200)?.body.data.refresh).not.toBe(signed.refresh);
    const editor = (await client.post(path + '/login').send({ username: 'lab-editor', password: 'lab-editor-sample' }).expect(200)).body.data;
    await client.get(path + '/editor').set('Authorization', 'Bearer ' + editor.access).expect(200);
  });

  it('limits authentication attempts per workspace without blocking other demos', async () => {
    const path = await open();
    const other = await open();
    for (let attempt = 0; attempt < 16; attempt++) {
      await client.post(path + '/login').send(credential).expect(401);
    }
    await client.post(path + '/register').send(credential).expect(429)
      .expect(({ body, headers }) => {
        expect(body.error.code).toBe('AUTH_RATE_LIMIT');
        expect(Number(headers['retry-after'])).toBeGreaterThan(0);
      });
    await client.get(path + '/items').expect(200);
    await client.post(other + '/register').send(credential).expect(201);
  });

  it('validates bounded multipart uploads, request fields and recoverable failures', async () => {
    const path = await open();
    await client.post(path + '/items').send({ title: '' }).expect(400);
    await client.get(path + '/items?fail=1').expect(503);
    await client.get(path + '/items?slow=1').expect(200)
      .expect(({ body }) => expect(body.data.total).toBe(3));
    const first = (await client.get(path + '/items').expect(200)).body.data.rows[0];
    await client.patch(path + '/items/' + first._id).send({ title: 'Temporary', reject: true }).expect(409);
    await client.get(path + '/items').query({ q: first.title }).expect(200)
      .expect(({ body }) => expect(body.data.total).toBe(1));
    await client.post(path + '/upload').attach('file', Buffer.from('MERN upload'), { filename: 'fixture.txt', contentType: 'text/plain' }).expect(201)
      .expect(({ body }) => expect(body.data).toEqual({ bytes: 11, text: 'MERN upload', persisted: true }));
    await client.post(path + '/upload').attach('file', Buffer.alloc(121), { filename: 'large.txt', contentType: 'text/plain' }).expect(400);
    await client.get(path + '/environment').expect(200)
      .expect(({ body }) => expect(body.data).toMatchObject({ mode: 'test', databaseReady: true }));
  });
});
