import { Buffer } from 'node:buffer';

export const examples = [
  (input: string) => {
    const bytes = Buffer.from(input, 'utf8');
    return { codeUnits: input.length, bytes: bytes.length, hex: bytes.toString('hex') };
  },
  () => {
    const original = Buffer.from([1, 2, 3]);
    const view = original.subarray(1);
    view[0] = 9;
    return { original: [...original], view: [...view] };
  }
];
