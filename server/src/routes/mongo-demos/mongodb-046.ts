import mongoose from 'mongoose';
import { numberInput } from '../mongo-tools.js';
import { models } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ input, connection }) => {
    const { Book } = models(connection);
    try { await Book.create({ title: 'Validated title', price: numberInput(input, -100, 100) }); }
    catch (error) { if (!(error instanceof mongoose.Error.ValidationError)) throw error; return { name: error.name, fields: Object.keys(error.errors) }; }
    return { accepted: true };
  },
  async ({ connection }) => {
    const { Book } = models(connection);
    const saved = await Book.create({ title: 'Validated title' });
    try { await Book.updateOne({ _id: saved._id }, { $set: { price: -5 } }, { runValidators: true }); }
    catch (error) { if (!(error instanceof Error) || error.name !== 'ValidationError') throw error; return { name: error.name, price: (await Book.findById(saved._id))?.price }; }
    throw new Error('Expected validation error');
  },
  async ({ input, connection }) => {
    const { Book } = models(connection);
    try { await new Book({ title: 'Validated title', category: input }).save(); }
    catch (error) { if (!(error instanceof Error) || error.name !== 'ValidationError') throw error; return { name: error.name, count: await Book.countDocuments() }; }
    return { accepted: true };
  }
];
