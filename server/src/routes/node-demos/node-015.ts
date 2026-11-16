import { posix, win32 } from 'node:path';

export const examples = [
  (input: string) => {
    return { posix: posix.parse(input), win32: win32.parse(input.replaceAll('/', '\\')) };
  },
  (input: string) => {
    return { normalized: posix.normalize(input), extension: posix.extname(input) };
  }
];
