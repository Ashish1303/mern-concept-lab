import { records, seed, textInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    await records(db).createIndex({ title: 'text' });
    return records(db).find({ $text: { $search: textInput(input) } }).toArray();
  },
  async ({ db, input }) => {
    await seed(db);
    await records(db).createIndex({ title: 'text' });
    return records(db).find({ $text: { $search: textInput(input) } }, {
      projection: { _id: 0, title: 1, score: { $meta: 'textScore' } }
    }).sort({ score: { $meta: 'textScore' }, title: 1 }).toArray();
  }
];
