import { seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await db.createCollection('notes');
    return { created: (await db.listCollections({ name: 'notes' }).toArray()).length === 1, count: await db.collection('notes').countDocuments() };
  },
  async ({ db }) => {
    await seed(db);
    return (await db.listCollections({}, { nameOnly: true }).toArray()).map(item => item.name).sort();
  }
];
