import { AsyncLocalStorage } from 'node:async_hooks';
import { setImmediate as immediate } from 'node:timers/promises';

export const examples = [
  async () => {
    const context = new AsyncLocalStorage<string>();
    return Promise.all(['request-a', 'request-b'].map(id => context.run(id, async () => {
      await immediate();
      return { requestId: context.getStore(), event: 'fixture completed' };
    })));
  },
  (input: string) => {
    const event = { operation: 'save fixture', durationMs: 14, submittedText: input };
    return JSON.stringify({ operation: event.operation, durationMs: event.durationMs });
  }
];
