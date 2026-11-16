import { appendFile, readFile, rename, writeFile } from 'node:fs/promises';
import { withFixture } from '../node-tools.js';

export const examples = [
  async (input: string) => {
    return withFixture('first line\n', async file => {
      await appendFile(file, input + '\n');
      return (await readFile(file, 'utf8')).trimEnd().split('\n');
    });
  },
  async (input: string) => {
    return withFixture('original', async file => {
      const staged = file + '.next';
      await writeFile(staged, input, { flag: 'wx' });
      await rename(staged, file);
      return readFile(file, 'utf8');
    });
  }
];
