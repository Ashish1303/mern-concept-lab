import mongoose from 'mongoose';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  async ({ input, connection }) => {
    const schema = new mongoose.Schema({ name: String }, { statics: { named(name: string) { return this.findOne({ name }).lean(); } } });
    const Member = connection.model('Member', schema);
    await Member.create({ name: 'Ada' });
    return Member.named(input);
  },
  async ({ connection }) => {
    const schema = new mongoose.Schema({ active: Boolean }, { statics: { activeCount() { return this.countDocuments({ active: true }); } } });
    const Member = connection.model('Member', schema);
    await Member.create([{ active: true }, { active: true }, { active: false }]);
    return Member.activeCount();
  }
];
