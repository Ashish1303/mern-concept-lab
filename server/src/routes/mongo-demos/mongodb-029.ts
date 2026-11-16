import { records, seed, planStats } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    await seed(db);
    return planStats(await records(db).find({ price: 20 }).hint({ $natural: 1 }).explain('executionStats'));
  },
  async ({ db }) => {
    await seed(db);
    const index = await records(db).createIndex({ price: 1 });
    return planStats(await records(db).find({ price: 20 }).hint(index).explain('executionStats'));
  },
  async ({ db }) => {
    await seed(db);
    const collection = records(db);
    const index = await collection.createIndex({ price: 1 });
    return {
      scan: planStats(await collection.find({ price: 30 }).hint({ $natural: 1 }).explain('executionStats')),
      indexed: planStats(await collection.find({ price: 30 }).hint(index).explain('executionStats'))
    };
  }
];
