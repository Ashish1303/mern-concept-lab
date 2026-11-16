import { readFile, open, stat } from 'node:fs/promises';
import { withFixture } from '../node-tools.js';

export const examples = [
  async (input: string) => {
    return withFixture(input, async file => ({ text: await readFile(file, 'utf8'), bytes: (await stat(file)).size }));
  },
  async (input: string) => {
    return withFixture(input, async file => {
      const handle = await open(file);
      try {
        const result = await handle.read(Buffer.alloc(3), 0, 3, 0);
        return { bytes: result.bytesRead, hex: result.buffer.subarray(0, result.bytesRead).toString('hex') };
      } finally { await handle.close(); }
    });
  }
];
