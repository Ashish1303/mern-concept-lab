import { records, seed, numberInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    await records(db).createIndex({ title: 1 });
    return (await records(db).indexes()).map(index => index.name);
  },
  async ({ db, input }) => {
    await seed(db);
    const name = await records(db).createIndex({ price: 1 });
    return { index: name, rows: await records(db).find({ price: numberInput(input) }).hint(name).toArray() };
  }
];
