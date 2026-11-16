import { EventEmitter } from 'node:events';

export const examples = [
  () => {
    const emitter = new EventEmitter();
    let single = 0;
    let every = 0;
    emitter.once('tick', () => single++);
    emitter.on('tick', () => every++);
    emitter.emit('tick'); emitter.emit('tick');
    return { single, every };
  },
  () => {
    const emitter = new EventEmitter();
    let count = 0;
    const listener = () => count++;
    emitter.on('event', listener);
    emitter.emit('event');
    emitter.off('event', listener);
    emitter.emit('event');
    return { count, listeners: emitter.listenerCount('event') };
  }
];
