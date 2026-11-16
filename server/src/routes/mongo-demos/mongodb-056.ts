import { textInput } from '../mongo-tools.js';
import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ input, connection }) => {
    const { Book } = models(connection);
    const value = await Book.create({ title: textInput(input) });
    const hydrated = await Book.findById(value._id).orFail();
    const plain = await Book.findById(value._id).lean().orFail();
    return { sameTitle: hydrated.title === plain.title, hydratedHasSave: 'save' in hydrated, plainHasSave: 'save' in plain };
  },
  async ({ connection }) => {
    const { Book } = models(connection);
    await Book.create({ title: 'Projected note' });
    return Book.findOne().select('title -_id').lean();
  }
];
