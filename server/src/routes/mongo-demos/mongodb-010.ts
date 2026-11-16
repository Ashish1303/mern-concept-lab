import { ObjectId, book, records, textInput, isDuplicate } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    const result = await records(db).insertMany([book(textInput(input) + ' one'), book(input + ' two')]);
    return { inserted: result.insertedCount, total: await records(db).countDocuments() };
  },
  async ({ db }) => {
    const collection = records(db);
    const _id = new ObjectId();
    await collection.insertOne({ ...book('Existing'), _id });
    try { await collection.insertMany([{ ...book('Duplicate'), _id }, book('Distinct')], { ordered: false }); }
    catch (error) { if (!isDuplicate(error)) throw error; }
    return { distinctStored: !!(await collection.findOne({ title: 'Distinct' })), total: await collection.countDocuments() };
  }
];
