import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return records(db).find({ $or: [{ category: 'db' }, { price: 15 }] }).sort({ title: 1 }).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).find({ $nor: [{ category: 'db' }, { price: 15 }] }).toArray();
  }
];
