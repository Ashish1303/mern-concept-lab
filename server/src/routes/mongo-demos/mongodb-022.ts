import { records, seed, numberInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).find({ 'details.rating': numberInput(input, 0, 5) }).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).findOne({ title: 'Mongo Primer' }, { projection: { _id: 0, 'details.pages': 1 } });
  }
];
