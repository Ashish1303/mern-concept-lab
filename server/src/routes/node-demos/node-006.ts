import { setTimeout as delay } from 'node:timers/promises';

export const examples = [
  async (input: string) => {
    const requested = Math.min(100, Math.max(10, Number(input) || 25));
    const start = performance.now();
    await delay(requested);
    return { requested, elapsed: Math.round(performance.now() - start) };
  },
  async () => {
    const controller = new AbortController();
    const timer = delay(200, 'finished', { signal: controller.signal });
    controller.abort();
    try { return await timer; }
    catch (error) { return { name: (error as Error).name }; }
  }
];
