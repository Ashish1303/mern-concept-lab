import { Writable } from 'node:stream';
import { finished } from 'node:stream/promises';

export const examples = [
  async (input: string) => {
    const chunks: string[] = [];
    const sink = new Writable({ write(chunk, _encoding, next) { chunks.push(String(chunk)); next(); } });
    const completion = finished(sink, { cleanup: true });
    sink.write(input); sink.end(' final');
    await completion;
    return { chunks, finished: sink.writableFinished };
  },
  async () => {
    let batch: string[] = [];
    const sink = new Writable({ writev(entries, next) { batch = entries.map(entry => String(entry.chunk)); next(); } });
    const completion = finished(sink, { cleanup: true });
    sink.cork(); sink.write('A'); sink.write('B'); sink.end();
    await completion;
    return batch;
  }
];
