import mongoose from 'mongoose';
import type { Connection } from 'mongoose';
import { ObjectId } from './mongo-tools.js';

export function models(connection: Connection) {
  const author = new mongoose.Schema({ name: { type: String, required: true } });
  const book = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2, trim: true },
    category: { type: String, enum: ['db', 'web'], default: 'db' },
    price: { type: Number, min: 0, default: 10 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'LabAuthor' },
    tags: { type: [String], default: () => ['new'] }
  }, { timestamps: true });
  return {
    Author: connection.model('LabAuthor', author, 'odm_authors'),
    Book: connection.model('LabBook', book, 'odm_books')
  };
}

export async function mongooseTransfer(connection: Connection, amount: number, rollback: boolean) {
  const Account = connection.model('LabAccount', new mongoose.Schema({ name: String, balance: Number }));
  await Account.create([{ _id: new ObjectId('000000000000000000000001'), name: 'A', balance: 50 }, { name: 'B', balance: 10 }]);
  const aborted = new Error('Teaching rollback');
  try {
    await connection.transaction(async session => {
      await Account.updateOne({ name: 'A' }, { $inc: { balance: -amount } }, { session });
      await Account.updateOne({ name: 'B' }, { $inc: { balance: amount } }, { session });
      if (rollback) throw aborted;
    });
  } catch (error) {
    if (error !== aborted) throw error;
  }
  return { committed: !rollback, balances: await Account.find().sort({ name: 1 }).select('name balance -_id').lean() };
}
