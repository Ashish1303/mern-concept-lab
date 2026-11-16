import { records, seed, textInput, numberInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    const update = await records(db).updateOne({ title: 'Mongo Primer' }, { $set: { price: numberInput(input) } });
    return { matched: update.matchedCount, modified: update.modifiedCount };
  },
  async ({ db }) => {
    await seed(db);
    const update = await records(db).updateOne({ title: 'Mongo Primer' }, { $set: { price: 20 } });
    return { matched: update.matchedCount, modified: update.modifiedCount };
  },
  async ({ db, input }) => {
    await seed(db);
    const collection = records(db);
    const update = await collection.updateOne({ title: 'Mongo Primer' }, { $set: { title: textInput(input) } });
    return { modified: update.modifiedCount, book: await collection.findOne({ title: input.trim() }) };
  }
];
