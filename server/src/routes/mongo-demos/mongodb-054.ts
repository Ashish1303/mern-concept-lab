import mongoose from 'mongoose';
import { textInput } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ input, connection }) => {
    const schema = new mongoose.Schema({ name: String }, { methods: { label() { return 'Member ' + this.name; } } });
    const Member = connection.model('Member', schema);
    const created = await Member.create({ name: textInput(input) });
    const loaded = await Member.findById(created._id).orFail();
    return loaded.label();
  },
  async ({ connection }) => {
    const schema = new mongoose.Schema({ price: { type: Number, required: true }, count: { type: Number, required: true } }, {
      methods: { total() { return this.price * this.count; } }
    });
    const Line = connection.model('Line', schema);
    const value = await Line.create({ price: 7, count: 2 });
    return value.total();
  }
];
