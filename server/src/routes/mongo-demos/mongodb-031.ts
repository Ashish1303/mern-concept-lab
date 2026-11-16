import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).aggregate([{ $match: { category: input } }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $match: { count: 2 } }]).toArray();
  }
];
