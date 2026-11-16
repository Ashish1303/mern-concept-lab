import { setImmediate as immediate } from 'node:timers/promises';

export const examples = [
  async () => {
    const order: string[] = [];
    Promise.resolve().then(() => order.push('promise'));
    queueMicrotask(() => order.push('queueMicrotask'));
    await immediate();
    return order;
  },
  async () => {
    const order: string[] = [];
    queueMicrotask(() => { order.push('first'); queueMicrotask(() => order.push('nested')); });
    queueMicrotask(() => order.push('second'));
    await immediate();
    return order;
  }
];
