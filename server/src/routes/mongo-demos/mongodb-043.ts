import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  ({ connection }) => {
    return { readyState: connection.readyState, hasDriver: !!connection.getClient() };
  },
  ({ connection }) => {
    return connection.db!.command({ ping: 1 });
  }
];
