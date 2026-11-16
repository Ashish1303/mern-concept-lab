import { fixedChild } from '../node-tools.js';

export const examples = [
  (input: string) => {
    return fixedChild("let text=''; process.stdin.setEncoding('utf8').on('data', chunk => text += chunk).on('end', () => console.log(text.toUpperCase()));", input);
  },
  () => {
    return fixedChild("console.log('normal output'); console.error('diagnostic output');");
  }
];
