import { textInput } from '../mongo-tools.js';
import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ input, connection }) => {
    const { Book } = models(connection);
    const value = await Book.create({ title: textInput(input) });
    return { createdAt: value.createdAt, updatedAt: value.updatedAt };
  },
  async ({ connection }) => {
    const { Book } = models(connection);
    const value = await Book.create({ title: 'Timed note' });
    await new Promise(resolve => setTimeout(resolve, 15));
    const updated = await Book.findByIdAndUpdate(value._id, { price: 22 }, { returnDocument: 'after' });
    return { sameCreated: updated?.createdAt.getTime() === value.createdAt.getTime(), updatedAdvanced: (updated?.updatedAt.getTime() ?? 0) > value.updatedAt.getTime() };
  }
];
