import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export interface Environment { port: number; host: string; mode: 'development' | 'production' | 'test'; playgroundPort: number; mongoLabPort?: number }

export function parseEnvironment(env: NodeJS.ProcessEnv): Environment {
  const portValue = env.PORT ?? '4000';
  const port = Number(portValue);
  if (!/^\d+$/.test(portValue) || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }
  const mode = env.NODE_ENV ?? 'development';
  if (mode !== 'development' && mode !== 'production' && mode !== 'test') throw new Error('NODE_ENV must be development, production or test.');
  const host = env.HOST ?? '127.0.0.1';
  if (!['127.0.0.1', 'localhost', '0.0.0.0'].includes(host)) throw new Error('HOST must be 127.0.0.1, localhost or 0.0.0.0.');
  const playgroundPort = Number(env.PLAYGROUND_PORT ?? port + 1);
  if (!Number.isInteger(playgroundPort) || playgroundPort < 1 || playgroundPort > 65535 || playgroundPort === port) throw new Error('PLAYGROUND_PORT must be a different port between 1 and 65535.');
  const mongoLabPort = env.MONGO_LAB_PORT === undefined ? undefined : Number(env.MONGO_LAB_PORT);
  if (mongoLabPort !== undefined && (!/^\d+$/.test(env.MONGO_LAB_PORT ?? '') ||
      !Number.isInteger(mongoLabPort) || mongoLabPort < 1024 || mongoLabPort > 65535 ||
      mongoLabPort === port || mongoLabPort === playgroundPort)) {
    throw new Error('MONGO_LAB_PORT must be a distinct port between 1024 and 65535.');
  }
  return { port, host, mode, playgroundPort, ...(mongoLabPort === undefined ? {} : { mongoLabPort }) };
}

export function loadEnvironment(production = false): Environment {
  const path = fileURLToPath(new URL('../../../.env', import.meta.url));
  if (existsSync(path)) process.loadEnvFile(path);
  return parseEnvironment({ ...process.env, ...(production ? { NODE_ENV: 'production' } : {}) });
}
