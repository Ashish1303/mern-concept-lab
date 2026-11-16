import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    clearMocks: true,
    // Backend suites own subprocesses, loopback listeners, and local database fixtures.
    // A single worker also keeps unrelated files out of the Windows Express worker run.
    maxWorkers: 1,
    fileParallelism: false
  }
});
