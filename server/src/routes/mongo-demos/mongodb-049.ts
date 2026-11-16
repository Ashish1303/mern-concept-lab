import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ input, connection }) => {
    const { Book } = models(connection);
    const value = await new Book({ title: 'Typed note', price: input }).save();
    return { price: value.price, type: typeof value.price };
  },
  async ({ connection }) => {
    const { Book } = models(connection);
    try { await Book.findById('not-an-id'); }
    catch (error) { if (!(error instanceof Error) || error.name !== 'CastError') throw error; return { name: error.name }; }
    throw new Error('Expected cast error');
  }
];
