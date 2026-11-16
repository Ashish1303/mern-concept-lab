import { fixedChild } from '../node-tools.js';

export const examples = [
  () => {
    return fixedChild("console.error('Task failed'); process.exitCode = 5;");
  },
  (input: string) => {
    return fixedChild("console.log(process.env.LAB_LABEL); console.log(Object.hasOwn(process.env, 'LAB_UNSET'));", '', [], { LAB_LABEL: input });
  }
];
