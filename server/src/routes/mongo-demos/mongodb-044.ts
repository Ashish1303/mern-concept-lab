import { textInput } from '../mongo-tools.js';
import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  ({ connection }) => {
    const { Book } = models(connection);
    return { title: Book.schema.path('title').instance, price: Book.schema.path('price').instance, paths: Object.keys(Book.schema.paths) };
  },
  async ({ input, connection }) => {
    const { Book } = models(connection);
    const created = await new Book({ title: textInput(input), unmapped: true }).save();
    return Book.findById(created._id).lean();
  }
];
