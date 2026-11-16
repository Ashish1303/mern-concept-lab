import { records, seed, numberInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    const page = numberInput(input, 1, 5);
    const collection = records(db);
    return { page, total: await collection.countDocuments(), data: await collection.find().sort({ title: 1 }).skip((page - 1) * 2).limit(2).toArray() };
  },
  async ({ db, input }) => {
    await seed(db);
    await records(db).createIndex({ title: 1 });
    return records(db).find({ title: { $gt: input } }).sort({ title: 1 }).limit(2).toArray();
  },
  async ({ db, input }) => {
    await seed(db);
    const page = numberInput(input, 1, 5);
    return { total: await records(db).countDocuments(), data: await records(db).find().sort({ title: 1 }).skip((page - 1) * 2).limit(2).toArray() };
  }
];
