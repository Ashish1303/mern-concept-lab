import { availableParallelism, EOL, platform, endianness } from 'node:os';

export const examples = [
  () => {
    return { platform: platform(), byteOrder: endianness() };
  },
  () => {
    return { newlineBytes: [...Buffer.from(EOL)], availableParallelism: availableParallelism() };
  }
];
