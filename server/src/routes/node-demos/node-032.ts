import { EventEmitter } from 'node:events';

export const examples = [
  () => {
    const emitter = new EventEmitter();
    const handlers = Array.from({ length: 5 }, () => () => {});
    for (const handler of handlers) emitter.on('update', handler);
    const retained = emitter.listenerCount('update');
    for (const handler of handlers) emitter.off('update', handler);
    return { retained, afterCleanup: emitter.listenerCount('update') };
  },
  () => {
    const cache = new Map<number, string>();
    for (let index = 1; index <= 6; index++) {
      cache.set(index, 'entry ' + index);
      const oldest = cache.keys().next().value;
      if (cache.size > 3 && oldest !== undefined) cache.delete(oldest);
    }
    return [...cache.keys()];
  }
];
