import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { createServer } from 'node:http';
import type { Duplex } from 'node:stream';

export async function websocketFixture(input: string) {
  const sockets = new Set<Duplex>();
  const server = createServer((_request, response) => response.writeHead(426).end());
  server.on('upgrade', (request, socket) => {
    sockets.add(socket);
    socket.on('close', () => sockets.delete(socket));
    socket.on('error', () => socket.destroy());
    const key = request.headers['sec-websocket-key'];
    if (request.url !== '/demo' || typeof key !== 'string') { socket.destroy(); return; }
    const accept = createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
    socket.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
    // A fixture sends a single final text frame. It has no general-purpose message parser.
    const payload = Buffer.from(input);
    const header = payload.length < 126
      ? Buffer.from([0x81, payload.length])
      : Buffer.from([0x81, 126, payload.length >> 8, payload.length & 255]);
    socket.write(Buffer.concat([header, payload]));
  });
  const ready = once(server, 'listening');
  server.listen(0, '127.0.0.1');
  try {
    await ready;
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Missing WebSocket address');
    const client = new WebSocket('ws://127.0.0.1:' + address.port + '/demo');
    try {
      const [event] = await once(client, 'message', { signal: AbortSignal.timeout(1500) }) as [MessageEvent];
      return { message: event.data as string, transport: 'WebSocket' };
    } finally {
      client.close();
    }
  } finally {
    for (const socket of sockets) socket.destroy();
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
}
