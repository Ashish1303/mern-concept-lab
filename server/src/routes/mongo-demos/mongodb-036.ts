import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $group: { _id: '$category', total: { $sum: '$price' } } }, { $sort: { total: -1, _id: 1 } }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $sort: { price: -1, title: 1 } }, { $project: { _id: 0, title: 1, price: 1 } }]).toArray();
  }
];
