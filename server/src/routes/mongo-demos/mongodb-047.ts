import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ connection }) => {
    const { Book } = models(connection);
    try { await Book.create({}); }
    catch (error) { if (!(error instanceof Error) || error.name !== 'ValidationError') throw error; return { name: error.name, missingTitle: error.message.includes('title') }; }
    throw new Error('Expected validation error');
  },
  async ({ input, connection }) => {
    const { Book } = models(connection);
    try { await Book.create({ title: input }); }
    catch (error) { if (!(error instanceof Error) || error.name !== 'ValidationError') throw error; return { name: error.name, count: await Book.countDocuments() }; }
    return { accepted: true };
  }
];
