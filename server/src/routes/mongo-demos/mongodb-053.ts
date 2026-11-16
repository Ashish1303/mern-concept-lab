import mongoose from 'mongoose';
import { textInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ input, connection }) => {
    const schema = new mongoose.Schema({ name: String });
    schema.virtual('display').get(function () { return 'Author: ' + this.name; });
    const Author = connection.model('VirtualAuthor', schema);
    const created = await Author.create({ name: textInput(input) });
    return created.toObject({ virtuals: true });
  },
  async ({ connection }) => {
    const schema = new mongoose.Schema({ name: String });
    schema.virtual('display').get(function () { return 'Author: ' + this.name; });
    const Author = connection.model('VirtualAuthor', schema);
    const created = await Author.create({ name: 'Grace' });
    const stored = await Author.findById(created._id).lean();
    return { hydrated: 'display' in created.toObject({ virtuals: true }), stored: !!stored && Object.hasOwn(stored, 'display') };
  }
];
