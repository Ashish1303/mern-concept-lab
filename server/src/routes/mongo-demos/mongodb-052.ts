import { ObjectId, textInput } from '../mongo-tools.js';
import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ input, connection }) => {
    const { Author, Book } = models(connection);
    const author = await Author.create({ name: textInput(input) });
    const created = await Book.create({ title: 'Populated book', author: author._id });
    return Book.findById(created._id).populate('author', 'name -_id').lean();
  },
  async ({ connection }) => {
    const { Book } = models(connection);
    const created = await Book.create({ title: 'Missing author', author: new ObjectId() });
    return Book.findById(created._id).populate('author').lean();
  },
  async ({ input, connection }) => {
    const { Author, Book } = models(connection);
    const author = await Author.create({ name: textInput(input) });
    const created = await Book.create({ title: 'Reference', author: author._id });
    const result = await Book.findById(created._id).populate('author', 'name -_id').lean();
    return { storedId: created.author, populated: result?.author };
  }
];
