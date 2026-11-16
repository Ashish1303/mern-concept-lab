import { book, records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $unwind: '$tags' }, { $count: 'rows' }]).toArray();
  },
  async ({ db }) => {
    await records(db).insertOne({ ...book('Untagged'), tags: [] });
    return records(db).aggregate([{ $unwind: { path: '$tags', preserveNullAndEmptyArrays: true } }]).toArray();
  }
];
