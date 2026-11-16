import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const env = { ...loadEnv(mode, root, ''), ...process.env };
  const port = Number(env.PORT ?? 4000);
  const clientPort = Number(env.CLIENT_PORT ?? 5173);
  if (![port, clientPort].every((value) => Number.isInteger(value) && value > 0 && value <= 65535)) {
    throw new Error('PORT and CLIENT_PORT must be valid port numbers.');
  }
  return {
    plugins: [react(), { name:'playground-origin', apply:'serve', transformIndexHtml: () => [{ tag:'meta', attrs:{ name:'playground-origin', content:`http://127.0.0.2:${Number(env.PLAYGROUND_PORT ?? port + 1)}` }, injectTo:'head' }] }],
    server: {
      port: clientPort,
      strictPort: true,
      proxy: { '/api': { target: `http://127.0.0.1:${port}` } }
    },
    test: {
      environment: 'jsdom', setupFiles: ['./src/test/setup.ts'], clearMocks: true,
      // Avoid competing jsdom copies of the complete navigation tree on local machines.
      fileParallelism: false, testTimeout: 10000
    }
  };
});
