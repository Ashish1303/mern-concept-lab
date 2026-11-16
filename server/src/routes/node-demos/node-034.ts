import { setImmediate as immediate } from 'node:timers/promises';
import { fixedWorker } from '../node-tools.js';

export const examples = [
  async () => {
    const events = ['start'];
    const queued = immediate().then(() => events.push('callback'));
    let sum = 0;
    for (let index = 0; index < 10000; index++) sum += index;
    events.push('sum ' + sum);
    await queued;
    return events;
  },
  async () => {
    const events = ['start'];
    const work = fixedWorker("const { parentPort, workerData } = require('node:worker_threads'); let sum = 0; for (let i = 0; i < workerData; i++) sum += i; parentPort.postMessage(sum);", 10000);
    await immediate();
    events.push('main thread callback');
    return { events, sum: await work };
  }
];
