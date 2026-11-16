import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createGzip, gunzipSync } from 'node:zlib';

export const examples = [
  async (input: string) => {
    const upper = new Transform({ transform(chunk, _encoding, next) { next(null, String(chunk).toUpperCase()); } });
    let output = '';
    await pipeline(Readable.from([input, ' node']), upper, async source => {
      for await (const chunk of source) output += String(chunk);
    });
    return output;
  },
  async (input: string) => {
    return pipeline(Readable.from([input]), createGzip(), async source => {
      const chunks: Buffer[] = [];
      for await (const chunk of source) chunks.push(chunk as Buffer);
      const compressed = Buffer.concat(chunks);
      return { compressedBytes: compressed.length, restored: gunzipSync(compressed).toString() };
    });
  }
];
