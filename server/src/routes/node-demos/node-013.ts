import { readFile } from 'node:fs/promises';
import { withFixture } from '../node-tools.js';

export const examples = [
  async () => {
    return withFixture('sample', async file => {
      try { await readFile(file + '.missing'); }
      catch (error) { return { code: (error as NodeJS.ErrnoException).code }; }
      return 'Unexpected success';
    });
  },
  () => {
    try { throw new Error('Cannot load lab data', { cause: new TypeError('Invalid shape') }); }
    catch (error) {
      const failure = error as Error;
      return { message: failure.message, cause: (failure.cause as Error).message };
    }
  }
];
