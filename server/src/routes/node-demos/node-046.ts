import { performance } from 'node:perf_hooks';
import { setTimeout as delay } from 'node:timers/promises';

export const examples = [
  (input: string) => {
    const start = performance.now();
    const bytes = Buffer.byteLength(input.repeat(100));
    return { bytes, elapsedMs: performance.now() - start };
  },
  async () => {
    const start = performance.eventLoopUtilization();
    await delay(25);
    const delta = performance.eventLoopUtilization(start);
    return { active: delta.active, idle: delta.idle, utilization: delta.utilization };
  }
];
