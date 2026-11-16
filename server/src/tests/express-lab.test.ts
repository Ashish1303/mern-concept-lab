import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';

const app = createApp();
const cases: [string, string][] = [
  ["express-001.e01",""],
  ["express-001.e02",""],
  ["express-038.e01",""],
  ["express-002.e01",""],
  ["express-002.e02",""],
  ["express-003.e01","Express Notes"],
  ["express-003.e02"," "],
  ["express-004.e01","Updated book"],
  ["express-004.e02","Same result"],
  ["express-005.e01","Renamed guide"],
  ["express-005.e02","New title"],
  ["express-006.e01",""],
  ["express-006.e02",""],
  ["express-007.e01","Node and Express"],
  ["express-007.e02",""],
  ["express-040.e01","3"],
  ["express-008.e01","Node & Express"],
  ["express-008.e02",""],
  ["express-041.e01","web"],
  ["express-009.e01","Read Express"],
  ["express-009.e02","Ada & Grace"],
  ["express-010.e01",""],
  ["express-010.e02",""],
  ["express-011.e01",""],
  ["express-011.e02",""],
  ["express-039.e01",""],
  ["express-012.e01",""],
  ["express-012.e02",""],
  ["express-012.e03",""],
  ["express-012.e04",""],
  ["express-012.e05",""],
  ["express-013.e01",""],
  ["express-013.e02",""],
  ["express-014.e01",""],
  ["express-014.e02",""],
  ["express-015.e01",""],
  ["express-015.e02",""],
  ["express-015.e03","  Express  "],
  ["express-015.e04",""],
  ["express-015.e05",""],
  ["express-043.e01",""],
  ["express-016.e01","hello"],
  ["express-016.e02","hello"],
  ["express-016.e03","hello"],
  ["express-016.e04","Ada"],
  ["express-016.e05",""],
  ["express-017.e01",""],
  ["express-017.e02",""],
  ["express-017.e03","{invalid"],
  ["express-017.e04",""],
  ["express-017.e05",""],
  ["express-018.e01",""],
  ["express-018.e02",""],
  ["express-019.e01",""],
  ["express-019.e02",""],
  ["express-046.e01",""],
  ["express-020.e01",""],
  ["express-020.e02","REST guide"],
  ["express-047.e01","Express project"],
  ["express-021.e01",""],
  ["express-021.e02",""],
  ["express-022.e01",""],
  ["express-022.e02",""],
  ["express-022.e03",""],
  ["express-022.e04",""],
  ["express-022.e05",""],
  ["express-044.e01",""],
  ["express-023.e01",""],
  ["express-023.e02",""],
  ["express-045.e01",""],
  ["express-024.e01",""],
  ["express-024.e02",""],
  ["express-025.e01","  Valid title  "],
  ["express-025.e02","Valid title"],
  ["express-042.e01"," "],
  ["express-026.e01","https://example.test"],
  ["express-026.e02",""],
  ["express-027.e01",""],
  ["express-027.e02",""],
  ["express-028.e01",""],
  ["express-028.e02",""],
  ["express-049.e01",""],
  ["express-029.e01",""],
  ["express-029.e02",""],
  ["express-030.e01",""],
  ["express-030.e02",""],
  ["express-031.e01","Hello Express"],
  ["express-031.e02","64 byte limit"],
  ["express-032.e01",""],
  ["express-032.e02",""],
  ["express-048.e01","web"],
  ["express-033.e01","runtime"],
  ["express-033.e02","unknown"],
  ["express-034.e01",""],
  ["express-034.e02",""],
  ["express-035.e01",""],
  ["express-035.e02",""],
  ["express-036.e01",""],
  ["express-036.e02",""],
  ["express-050.e01","Test title"],
  ["express-037.e01",""],
  ["express-037.e02",""],
];

function run(id: string, input = '') {
  return request(app).post('/api/v1/lab/express/' + id).send({ input });
}

describe('Phase 7 Express HTTP examples', () => {
  it.each(cases)('runs %s with its published input', async (id, input) => {
    const result = await run(id, input).expect(200);
    expect(result.body.data).toBeDefined();
    if (id.startsWith('express-036.') || id === 'express-050.e01') expect(result.body.data.passed).toBe(true);
  });

  it('changes an edited book title and resets stores between runs', async () => {
    const expected = [201, 200, 200, 204, 404];
    const first = await run('express-047.e01', 'First run').expect(200);
    const second = await run('express-047.e01', 'Second run').expect(200);
    expect(first.body.data.map((entry: { status: number }) => entry.status)).toEqual(expected);
    expect(second.body.data.map((entry: { status: number }) => entry.status)).toEqual(expected);
    expect(first.body.data[0].body).toMatchObject({ id: 5, title: 'First run' });
    expect(second.body.data[0].body).toMatchObject({ id: 5, title: 'Second run' });
    expect(first.body.data[0].headers.location).toBe('/books/5');
    expect(first.body.data[2].body.title).toBe('Updated title');
  });

  it('enforces authentication, authorization, and the rate limit', async () => {
    await run('express-022.e01').expect(200).expect(({ body }) => {
      expect(body.data.status).toBe(401);
      expect(body.data.headers['www-authenticate']).toBe('Bearer');
    });
    await run('express-045.e01').expect(200).expect(({ body }) => {
      expect(body.data.map((entry: { status: number }) => entry.status)).toEqual([403, 200]);
    });
    await run('express-049.e01').expect(200).expect(({ body }) => {
      expect(body.data.map((entry: { status: number }) => entry.status)).toEqual([200, 200, 429]);
      expect(Number(body.data[2].headers['retry-after'])).toBeGreaterThan(0);
    });
  });

  it('parses accepted multipart data and rejects oversized files', async () => {
    await run('express-031.e01', 'Valid file').expect(200).expect(({ body }) => {
      expect(body.data).toMatchObject({ status: 201, body: { bytes: 10, text: 'Valid file' } });
    });
    await run('express-031.e02', 'This is oversized').expect(200).expect(({ body }) => {
      expect(body.data).toMatchObject({ status: 400, body: { error: { code: 'INVALID_FILE' } } });
    });
  });

  it('isolates CORS policy, preserves middleware order, and revokes fixture sessions', async () => {
    await run('express-026.e02').expect(200).expect(({ body }) => {
      expect(body.data[0].headers['access-control-allow-origin']).toBe('https://example.test');
      expect(body.data[1].headers['access-control-allow-origin']).toBeUndefined();
    });
    await run('express-043.e01').expect(200).expect(({ body }) => {
      expect(body.data.body).toEqual(['validate', 'annotate', 'respond']);
    });
    await run('express-030.e02').expect(200).expect(({ body }) => {
      expect(body.data.map((entry: { status: number }) => entry.status)).toEqual([204, 401]);
    });
  });

  it('rejects unknown examples, oversized inputs, and extra request fields', async () => {
    await run('express-999.e01').expect(404);
    await run('express-001.e01', 'x'.repeat(121)).expect(400);
    await request(app).post('/api/v1/lab/express/express-001.e01').send({ input: '', method: 'DELETE' }).expect(400);
  });
});
