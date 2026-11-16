import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';

const app = createApp();
const cases: [string, string][] = [
  ["node-001.e01", ""],
  ["node-001.e02", "Node lab"],
  ["node-002.e01", ""],
  ["node-002.e02", "Ada"],
  ["node-003.e01", ""],
  ["node-003.e02", "demo"],
  ["node-003.e03", ""],
  ["node-003.e04", ""],
  ["node-003.e05", ""],
  ["node-004.e01", ""],
  ["node-004.e02", "4"],
  ["node-005.e01", ""],
  ["node-005.e02", ""],
  ["node-006.e01", "25"],
  ["node-006.e02", ""],
  ["node-007.e01", "report"],
  ["node-007.e02", "parallel"],
  ["node-008.e01", ""],
  ["node-008.e02", ""],
  ["node-009.e01", "notes.txt"],
  ["node-009.e02", ""],
  ["node-010.e01", ""],
  ["node-010.e02", ""],
  ["node-011.e01", "250"],
  ["node-011.e02", "demo"],
  ["node-012.e01", "café"],
  ["node-012.e02", ""],
  ["node-013.e01", ""],
  ["node-013.e02", ""],
  ["node-014.e01", "hello"],
  ["node-014.e02", "abcdef"],
  ["node-015.e01", "docs/sub/report.txt"],
  ["node-015.e02", "topics/./node/../react"],
  ["node-016.e01", "hello"],
  ["node-016.e02", ""],
  ["node-017.e01", ""],
  ["node-017.e02", "ready"],
  ["node-018.e01", "lab"],
  ["node-018.e02", ""],
  ["node-019.e01", "hello"],
  ["node-019.e02", ""],
  ["node-020.e01", "/learn?q=node"],
  ["node-020.e02", "Node & JS"],
  ["node-021.e01", ""],
  ["node-021.e02", ""],
  ["node-022.e01", "hello"],
  ["node-022.e02", ""],
  ["node-023.e01", "hello"],
  ["node-023.e02", ""],
  ["node-024.e01", "callbacks"],
  ["node-024.e02", "promise"],
  ["node-024.e03", "await"],
  ["node-024.e04", "mixed"],
  ["node-024.e05", ""],
  ["node-025.e01", ""],
  ["node-025.e02", ""],
  ["node-026.e01", "abc"],
  ["node-026.e02", ""],
  ["node-027.e01", "queued"],
  ["node-027.e02", ""],
  ["node-028.e01", "hello"],
  ["node-028.e02", "compress me"],
  ["node-029.e01", ""],
  ["node-029.e02", ""],
  ["node-030.e01", "second line"],
  ["node-030.e02", "replacement"],
  ["node-031.e01", "record"],
  ["node-031.e02", "record"],
  ["node-032.e01", ""],
  ["node-032.e02", ""],
  ["node-033.e01", ""],
  ["node-033.e02", ""],
  ["node-034.e01", ""],
  ["node-034.e02", ""],
  ["node-035.e01", ""],
  ["node-035.e02", ""],
  ["node-036.e01", ""],
  ["node-036.e02", "demo"],
  ["node-037.e01", ""],
  ["node-037.e02", ""],
  ["node-038.e01", ""],
  ["node-038.e02", "example"],
  ["node-039.e01", "cache me"],
  ["node-039.e02", ""],
  ["node-040.e01", "hello"],
  ["node-040.e02", "مرحبا"],
  ["node-041.e01", ""],
  ["node-041.e02", ""],
  ["node-042.e01", ""],
  ["node-042.e02", ""],
  ["node-043.e01", "development"],
  ["node-043.e02", "4000"],
  ["node-044.e01", "Ada 42"],
  ["node-044.e02", "lab message"],
  ["node-045.e01", "3"],
  ["node-045.e02", ""],
  ["node-046.e01", "demo"],
  ["node-046.e02", ""],
];

function run(id: string, input = '') {
  return request(app).post('/api/v1/lab/node/' + id).send({ input });
}

describe('Phase 6 Node.js backend', () => {
  it.each(cases)('runs %s with the lesson input', async (id, input) => {
    const response = await run(id, input).expect(200);
    expect(response.body.data).toBeDefined();
    if (response.body.data && typeof response.body.data === 'object' && 'exitCode' in response.body.data) {
      const intentionalFailure = id === 'node-010.e02' ? 3 : id === 'node-036.e01' ? 5 : 0;
      expect(response.body.data.exitCode).toBe(intentionalFailure);
    }
  });

  it('runs edited inputs as data and rejects unsupported requests', async () => {
    await run('node-012.e01', '☕').expect(200).expect(({ body }) => {
      expect(body.data).toEqual({ codeUnits: 1, bytes: 3, hex: 'e29895' });
    });
    await run('node-022.e01', 'console.log(42)').expect(200).expect(({ body }) => {
      expect(body.data.stdout).toBe('CONSOLE.LOG(42)');
    });
    await run('node-999.e01').expect(404);
    await run('node-001.e99').expect(404);
    await run('node-001.e01', 'x'.repeat(121)).expect(400);
    await request(app).post('/api/v1/lab/node/node-001.e01').send({ input: '', code: '42' }).expect(400);
  });

  it('observes actual scheduling, worker ownership and transport', async () => {
    await run('node-003.e02').expect(200).expect(({ body }) => {
      expect(body.data).toEqual(['I/O callback', 'immediate', 'timer']);
    });
    await run('node-035.e01').expect(200).expect(({ body }) => {
      expect(body.data).toEqual({ senderBytes: 0, firstByte: 7 });
    });
    await run('node-037.e01').expect(200).expect(({ body }) => {
      expect(JSON.parse(body.data.stdout)).toEqual({ primary: true, worker: true });
    });
    await run('node-040.e01', 'Live Node').expect(200).expect(({ body }) => {
      expect(body.data).toEqual({ message: 'Live Node', transport: 'WebSocket' });
    });
  });
});
