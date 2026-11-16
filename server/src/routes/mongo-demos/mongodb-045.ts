import { textInput } from '../mongo-tools.js';
import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ input, connection }) => {
    const { Book } = models(connection);
    const saved = await Book.create({ title: textInput(input) });
    return { collection: Book.collection.name, saved: await Book.findById(saved._id).lean() };
  },
  async ({ connection }) => {
    const { Book, Author } = models(connection);
    const author = await Author.create({ name: 'Ada' });
    const created = await Book.create({ title: 'Reference book', author: author._id });
    return { relation: created.author?.equals(author._id), collections: [Author.collection.name, Book.collection.name] };
  }
];
