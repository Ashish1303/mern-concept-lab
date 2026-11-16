import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).find({ category: input }).sort({ title: 1 }).limit(10).toArray();
  },
  async ({ db }) => {
    await seed(db);
    const titles: string[] = [];
    for await (const row of records(db).find().sort({ price: 1, title: 1 }).limit(2)) titles.push(row.title);
    return titles;
  },
  async ({ db, input }) => {
    await seed(db);
    return records(db).find({ category: input }, { projection: { _id: 0, title: 1 } }).sort({ title: 1 }).toArray();
  }
];
