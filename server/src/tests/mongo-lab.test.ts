import mongoose from 'mongoose';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';
import { parseEnvironment } from '../config/env.js';

const port = parseEnvironment(process.env).mongoLabPort;
const cases: [string, string][] = [
  ["mongodb-001.e01",""],
  ["mongodb-001.e02",""],
  ["mongodb-002.e01",""],
  ["mongodb-002.e02",""],
  ["mongodb-003.e01","Mongo Primer"],
  ["mongodb-003.e02","124"],
  ["mongodb-004.e01","Mongo"],
  ["mongodb-004.e02",""],
  ["mongodb-005.e01","000000000000000000000001"],
  ["mongodb-005.e02","000000000000000000000001"],
  ["mongodb-006.e01","New database note"],
  ["mongodb-006.e02",""],
  ["mongodb-007.e01","db"],
  ["mongodb-007.e02",""],
  ["mongodb-061.e01","web"],
  ["mongodb-008.e01","Node Guide"],
  ["mongodb-008.e02",""],
  ["mongodb-009.e01","Index notebook"],
  ["mongodb-009.e02",""],
  ["mongodb-060.e01","Interview notes"],
  ["mongodb-010.e01","Batch"],
  ["mongodb-010.e02",""],
  ["mongodb-011.e01","25"],
  ["mongodb-011.e02",""],
  ["mongodb-062.e01","Updated primer"],
  ["mongodb-012.e01","db"],
  ["mongodb-012.e02",""],
  ["mongodb-013.e01","Node Guide"],
  ["mongodb-013.e02",""],
  ["mongodb-063.e01","API Patterns"],
  ["mongodb-014.e01","db"],
  ["mongodb-014.e02",""],
  ["mongodb-015.e01","30"],
  ["mongodb-015.e02",""],
  ["mongodb-064.e01","20"],
  ["mongodb-016.e01",""],
  ["mongodb-016.e02",""],
  ["mongodb-017.e01","20"],
  ["mongodb-017.e02","30"],
  ["mongodb-018.e01",""],
  ["mongodb-018.e02",""],
  ["mongodb-019.e01",""],
  ["mongodb-019.e02",""],
  ["mongodb-065.e01",""],
  ["mongodb-020.e01","2"],
  ["mongodb-020.e02",""],
  ["mongodb-021.e01","2"],
  ["mongodb-021.e02","Mongo Primer"],
  ["mongodb-066.e01","1"],
  ["mongodb-022.e01","5"],
  ["mongodb-022.e02",""],
  ["mongodb-023.e01","Mongo Primer"],
  ["mongodb-023.e02",""],
  ["mongodb-069.e01","000000000000000000000001"],
  ["mongodb-024.e01",""],
  ["mongodb-024.e02",""],
  ["mongodb-025.e01",""],
  ["mongodb-025.e02","20"],
  ["mongodb-026.e01","Unique note"],
  ["mongodb-026.e02",""],
  ["mongodb-068.e01",""],
  ["mongodb-027.e01","db"],
  ["mongodb-027.e02",""],
  ["mongodb-028.e01","20"],
  ["mongodb-028.e02",""],
  ["mongodb-029.e01",""],
  ["mongodb-029.e02",""],
  ["mongodb-073.e01",""],
  ["mongodb-030.e01","db"],
  ["mongodb-030.e02",""],
  ["mongodb-030.e03",""],
  ["mongodb-030.e04",""],
  ["mongodb-030.e05",""],
  ["mongodb-071.e01",""],
  ["mongodb-031.e01","web"],
  ["mongodb-031.e02",""],
  ["mongodb-032.e01",""],
  ["mongodb-032.e02",""],
  ["mongodb-033.e01",""],
  ["mongodb-033.e02",""],
  ["mongodb-034.e01","Mongo Primer"],
  ["mongodb-034.e02",""],
  ["mongodb-072.e01",""],
  ["mongodb-035.e01",""],
  ["mongodb-035.e02",""],
  ["mongodb-036.e01",""],
  ["mongodb-036.e02",""],
  ["mongodb-037.e01",""],
  ["mongodb-037.e02",""],
  ["mongodb-038.e01","10"],
  ["mongodb-038.e02","10"],
  ["mongodb-074.e01","12"],
  ["mongodb-039.e01",""],
  ["mongodb-039.e02",""],
  ["mongodb-040.e01","primer"],
  ["mongodb-040.e02","guide"],
  ["mongodb-041.e01",""],
  ["mongodb-041.e02",""],
  ["mongodb-042.e01",""],
  ["mongodb-042.e02",""],
  ["mongodb-043.e01",""],
  ["mongodb-043.e02",""],
  ["mongodb-044.e01",""],
  ["mongodb-044.e02","Schema example"],
  ["mongodb-045.e01","Mongoose notes"],
  ["mongodb-045.e02",""],
  ["mongodb-046.e01","-5"],
  ["mongodb-046.e02",""],
  ["mongodb-067.e01","invalid"],
  ["mongodb-047.e01",""],
  ["mongodb-047.e02","   "],
  ["mongodb-048.e01","Default note"],
  ["mongodb-048.e02",""],
  ["mongodb-049.e01","24"],
  ["mongodb-049.e02",""],
  ["mongodb-050.e01","Timed note"],
  ["mongodb-050.e02",""],
  ["mongodb-051.e01","  Learn Mongoose  "],
  ["mongodb-051.e02",""],
  ["mongodb-051.e03",""],
  ["mongodb-051.e04",""],
  ["mongodb-051.e05",""],
  ["mongodb-052.e01","Ada"],
  ["mongodb-052.e02",""],
  ["mongodb-070.e01","Grace"],
  ["mongodb-053.e01","Ada"],
  ["mongodb-053.e02",""],
  ["mongodb-054.e01","Ada"],
  ["mongodb-054.e02",""],
  ["mongodb-055.e01","Ada"],
  ["mongodb-055.e02",""],
  ["mongodb-056.e01","Lean example"],
  ["mongodb-056.e02",""],
  ["mongodb-057.e01",""],
  ["mongodb-057.e02",""],
  ["mongodb-058.e01","10"],
  ["mongodb-058.e02","10"],
  ["mongodb-059.e01",""],
  ["mongodb-059.e02",""],
];

