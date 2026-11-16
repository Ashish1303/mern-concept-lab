import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db }) => {
    const collection = db.collection('ttl_notes');
    await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    return (await collection.indexes()).find(index => index.name === 'expiresAt_1');
  },
  async ({ db }) => {
    const collection = db.collection('ttl_notes');
    await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    const now = new Date();
    await collection.insertMany([{ title: 'expired', expiresAt: new Date(now.getTime() - 10000) }, { title: 'active', expiresAt: new Date(now.getTime() + 60000) }]);
    return collection.find({ expiresAt: { $gt: now } }, { projection: { _id: 0, title: 1 } }).toArray();
  }
];
