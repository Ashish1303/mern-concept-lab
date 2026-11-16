import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return records(db).find({ tags: { $all: ['db', 'starter'] } }).toArray();
  },
  async ({ db }) => {
    const orders = db.collection('orders');
    await orders.insertMany([{ order: 1, lines: [{ sku: 'book', count: 1 }, { sku: 'pen', count: 4 }] }, { order: 2, lines: [{ sku: 'book', count: 4 }] }]);
    return orders.find({ lines: { $elemMatch: { sku: 'book', count: { $gte: 3 } } } }).toArray();
  }
];
