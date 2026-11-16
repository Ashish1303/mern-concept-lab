import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    const orders = db.collection('orders');
    await orders.insertOne({ number: 1, lines: [{ sku: 'book', quantity: 2 }] });
    return orders.findOne({ number: 1 });
  },
  async ({ db }) => {
    const rows = db.collection('lines');
    await rows.insertMany([{ order: 1, sku: 'book' }, { order: 1, sku: 'pen' }, { order: 2, sku: 'book' }]);
    return rows.countDocuments({ order: 1 });
  }
];
