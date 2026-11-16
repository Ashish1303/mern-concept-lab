import { readFile } from 'node:fs/promises';
import { withFixture } from '../node-tools.js';

export const examples = [
  () => {
    return { node: process.versions.node, v8: process.versions.v8, libuv: process.versions.uv };
  },
  async (input: string) => {
    return withFixture(input, async file => {
      const events = ['start'];
      const read = readFile(file, 'utf8').then(value => events.push('read: ' + value));
      events.push('scheduled');
      await read;
      return events;
    });
  }
];
