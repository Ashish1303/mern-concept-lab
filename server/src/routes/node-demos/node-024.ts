import { readFile } from 'node:fs';
import { readFile as readAsync } from 'node:fs/promises';
import { promisify } from 'node:util';
import { withFixture } from '../node-tools.js';

export const examples = [
  (input: string) => {
    return withFixture(input, file => new Promise<string>((resolve, reject) => {
      readFile(file, 'utf8', (error, text) => { if (error) reject(error); else resolve(text); });
    }));
  },
  (input: string) => {
    const read = promisify(readFile);
    return withFixture(input, file => read(file, 'utf8'));
  },
  async (input: string) => {
    return withFixture(input, async file => {
      const text = await readAsync(file, 'utf8');
      return text.toUpperCase();
    });
  },
  async (input: string) => {
    return withFixture(input, async file => {
      const results = await Promise.allSettled([readAsync(file), readAsync(file + '.missing')]);
      return results.map(result => result.status);
    });
  },
  async () => {
    return withFixture('', async file => {
      try { return await readAsync(file + '.missing', 'utf8'); }
      catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return 'Fallback text';
        throw error;
      }
    });
  }
];
