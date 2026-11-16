import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return records(db).find({}, { projection: { _id: 0, title: 1, price: 1 } }).sort({ price: 1, title: 1 }).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).find().sort({ 'details.pages': -1, title: 1 }).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).find().sort({ price: -1, title: 1 }).toArray();
  }
];
