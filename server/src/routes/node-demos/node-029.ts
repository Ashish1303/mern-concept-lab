import { once } from 'node:events';
import { Writable, Readable } from 'node:stream';
import { finished, pipeline } from 'node:stream/promises';

export const examples = [
  async () => {
    const sink = new Writable({ highWaterMark: 1, write(_chunk, _encoding, next) { setImmediate(next); } });
    const ready = sink.write('AB');
    if (!ready) await once(sink, 'drain');
    sink.end();
    await finished(sink, { cleanup: true });
    return { acceptedBelowThreshold: ready, finished: sink.writableFinished };
  },
  async () => {
    let peak = 0;
    const sink = new Writable({ highWaterMark: 2, write(_chunk, _encoding, next) { peak = Math.max(peak, this.writableLength); setImmediate(next); } });
    await pipeline(Readable.from(Array.from({ length: 8 }, () => 'x')), sink);
    return { peakBufferedBytes: peak, totalBytes: 8 };
  }
];
