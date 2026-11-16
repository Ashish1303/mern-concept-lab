import { createApp } from '../../app.ts';
import { parseEnvironment } from '../../config/env.ts';

const { mongoLabPort } = parseEnvironment(process.env);
if (!mongoLabPort) throw new Error('A dedicated MongoDB lab is required.');
const app = createApp({ mongoLabPort, runtimeMode: 'test' });
const server = app.listen(0, '127.0.0.1', () => {
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Missing local test address.');
  process.send?.(address.port);
});

async function shutdown() {
  await new Promise(resolve => server.close(resolve));
  await app.locals.closeMernLab();
  if (process.connected) process.disconnect();
}
process.on('message', async message => {
  if (message === 'reset') {
    await app.locals.closeMernLab();
    process.send?.('reset');
  }
  if (message === 'close') await shutdown();
});
process.once('disconnect', () => { if (server.listening) void shutdown(); });
