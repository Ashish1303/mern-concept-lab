import { fixedChild } from '../node-tools.js';

export const examples = [
  async (input: string) => {
    const { extname } = await import('node:path');
    return extname(input);
  },
  () => {
    return fixedChild("const m = await import('data:text/javascript,export let n=1;export function step(){n++}'); console.log(m.n); m.step(); console.log(m.n);", '', ['--input-type=module']);
  }
];
