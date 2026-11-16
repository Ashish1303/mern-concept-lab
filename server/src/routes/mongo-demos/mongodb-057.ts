import mongoose from 'mongoose';
import { isDuplicate } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ connection }) => {
    const schema = new mongoose.Schema({ title: String }, { autoIndex: false });
    schema.index({ title: 1 }, { name: 'notes_title' });
    const Note = connection.model('IndexNote', schema);
    await Note.createIndexes();
    return (await Note.listIndexes()).map(index => index.name);
  },
  async ({ connection }) => {
    const schema = new mongoose.Schema({ slug: { type: String, unique: true } });
    const Note = connection.model('UniqueNote', schema);
    await Note.init();
    await Note.create({ slug: 'fixture' });
    try { await Note.create({ slug: 'fixture' }); }
    catch (error) { if (isDuplicate(error)) return { code: 11000 }; throw error; }
    throw new Error('Expected duplicate key');
  }
];
