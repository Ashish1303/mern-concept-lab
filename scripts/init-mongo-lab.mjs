import mongoose from 'mongoose';
import { basename } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const port = Number(process.argv[2] ?? '27180');
if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error('Pass the dedicated local MongoDB lab port.');
}
const host = '127.0.0.1:' + port;
const client = new mongoose.mongo.MongoClient('mongodb://' + host + '/?directConnection=true', {
  serverSelectionTimeoutMS: 2000, socketTimeoutMS: 2000
});
try {
  const admin = client.db('admin');
  const { parsed } = await admin.command({ getCmdLineOpts: 1 });
  if ((parsed.replication?.replSetName ?? parsed.replication?.replSet) !== 'mernLab' ||
      !basename(parsed.storage?.dbPath ?? '').startsWith('mern-phase8-')) {
    throw new Error('Start mongod with the dedicated mernLab name and a new mern-phase8- data directory.');
  }
  try {
    await admin.command({ replSetInitiate: { _id: 'mernLab', members: [{ _id: 0, host }] } });
  } catch (error) {
    if (!(error instanceof mongoose.mongo.MongoServerError) || error.codeName !== 'AlreadyInitialized') throw error;
  }
  for (let attempt = 0; attempt < 30; attempt++) {
    const info = await admin.command({ hello: 1 });
    if (info.setName === 'mernLab' && info.isWritablePrimary && info.hosts?.length === 1 && info.hosts[0] === host) {
      console.log('Dedicated MongoDB lab primary is ready on ' + host);
      break;
    }
    if (attempt === 29) throw new Error('The dedicated replica set did not elect its local primary.');
    await delay(400);
  }
} finally {
  await client.close();
}

