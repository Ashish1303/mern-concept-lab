import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).aggregate([{ $match: { category: input } }, { $project: { _id: 0, title: 1 } }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $group: { _id: '$category', total: { $sum: '$price' } } }, { $sort: { total: -1 } }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $sort: { price: 1, title: 1 } }, { $limit: 2 }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $addFields: { withFee: { $add: ['$price', 3] } } }, { $project: { _id: 0, title: 1, withFee: 1 } }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $count: 'total' }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $group: { _id: '$category', total: { $sum: '$price' }, count: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray();
  }
];
