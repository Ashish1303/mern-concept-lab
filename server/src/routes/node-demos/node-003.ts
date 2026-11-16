import { setImmediate as immediate, setTimeout as delay } from 'node:timers/promises';
import { readFile } from 'node:fs';
import { fixedChild, withFixture } from '../node-tools.js';

export const examples = [
  async () => {
    const order = ['start'];
    queueMicrotask(() => order.push('microtask'));
    order.push('end');
    await immediate();
    return order;
  },
  (input: string) => {
    return withFixture(input, file => new Promise<string[]>((resolve, reject) => {
      readFile(file, error => {
        if (error) { reject(error); return; }
        const order = ['I/O callback'];
        setImmediate(() => order.push('immediate'));
        setTimeout(() => resolve([...order, 'timer']), 0);
      });
    }));
  },
  async () => {
    const order: string[] = [];
    await Promise.all([delay(0).then(() => order.push('timer')), immediate().then(() => order.push('immediate'))]);
    return order;
  },
  () => {
    return fixedChild("process.nextTick(() => console.log('nextTick')); queueMicrotask(() => console.log('microtask'));", '', ['--input-type=commonjs']);
  },
  async () => {
    const order: string[] = [];
    await new Promise<void>(resolve => setImmediate(() => {
      order.push('first immediate');
      queueMicrotask(() => order.push('microtask'));
      setImmediate(() => { order.push('second immediate'); resolve(); });
    }));
    return order;
  }
];
