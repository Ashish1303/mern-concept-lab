import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';
import { loadEnvironment } from './config/env.js';
import { createPlaygroundApp } from './playground.js';

try {
  const env = loadEnvironment(process.argv.includes('--production'));
  const clientDirectory = fileURLToPath(new URL('../../client/dist', import.meta.url));
  if (env.mode === 'production' && !existsSync(`${clientDirectory}/index.html`)) throw new Error('Client build is missing. Run npm run build before production startup.');
  const previewDirectory = fileURLToPath(new URL('../../client/playground-dist', import.meta.url));
  if (!existsSync(`${previewDirectory}/runtime.js`)) throw new Error('Preview build is missing. Run npm run build:playground.');
  const playgroundOrigin = `http://127.0.0.2:${env.playgroundPort}`;
  const app = createApp({
    runtimeMode: env.mode,
    ...(env.mode === 'production' ? { clientDirectory, playgroundOrigin } : {}),
    ...(env.mongoLabPort === undefined ? {} : { mongoLabPort: env.mongoLabPort })
  });
  const preview = createPlaygroundApp(previewDirectory).listen(env.playgroundPort,'127.0.0.2', () => { console.log(`Edited snippets: ${playgroundOrigin}`); });
  const server = app.listen(env.port, env.host, () => {
    console.log(`MERN Concept Lab ${env.mode}: http://${env.host}:${env.port}`);
  });
  server.on('error', (error: NodeJS.ErrnoException) => {
    preview.close();
    console.error(error.code === 'EADDRINUSE' ? 'The API port is occupied. Set PORT in the root .env file.' : 'The API could not start. Check host and port settings.');
    process.exitCode = 1;
  });
  preview.on('error', () => { console.error('The snippet preview could not start. Check PLAYGROUND_PORT.'); server.close(); process.exitCode = 1; });
  const shutdown = () => {
    const timer = setTimeout(() => { server.closeAllConnections(); preview.closeAllConnections(); process.exit(1); }, 5000);
    timer.unref();
    server.close(() => {
      void (app.locals.closeMernLab as () => Promise<void>)().finally(() => {
        preview.close(() => { clearTimeout(timer); process.exitCode = 0; });
      });
    });
  };
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Invalid server configuration.');
  process.exitCode = 1;
}
