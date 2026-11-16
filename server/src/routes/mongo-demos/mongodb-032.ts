import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $group: { _id: null, average: { $avg: '$price' } } }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $group: { _id: '$author', count: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray();
  }
];
