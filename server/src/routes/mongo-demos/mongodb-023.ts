import { records, seed, objectId } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ db, input }) => {
    await seed(db);
    const match = await records(db).findOne({ title: input });
    return match && { title: match.title, author: await db.collection('authors').findOne({ _id: match.author }) };
  },
  async ({ db }) => {
    await seed(db);
    const match = await records(db).findOne({ title: 'Mongo Primer' });
    if (!match) return null;
    await db.collection('authors').deleteOne({ _id: match.author });
    return { title: match.title, author: await db.collection('authors').findOne({ _id: match.author }) };
  },
  async ({ db, input }) => {
    await seed(db);
    const _id = objectId(input);
    return { author: await db.collection('authors').findOne({ _id }), books: await records(db).find({ author: _id }).toArray() };
  }
];
