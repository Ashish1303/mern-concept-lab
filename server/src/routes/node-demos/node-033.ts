import { fixedChild } from '../node-tools.js';

export const examples = [
  () => {
    return fixedChild("let values = Array.from({length:50000}, (_, i) => ({i})); const before = process.memoryUsage().heapUsed; values = null; global.gc(); console.log(JSON.stringify({before, after:process.memoryUsage().heapUsed}));", '', ['--expose-gc']);
  },
  () => {
    return fixedChild("const retained = [{ label: 'still reachable' }]; global.gc(); console.log(retained[0].label);", '', ['--expose-gc']);
  }
];
