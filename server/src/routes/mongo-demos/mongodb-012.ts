import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    const collection = records(db);
    const result = await collection.updateMany({ category: input }, { $inc: { price: 5 } });
    return { modified: result.modifiedCount, records: await collection.find({ category: input }).sort({ title: 1 }).toArray() };
  },
  async ({ db }) => {
    await seed(db);
    const collection = records(db);
    const filter = { category: 'web' };
    await collection.updateMany(filter, { $addToSet: { tags: 'reviewed' } });
    const second = await collection.updateMany(filter, { $addToSet: { tags: 'reviewed' } });
    return { tagged: await collection.countDocuments({ tags: 'reviewed' }), secondModified: second.modifiedCount };
  }
];
