import { textInput } from '../mongo-tools.js';
import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  ({ input, connection }) => {
    const { Book } = models(connection);
    return Book.create({ title: textInput(input) });
  },
  async ({ connection }) => {
    const { Book } = models(connection);
    const missing = await Book.create({ title: 'Missing price' });
    const explicit = await new Book({ title: 'Explicit null', price: null }).save();
    return { missing: missing.price, explicit: explicit.price };
  }
];
