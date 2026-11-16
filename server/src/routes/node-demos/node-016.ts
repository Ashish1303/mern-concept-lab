import { loopback } from '../node-tools.js';

export const examples = [
  (input: string) => {
    return loopback((_request, response) => {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ message: input }));
    });
  },
  () => {
    return loopback((request, response) => {
      response.writeHead(request.url === '/known' ? 200 : 404);
      response.end(request.url === '/known' ? 'Known route' : 'Missing route');
    }, '/missing');
  }
];