const app = createApp(port ? { mongoLabPort: port } : {});
function run(id: string, input = '') {
  return request(app).post('/api/v1/lab/mongodb/' + id).send({ input });
}

describe('MongoDB route validation without connecting', () => {
  it('explains the missing opt-in configuration', async () => {
    await request(createApp()).post('/api/v1/lab/mongodb/mongodb-001.e01').send({ input: '' }).expect(503)
      .expect(({ body }) => expect(body.error.code).toBe('DB_LAB_DISABLED'));
  });
  it('rejects unknown demos and oversized inputs before connecting', async () => {
    await run('mongodb-999.e01').expect(404);
    await run('mongodb-001.e01', 'x'.repeat(121)).expect(400);
  });
  it('requires a distinct bounded port for the dedicated database', () => {
    expect(() => parseEnvironment({ MONGO_LAB_PORT: '4000' })).toThrow(/MONGO_LAB_PORT/);
    expect(() => parseEnvironment({ MONGO_LAB_PORT: '127.0.0.1:27180' })).toThrow(/MONGO_LAB_PORT/);
    expect(parseEnvironment({ MONGO_LAB_PORT: '27180' }).mongoLabPort).toBe(27180);
  });
});

describe.skipIf(!port)('Phase 8 against a dedicated MongoDB replica set', () => {
  it.each(cases)('executes %s against the replica set', async (id, input) => {
    await run(id, input).expect(200).expect(({ body }) => expect(body.data).toBeDefined());
  });
  it('stores edited input and cleans up its isolated namespaces', async () => {
    const client = new mongoose.mongo.MongoClient('mongodb://127.0.0.1:' + port, { directConnection: true, serverSelectionTimeoutMS: 1000 });
    try {
      const list = async () => (await client.db('admin').admin().listDatabases()).databases
        .map(db => db.name).filter(name => name.startsWith('mern_lab_')).sort();
      const before = await list();
      const results = await Promise.all(['Edited book A', 'Edited book B'].map(title => run('mongodb-006.e01', title).expect(200)));
      expect(results.map(result => result.body.data.created.title)).toEqual(['Edited book A', 'Edited book B']);
      for (const result of results) {
        expect(result.body.data.updated.price).toBe(25);
        expect(result.body.data.after).toBeNull();
      }
      expect(await list()).toEqual(before);
    } finally { await client.close(); }
  });
  it('verifies commit and rollback through the native driver and Mongoose', async () => {
    for (const topic of ['mongodb-038', 'mongodb-058']) {
      const committed = await run(topic + '.e01', '12').expect(200);
      expect(committed.body.data).toEqual({ committed: true, balances: [{ name: 'A', balance: 38 }, { name: 'B', balance: 22 }] });
      const aborted = await run(topic + '.e02', '12').expect(200);
      expect(aborted.body.data).toEqual({ committed: false, balances: [{ name: 'A', balance: 50 }, { name: 'B', balance: 10 }] });
    }
  });
  it('checks duplicate keys, validation, populate, and query-plan measurements', async () => {
    await run('mongodb-068.e01').expect(200).expect(({ body }) => expect(body.data).toEqual({ code: 11000, total: 1 }));
    await run('mongodb-067.e01', 'invalid').expect(200).expect(({ body }) => expect(body.data).toEqual({ name: 'ValidationError', count: 0 }));
    await run('mongodb-070.e01', 'Toni').expect(200).expect(({ body }) => expect(body.data.populated).toEqual({ name: 'Toni' }));
    await run('mongodb-073.e01').expect(200).expect(({ body }) => {
      expect(body.data.scan).toMatchObject({ returned: 2, documentsExamined: 4 });
      expect(body.data.indexed).toMatchObject({ returned: 2, documentsExamined: 2 });
    });
  });
});
