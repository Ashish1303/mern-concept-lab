import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    const index = await records(db).createIndex({ category: 1, price: 1 });
    return records(db).find({ category: input }).hint(index).sort({ price: 1 }).toArray();
  },
  async ({ db }) => {
    const collection = records(db);
    await collection.createIndex({ category: 1, price: -1 });
    return (await collection.indexes()).find(index => index.name === 'category_1_price_-1');
  }
];
