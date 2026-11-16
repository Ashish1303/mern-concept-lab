import { records, seed } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  ({ connection }) => {
    const options = connection.getClient().options;
    return { maxPoolSize: options.maxPoolSize, minPoolSize: options.minPoolSize, waitQueueTimeoutMS: options.waitQueueTimeoutMS };
  },
  async ({ db, connection }) => {
    await seed(db);
    const client = connection.getClient();
    const [books, authors] = await Promise.all([records(db).countDocuments(), db.collection('authors').countDocuments()]);
    return { books, authors, sameClient: client === connection.getClient() };
  }
];
