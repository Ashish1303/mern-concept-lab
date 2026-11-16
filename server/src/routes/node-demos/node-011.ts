import { parseEnv } from 'node:util';
import { fixedChild } from '../node-tools.js';

export const examples = [
  (input: string) => {
    const vars = parseEnv('LAB_TIMEOUT=' + input);
    const timeout = Number(vars.LAB_TIMEOUT);
    return { valid: Number.isInteger(timeout) && timeout >= 10 && timeout <= 1000, timeout } ;
  },
  (input: string) => {
    return fixedChild("console.log(JSON.stringify({ mode: process.env.LAB_MODE }));", '', [], { LAB_MODE: input });
  }
];
