import { Readable, Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

export const examples = [
  async (input: string) => {
    const chunks: string[] = [];
    await pipeline(Readable.from([input, ' done']), new Writable({ write(chunk, _encoding, next) { chunks.push(String(chunk)); next(); } }));
    return chunks;
  },
  async () => {
    const sink = new Writable({ write(_chunk, _encoding, next) { next(new Error('sink rejected')); } });
    try { await pipeline(Readable.from(['sample']), sink); }
    catch (error) { return { error: (error as Error).message, destroyed: sink.destroyed }; }
    return 'Unexpected success';
  }
];
