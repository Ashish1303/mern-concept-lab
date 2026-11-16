import { ObjectId, book, records, seed, textInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    const collection = records(db);
    const { insertedId } = await collection.insertOne(book(textInput(input)));
    return collection.findOne({ _id: insertedId });
  },
  async ({ db }) => {
    const _id = new ObjectId('000000000000000000000010');
    const result = await records(db).insertOne({ ...book('Fixed ID'), _id });
    return { acknowledged: result.acknowledged, exactId: _id.equals(result.insertedId) };
  },
  async ({ db, input }) => {
    await seed(db);
    const result = await records(db).insertOne(book(textInput(input)));
    return { insertedId: result.insertedId, total: await records(db).countDocuments() };
  }
];
