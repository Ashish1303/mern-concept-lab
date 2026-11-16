import { parseEnv } from 'node:util';

export const examples = [
  (input: string) => {
    const env = parseEnv('LAB_MODE=' + input);
    const mode = env.LAB_MODE;
    return mode === 'production' || mode === 'development' ? { mode } : { error: 'Invalid mode' };
  },
  (input: string) => {
    const port = Number(input);
    return Number.isInteger(port) && port >= 1024 && port <= 65535 ? { port } : { error: 'Invalid port' };
  }
];
