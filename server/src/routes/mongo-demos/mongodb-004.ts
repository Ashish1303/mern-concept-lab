import { BSON, records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  ({ input }) => {
    const bytes = BSON.serialize({ title: input, date: new Date('2025-01-01T00:00:00Z') });
    const decoded = BSON.deserialize(bytes);
    return { bytes: bytes.length, title: decoded.title, dateType: decoded.date instanceof Date };
  },
  async ({ db }) => {
    await seed(db);
    return records(db).aggregate([{ $limit: 1 }, { $project: { _id: 0, authorType: { $type: '$author' } } }]).toArray();
  }
];
