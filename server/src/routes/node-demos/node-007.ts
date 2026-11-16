import { readFile, stat } from 'node:fs/promises';
import { withFixture } from '../node-tools.js';

export const examples = [
  async (input: string) => {
    return withFixture(input, async file => {
      const events: string[] = [];
      const read = readFile(file, 'utf8').then(data => events.push('read: ' + data));
      events.push('independent work');
      await read;
      return events;
    });
  },
  async (input: string) => {
    return withFixture(input, async file => {
      const [metadata, text] = await Promise.all([stat(file), readFile(file, 'utf8')]);
      return { bytes: metadata.size, text };
    });
  }
];
