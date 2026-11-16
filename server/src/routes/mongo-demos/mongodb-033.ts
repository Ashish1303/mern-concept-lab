import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $project: { _id: 0, label: '$title' } }]).toArray();
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $project: { _id: 0, title: 1, tagCount: { $size: '$tags' } } }]).toArray();
  }
];
