import { records, seed, numberInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).find({ price: { $gte: numberInput(input), $lte: 30 } }).sort({ price: 1, title: 1 }).toArray();
  },
  async ({ db, input }) => {
    await seed(db);
    return records(db).countDocuments({ price: { $ne: numberInput(input) } });
  }
];
