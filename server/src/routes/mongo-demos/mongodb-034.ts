import { book, ObjectId, records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).aggregate([{ $match: { title: input } }, { $lookup: { from: 'authors', localField: 'author', foreignField: '_id', as: 'authorRows' } }]).toArray();
  },
  async ({ db }) => {
    const collection = records(db);
    await collection.insertOne({ ...book('Unassigned'), author: new ObjectId() });
    return collection.aggregate([{ $lookup: { from: 'authors', localField: 'author', foreignField: '_id', as: 'authorRows' } }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return db.collection('authors').aggregate([{ $lookup: { from: 'books', localField: '_id', foreignField: 'author', as: 'books' } }, { $sort: { name: 1 } }]).toArray();
  }
];
