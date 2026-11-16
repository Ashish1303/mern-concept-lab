import { seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return { dedicatedLab: db.databaseName.startsWith('mern_lab_'), collections: (await db.listCollections().toArray()).map(item => item.name).sort() };
  },
  ({ db }) => {
    return db.command({ ping: 1 });
  }
];
