import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Server } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../../../server/src/app';
import { catalog } from '../app/catalog';
import { examples as registeredExamples, topics } from '../app/registry';
import type { Lesson, RunContext } from './lesson-types';
import { createRunContext, print } from './runtime';
import { promiseAll } from './helpers';
import compilerReport from './typescript/compiler-evidence.json';
import { anagram, clonePlain, factorial, fibonacci, filterNumbers, flatten, isPrime, mapNumbers, missingNumber, parseTree, reduceNumbers, secondLargest, twoSum } from './algorithms';

const modules = import.meta.glob<{ lesson: Lesson }>('./{javascript,typescript}/*-*.ts', { eager: true });
const lessons = Object.values(modules).map(module => module.lesson);
let server: Server;
let origin: string;
beforeAll(async () => {
  server = createApp().listen(0, '127.0.0.1');
  await new Promise<void>((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Lab test server has no TCP address.');
  origin = `http://127.0.0.1:${address.port}`;
});
afterAll(async () => { if (server) await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); });

describe('complete Phase 2 curriculum', () => {
  it('covers every Phase 2 requirement with named implementations, source and six Q&A entries', () => {
    expect(lessons).toHaveLength(149);
    expect(lessons.flatMap(lesson => lesson.examples)).toHaveLength(331);
    for (const [id, , , , phase, , minimum] of catalog) {
      if (phase !== 2) continue;
      const lesson = lessons.find(entry => entry.id === id);
      expect(lesson, id).toBeDefined();
      expect(lesson!.examples.length, id).toBeGreaterThanOrEqual(minimum);
      expect(lesson!.questions).toHaveLength(6);
      expect(lesson!.mistakes.length).toBeGreaterThan(0);
      expect(topics.find(topic => topic.id === id)?.description).toBe(lesson!.description);
      for (const example of lesson!.examples) {
        expect(registeredExamples.find(entry => entry.id === example.id)?.title).toBe(example.title);
        expect(example.explanation.trim(), example.id).not.toBe('');
      }
    }
  });

  for (const lesson of lessons) {
    for (const example of lesson.examples) {
      if (example.runtime === 'typecheck') {
        it(`${example.id}: compiler diagnostics match the exact fixture`, () => {
          const report = compilerReport.fixtures[example.fixture as keyof typeof compilerReport.fixtures];
          expect(report).toBeDefined();
          const source = readFileSync(resolve('src/modules', example.fixture), 'utf8');
          expect(createHash('sha256').update(source).digest('hex')).toBe(report.sha256);
          expect(report.positive).toBe('passed');
          expect(report.negative.length).toBeGreaterThan(0);
          expect(report.negative.every(error => error.code > 0 && error.line > 0 && error.message.length > 0)).toBe(true);
        });
      } else {
        it(`${example.id}: ${example.title}`, async () => {
          const host = document.createElement('div'); document.body.append(host);
          const controller = new AbortController();
          const request: RunContext['request'] = (path, options) => fetch(new URL(path, origin), options);
          const scope = createRunContext(example.input?.initial ?? '', host, controller.signal, request);
          try { expect(await example.run(scope.context)).toEqual(example.expected); }
          finally { scope.dispose(); controller.abort(); host.remove(); }
        });
      }
    }
  }
});

describe('algorithm contracts beyond the default examples', () => {
  it('never hides NaN as null or drops undefined properties in the output viewer', () => {
    const output = JSON.parse(print({ invalid: Number('bad'), missing: undefined, empty: null, zero: -0 })) as Record<string, unknown>;
    expect(output.invalid).toEqual({ kind: 'number', value: 'NaN' });
    expect(output.missing).toEqual({ kind: 'undefined' });
    expect(output.empty).toBeNull(); expect(output.zero).toEqual({ kind: 'number', value: '-0' });
  });
  it('handles rejected values already yielded before an iterator itself fails', async () => {
    function* values() { yield Promise.reject(new Error('yielded rejection')); throw new Error('iterator failure'); }
    await expect(promiseAll(values())).rejects.toThrow('iterator failure');
    // Vitest also fails this test suite if the yielded rejection is left unhandled.
    await new Promise(resolve => setTimeout(resolve, 0));
  });
  it('handles factorial, Fibonacci and prime boundaries', () => {
    expect(factorial(0)).toBe(1n); expect(factorial(20)).toBe(2432902008176640000n);
    expect(fibonacci(0)).toBe(0); expect(fibonacci(1)).toBe(1); expect(fibonacci(20)).toBe(6765);
    expect([0, 1, 4, 9, 25, 49].map(isPrime)).toEqual([false, false, false, false, false, false]);
    expect([2, 3, 17, 97].every(isPrime)).toBe(true);
  });
  it('handles zero indices, duplicate addends and missing pairs', () => {
    expect(twoSum([0, 9], 9)).toEqual([0, 1]); expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    expect(twoSum([3], 6)).toBeNull(); expect(twoSum([], 0)).toBeNull();
  });
  it('validates missing-number assumptions and second-distinct maxima', () => {
    expect(missingNumber([])).toBe(0); expect(missingNumber([0, 1])).toBe(2);
    expect(() => missingNumber([0, 0])).toThrow(); expect(() => missingNumber([8])).toThrow();
    expect(secondLargest([])).toBeNull(); expect(secondLargest([2, 2])).toBeNull();
    expect(secondLargest([-5, -2, -3])).toBe(-3); expect(secondLargest([1, 0])).toBe(0);
  });
  it('normalizes anagrams while preserving multiplicities', () => {
    expect(anagram('Dormitory', 'dirty room')).toBe(true); expect(anagram('aab', 'abb')).toBe(false);
    expect(anagram('é', 'e\u0301')).toBe(true); expect(anagram('', '')).toBe(true);
  });
  it('bounds nested trees and preserves traversal order', () => {
    expect(flatten(parseTree('[[],[1,2],[3,[]]]'))).toEqual([1, 2, 3]);
    expect(() => parseTree('[1,"wrong"]')).toThrow(); expect(() => parseTree('[[[[[[[1]]]]]]]')).toThrow();
  });
  it('preserves graph aliases without exposing prototype-key mutation or invoking getters', () => {
    const shared = { value: 1 }; const graph = { a: shared, b: shared }; const copied = clonePlain(graph);
    expect(copied.a).toBe(copied.b); expect(copied.a).not.toBe(shared);
    const keyed: unknown = JSON.parse('{"__proto__":{"polluted":true}}'); const safe = clonePlain(keyed);
    expect(Object.hasOwn(safe as object, '__proto__')).toBe(true); expect(Reflect.get({}, 'polluted')).toBeUndefined();
    let read = false; expect(() => clonePlain({ get value() { read = true; return 1; } })).toThrow(); expect(read).toBe(false);
    expect(() => clonePlain(new Map())).toThrow();
  });
  it('matches numeric native array methods including sparse holes', () => {
    for (const values of [[], [0], [-2, 0, 3], [1, 2, 3, 4]]) {
      expect(mapNumbers(values, value => value * 2)).toEqual(values.map(value => value * 2));
      expect(filterNumbers(values, value => value > 0)).toEqual(values.filter(value => value > 0));
      expect(reduceNumbers(values, (sum, value) => sum + value, 0)).toBe(values.reduce((sum, value) => sum + value, 0));
    }
    const sparse = new Array<number>(4); sparse[2] = 7;
    expect(Object.keys(mapNumbers(sparse, value => value * 2))).toEqual(['2']);
  });
});
