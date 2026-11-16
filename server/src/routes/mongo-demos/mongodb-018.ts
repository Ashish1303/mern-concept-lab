import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return records(db).find({}, { projection: { _id: 0, title: 1, price: 1 } }).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).findOne({}, { projection: { tags: 0, details: 0 } });
  }
];
