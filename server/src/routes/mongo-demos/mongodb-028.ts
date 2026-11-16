import { records, seed, numberInput, planStats } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    const collection = records(db);
    const filter = { price: numberInput(input) };
    const scan = await collection.find(filter).hint({ $natural: 1 }).explain('executionStats');
    const index = await collection.createIndex({ price: 1 });
    return { scan: planStats(scan), indexed: planStats(await collection.find(filter).hint(index).explain('executionStats')) };
  },
  async ({ db }) => {
    await seed(db);
    const name = await records(db).createIndex({ title: 1 });
    return planStats(await records(db).find({ title: 'Mongo Primer' }, { projection: { title: 1, _id: 0 } }).hint(name).explain('executionStats'));
  }
];
