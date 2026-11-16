import { EventEmitter, once } from 'node:events';

export const examples = [
  () => {
    const emitter = new EventEmitter();
    const events: string[] = [];
    emitter.on('ready', () => events.push('first'));
    emitter.on('ready', () => events.push('second'));
    emitter.emit('ready');
    return events;
  },
  async (input: string) => {
    const emitter = new EventEmitter();
    const outcome = once(emitter, 'ready');
    queueMicrotask(() => emitter.emit('ready', input));
    return await outcome;
  }
];
