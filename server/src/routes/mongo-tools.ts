import { randomUUID } from 'node:crypto';
import mongoose from 'mongoose';
import type { Connection } from 'mongoose';
import { HttpError } from '../middleware/errors.js';

export const { ObjectId, BSON } = mongoose.mongo;
type Database = NonNullable<Connection['db']>;
export interface Book {
  title: string;
  category: string;
  price: number;
  tags: string[];
  author: mongoose.mongo.ObjectId;
  details: { pages: number; rating: number };
}
export const records = (db: Database) => db.collection<Book>('books');
export type Demo = (context: { db: Database; input: string; connection: Connection }) => unknown;

export function textInput(input: string) {
  if (!input.trim()) throw new HttpError(400, 'INVALID_DB_INPUT', 'Supply nonempty text.');
  return input.trim();
}
export function numberInput(input: string, minimum = 0, maximum = 1000) {
  const number = Number(input);
  if (!input.trim() || !Number.isInteger(number) || number < minimum || number > maximum) {
    throw new HttpError(400, 'INVALID_DB_INPUT', 'Supply an integer from ' + minimum + ' to ' + maximum + '.');
  }
  return number;
}
export function objectId(input: string) {
  if (!/^[a-f0-9]{24}$/i.test(input)) throw new HttpError(400, 'INVALID_OBJECT_ID', 'Supply a 24-character hexadecimal ObjectId.');
  return new ObjectId(input);
}
export async function seed(db: Database) {
  const authors = db.collection<{ name: string }>('authors');
  const ada = new ObjectId('000000000000000000000001');
  const grace = new ObjectId('000000000000000000000002');
  await authors.insertMany([{ _id: ada, name: 'Ada' }, { _id: grace, name: 'Grace' }]);
  return records(db).insertMany([
    { title: 'Mongo Primer', category: 'db', price: 20, tags: ['db', 'starter'], author: ada, details: { pages: 100, rating: 4 } },
    { title: 'Indexes in Practice', category: 'db', price: 30, tags: ['db', 'advanced'], author: ada, details: { pages: 170, rating: 5 } },
    { title: 'Node Guide', category: 'web', price: 15, tags: ['web', 'starter'], author: grace, details: { pages: 90, rating: 4 } },
    { title: 'API Patterns', category: 'web', price: 30, tags: ['web', 'advanced'], author: grace, details: { pages: 160, rating: 5 } }
  ]);
}

export function book(title: string): Book {
  return { title, category: 'db', price: 10, tags: ['new'], author: new ObjectId('000000000000000000000001'), details: { pages: 80, rating: 4 } };
}

export async function openMongoLab(port: number) {
  const connection = mongoose.createConnection('mongodb://127.0.0.1:' + port, {
    dbName: 'mern_lab_' + randomUUID().replaceAll('-', ''),
    directConnection: true, maxPoolSize: 2, minPoolSize: 0, bufferCommands: false,
    serverSelectionTimeoutMS: 800, socketTimeoutMS: 1500, waitQueueTimeoutMS: 800
  });
  try {
    await connection.asPromise();
    const hello = await connection.db!.admin().command({ hello: 1 });
    if (hello.setName !== 'mernLab' || !hello.isWritablePrimary || hello.hosts?.length !== 1) {
      throw new HttpError(503, 'DB_LAB_TOPOLOGY', 'Start the dedicated single-member mernLab replica set.');
    }
    return connection;
  } catch (error) {
    await connection.close();
    if (error instanceof HttpError) throw error;
    throw new HttpError(503, 'DB_LAB_UNAVAILABLE', 'The local MongoDB lab is unavailable.');
  }
}

export async function disposeMongoLab(connection: Connection) {
  try { await connection.dropDatabase(); }
  finally { await connection.close(); }
}

export async function exerciseMongo(port: number, demo: Demo, input: string) {
  const connection = await openMongoLab(port);
  try { return await demo({ db: connection.db!, input, connection }); }
  finally { await disposeMongoLab(connection); }
}
export function isDuplicate(error: unknown) {
  return error instanceof mongoose.mongo.MongoServerError && error.code === 11000;
}

export function planStats(plan: unknown) {
  const { executionStats, queryPlanner } = plan as {
    executionStats: { nReturned: number; totalDocsExamined: number; totalKeysExamined: number };
    queryPlanner: { winningPlan: unknown };
  };
  return {
    returned: executionStats.nReturned, documentsExamined: executionStats.totalDocsExamined,
    keysExamined: executionStats.totalKeysExamined, winningPlan: queryPlanner.winningPlan
  };
}

export async function nativeTransfer(db: Database, connection: Connection, amount: number, rollback: boolean) {
  const accounts = db.collection<{ name: string; balance: number }>('accounts');
  await accounts.insertMany([{ name: 'A', balance: 50 }, { name: 'B', balance: 10 }]);
  const session = connection.getClient().startSession();
  try {
    session.startTransaction({ maxCommitTimeMS: 1000 });
    await accounts.updateOne({ name: 'A' }, { $inc: { balance: -amount } }, { session });
    await accounts.updateOne({ name: 'B' }, { $inc: { balance: amount } }, { session });
    if (rollback) await session.abortTransaction();
    else await session.commitTransaction();
  } finally {
    await session.endSession();
  }
  return { committed: !rollback, balances: await accounts.find({}, { projection: { _id: 0 } }).sort({ name: 1 }).toArray() };
}

