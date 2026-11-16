import { seed, objectId } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    return db.collection('authors').findOne({ _id: objectId(input) });
  },
  ({ input }) => {
    const id = objectId(input);
    return { hex: id.toHexString(), timestamp: id.getTimestamp() };
  }
];
