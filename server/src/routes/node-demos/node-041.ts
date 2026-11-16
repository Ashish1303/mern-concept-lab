import { createServer } from 'node:http';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';

export const examples = [
  async () => {
    const server = createServer((_request, response) => response.end('fixture'));
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const closed = once(server, 'close');
    server.close();
    await closed;
    return { listeningAfterClose: server.listening };
  },
  async () => {
    const events = ['stop accepting new work'];
    const pending = delay(15).then(() => events.push('operation completed'));
    await pending;
    events.push('shutdown complete');
    return events;
  }
];
