import { records, seed, numberInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).find({ price: { $in: [numberInput(input)] } }).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).countDocuments({ 'details.rating': { $exists: true } });
  },
  async ({ db, input }) => {
    await seed(db);
    return records(db).find({ price: { $gte: numberInput(input) } }).sort({ price: 1, title: 1 }).toArray();
  }
];
