import { ObjectId, book, records, textInput, isDuplicate } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    const collection = records(db);
    await collection.createIndex({ title: 1 }, { unique: true });
    await collection.insertOne(book(textInput(input)));
    try { await collection.insertOne(book(input.trim())); }
    catch (error) { if (isDuplicate(error)) return { code: 11000, count: await collection.countDocuments() }; throw error; }
    throw new Error('Expected duplicate key');
  },
  async ({ db }) => {
    await records(db).createIndex({ title: 1 }, { unique: true });
    return (await records(db).indexes()).find(index => index.name === 'title_1');
  },
  async ({ db }) => {
    const collection = records(db);
    const row = { ...book('Duplicate fixture'), _id: new ObjectId() };
    await collection.insertOne(row);
    try { await collection.insertOne(row); }
    catch (error) { if (isDuplicate(error)) return { code: 11000, total: await collection.countDocuments() }; throw error; }
    throw new Error('Expected duplicate key');
  }
];
