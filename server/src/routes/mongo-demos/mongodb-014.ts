import { records, seed, textInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    const collection = records(db);
    const result = await collection.deleteMany({ category: textInput(input) });
    return { deleted: result.deletedCount, remaining: await collection.countDocuments() };
  },
  async ({ db }) => {
    await seed(db);
    const collection = records(db);
    return { deleted: (await collection.deleteMany({ category: 'missing' })).deletedCount, remaining: await collection.countDocuments() };
  }
];
