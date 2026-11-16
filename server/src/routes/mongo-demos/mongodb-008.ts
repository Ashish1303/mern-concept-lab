import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return records(db).findOne({ title: input });
  },
  async ({ db }) => {
    await seed(db);
    return records(db).findOne({}, { sort: { price: -1, title: 1 } });
  }
];
