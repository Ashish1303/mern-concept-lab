import { records, seed, numberInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).findOne({ title: input });
  },
  async ({ db, input }) => {
    await seed(db);
    await records(db).updateOne({ title: 'Mongo Primer' }, { $set: { 'details.pages': numberInput(input) } });
    return (await records(db).findOne({ title: 'Mongo Primer' }))?.details;
  }
];
