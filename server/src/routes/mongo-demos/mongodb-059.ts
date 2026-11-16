import { book, ObjectId, records, isDuplicate } from '../mongo-tools.js';
import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ connection }) => {
    const { Book } = models(connection);
    try { await Book.create({ title: 'Invalid price', price: -10 }); }
    catch (error) { if (error instanceof Error && error.name === 'ValidationError') return { category: 'validation', name: error.name }; throw error; }
    throw new Error('Expected validation error');
  },
  async ({ db }) => {
    const collection = records(db);
    const value = { ...book('Conflict'), _id: new ObjectId() };
    await collection.insertOne(value);
    try { await collection.insertOne(value); }
    catch (error) { if (isDuplicate(error)) return { category: 'conflict', code: 11000 }; throw error; }
    throw new Error('Expected duplicate key');
  }
];
