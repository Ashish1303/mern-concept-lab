import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    const collection = records(db);
    return { deleted: (await collection.deleteOne({ title: input })).deletedCount, remaining: await collection.countDocuments() };
  },
  async ({ db }) => {
    await seed(db);
    return { deleted: (await records(db).deleteOne({ title: 'Never inserted' })).deletedCount };
  },
  async ({ db, input }) => {
    await seed(db);
    const collection = records(db);
    const result = await collection.deleteOne({ title: input });
    return { deleted: result.deletedCount, found: await collection.findOne({ title: input }) };
  }
];
