import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $facet: { page: [{ $sort: { title: 1 } }, { $limit: 2 }], totals: [{ $count: 'count' }] } }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $facet: {
      prices: [{ $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } }],
      categories: [{ $sortByCount: '$category' }, { $sort: { count: -1, _id: 1 } }]
    } }]).toArray();
  }
];
