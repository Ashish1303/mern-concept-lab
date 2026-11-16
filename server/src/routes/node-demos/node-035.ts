import { Worker } from 'node:worker_threads';
import { once } from 'node:events';
import { fixedWorker } from '../node-tools.js';

export const examples = [
  async () => {
    const buffer = Uint8Array.from([7, 8, 9]).buffer;
    const worker = new Worker("const { parentPort } = require('node:worker_threads'); parentPort.once('message', bytes => parentPort.postMessage(new Uint8Array(bytes)[0]));", { eval: true });
    try {
      const reply = once(worker, 'message', { signal: AbortSignal.timeout(2500) });
      worker.postMessage(buffer, [buffer]);
      const [firstByte] = await reply;
      return { senderBytes: buffer.byteLength, firstByte };
    } finally { await worker.terminate(); }
  },
  async () => {
    try { await fixedWorker("throw new Error('Worker fixture failure');", 0); }
    catch (error) { return { message: (error as Error).message }; }
    return 'Unexpected success';
  }
];
