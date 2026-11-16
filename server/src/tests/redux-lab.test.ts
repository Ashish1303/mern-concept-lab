import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';

describe('Redux teaching API', () => {
  it('creates, reads, edits and deletes a task through Express', async () => {
    const client = request(createApp());
    const path = '/api/v1/lab/redux/' + randomUUID() + '/tasks';
    const created = await client.post(path).send({ title: '  New task  ' }).expect(201);
    const taskPath = path + '/' + created.body.data.id;
    await client.get(taskPath).expect(200).expect(({ body }) => expect(body.data.title).toBe('New task'));
    await client.patch(taskPath).send({ title: 'Updated' }).expect(200);
    await client.get(taskPath).expect(200).expect(({ body }) => expect(body.data.title).toBe('Updated'));
    await client.delete(taskPath).expect(200);
    await client.get(taskPath).expect(404);
  });

  it('pages the seed data, counts reads, and rejects invalid parameters', async () => {
    const client = request(createApp());
    const path = '/api/v1/lab/redux/' + randomUUID() + '/tasks';
    await client.get(path + '?page=2').expect(200).expect(({ body }) => {
      expect(body).toEqual({ data: [{ id: 3, title: 'Review tests' }], total: 3, read: 1 });
    });
    await client.get(path + '?page=1').expect(200).expect(({ body }) => expect(body.read).toBe(2));
    await client.get(path + '?page=foo').expect(400);
    await client.get(path + '?fail=1').expect(503);
    await client.post(path).send({ title: ' ' }).expect(400);
  });

  it('rejects an optimistic conflict before changing data', async () => {
    const client = request(createApp());
    const path = '/api/v1/lab/redux/' + randomUUID() + '/tasks/1';
    await client.patch(path).send({ title: 'Temporary', fail: true }).expect(409);
    await client.get(path).expect(200).expect(({ body }) => expect(body.data.title).toBe('Read Redux'));
  });

  it('checks the published demo value on each protected request', async () => {
    const client = request(createApp());
    const profile = '/api/v1/lab/redux/profile';
    await client.get(profile).expect(401);
    await client.get(profile).set('authorization', 'Bearer expired-demo').expect(401);
    await client.get(profile).set('authorization', 'Bearer redux-lab-demo').expect(200)
      .expect(({ body }) => expect(body.data).toEqual({ name: 'Ada', role: 'reader' }));
  });
});
