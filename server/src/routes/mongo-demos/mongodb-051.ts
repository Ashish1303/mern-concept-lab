import mongoose from 'mongoose';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  ({ input, connection }) => {
    const schema = new mongoose.Schema({ title: String });
    schema.pre('save', function () { this.title = this.title?.trim().toLowerCase(); });
    const Note = connection.model('HookNote', schema);
    return Note.create({ title: input });
  },
  async ({ connection }) => {
    const observed: string[] = [];
    const schema = new mongoose.Schema({ title: String });
    schema.post('save', document => { observed.push(document.title ?? ''); });
    const Note = connection.model('HookNote', schema);
    await Note.create({ title: 'Post save' });
    return observed;
  },
  async ({ connection }) => {
    const seen: unknown[] = [];
    const schema = new mongoose.Schema({ published: Boolean });
    schema.pre('find', function () { seen.push(this.getFilter()); });
    const Note = connection.model('HookNote', schema);
    await Note.create({ published: true });
    await Note.find({ published: true });
    return seen;
  },
  async ({ connection }) => {
    const events: string[] = [];
    const schema = new mongoose.Schema({ title: String });
    schema.pre('validate', () => { events.push('validate'); });
    schema.pre('save', () => { events.push('save'); });
    const Note = connection.model('HookNote', schema);
    await Note.create({ title: 'Ordering' });
    return events;
  },
  async ({ connection }) => {
    const events: string[] = [];
    const schema = new mongoose.Schema({ title: String });
    schema.pre('aggregate', () => { events.push('aggregate'); });
    const Note = connection.model('HookNote', schema);
    await Note.create({ title: 'Pipeline' });
    const result = await Note.aggregate([{ $count: 'count' }]);
    return { events, result };
  }
];
