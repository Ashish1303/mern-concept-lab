import { basename } from 'node:path';
import { createRequire } from 'node:module';
import { withFixture } from '../node-tools.js';
import { rename } from 'node:fs/promises';

export const examples = [
  async () => {
    return withFixture('module.exports = { visits: 0 };', async file => {
      const module = file + '.cjs';
      await rename(file, module);
      const load = createRequire(import.meta.url);
      const first = load(module) as { visits: number };
      try {
        first.visits++;
        const second = load(module) as typeof first;
        return { same: first === second, visits: second.visits, file: basename(module) };
      } finally { delete load.cache[module]; }
    });
  },
  async () => {
    return withFixture("exports.first = true; exports = { ignored: true }; module.exports.final = true;", async file => {
      const module = file + '.cjs';
      await rename(file, module);
      const load = createRequire(import.meta.url);
      try { return load(module) as unknown; }
      finally { delete load.cache[module]; }
    });
  }
];
