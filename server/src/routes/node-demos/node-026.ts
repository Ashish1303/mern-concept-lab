import { Readable } from 'node:stream';

export const examples = [
  async (input: string) => {
    const chunks: string[] = [];
    for await (const chunk of Readable.from([...input])) chunks.push(String(chunk));
    return chunks;
  },
  () => {
    const source = Readable.from(['first', 'second']);
    return new Promise<string[]>((resolve, reject) => {
      const chunks: string[] = [];
      source.on('data', chunk => chunks.push(String(chunk)));
      source.once('end', () => resolve(chunks));
      source.once('error', reject);
    });
  }
];
