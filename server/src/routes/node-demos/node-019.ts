import { createHash, randomBytes } from 'node:crypto';

export const examples = [
  (input: string) => {
    return createHash('sha256').update(input).digest('hex');
  },
  () => {
    const first = randomBytes(12).toString('hex');
    const second = randomBytes(12).toString('hex');
    return { first, second, equal: first === second };
  }
];
