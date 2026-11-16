import { records, seed, numberInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).find().sort({ price: 1, title: 1 }).skip(numberInput(input, 0, 4)).limit(2).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).find().sort({ price: 1, title: 1 }).limit(1).toArray();
  }
];
