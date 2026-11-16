import { fixedWorker } from '../node-tools.js';

export const examples = [
  (input: string) => {
    return fixedWorker("const { parentPort, workerData, threadId } = require('node:worker_threads'); parentPort.postMessage({ text: workerData.toUpperCase(), threadId });", input);
  },
  async () => {
    const result = await fixedWorker("const { parentPort } = require('node:worker_threads'); parentPort.postMessage(new Map([['value', 42]]));", '');
    return { isMap: result instanceof Map, entries: [...(result as Map<string, number>)] };
  }
];
