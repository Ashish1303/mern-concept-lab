import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { createHash } from 'node:crypto';
import { withFixture } from '../node-tools.js';

export const examples = [
  async (input: string) => {
    return withFixture((input + '\n').repeat(256), async file => {
      const lines = createInterface({ input: createReadStream(file), crlfDelay: Infinity });
      let count = 0;
      for await (const line of lines) if (line) count++;
      return { count };
    });
  },
  async (input: string) => {
    return withFixture(input.repeat(256), async file => {
      const hash = createHash('sha256');
      let bytes = 0;
      for await (const chunk of createReadStream(file, { highWaterMark: 128 })) { hash.update(chunk); bytes += chunk.length; }
      return { bytes, digest: hash.digest('hex') };
    });
  }
];
