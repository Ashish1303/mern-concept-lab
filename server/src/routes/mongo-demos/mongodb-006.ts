import { book, records, seed, textInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    const collection = records(db);
    const { insertedId } = await collection.insertOne(book(textInput(input)));
    const created = await collection.findOne({ _id: insertedId });
    await collection.updateOne({ _id: insertedId }, { $set: { price: 25 } });
    const updated = await collection.findOne({ _id: insertedId });
    const deleted = await collection.deleteOne({ _id: insertedId });
    return { created, updated, deleted: deleted.deletedCount, after: await collection.findOne({ _id: insertedId }) };
  },
  async ({ db }) => {
    const collection = records(db);
    const updated = await collection.updateOne({ title: 'missing' }, { $set: { price: 1 } });
    return { matched: updated.matchedCount, modified: updated.modifiedCount, deleted: (await collection.deleteOne({ title: 'missing' })).deletedCount };
  }
];
