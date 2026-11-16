import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer, get } from 'node:http';
import type { RequestListener } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Worker } from 'node:worker_threads';

export async function withFixture<T>(input: string, run: (file: string) => T | Promise<T>) {
  const directory = await mkdtemp(join(tmpdir(), 'mern-node-lab-'));
  try {
    const file = join(directory, 'fixture.txt');
    await writeFile(file, input);
    return await run(file);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

export async function loopback(reply: RequestListener, path = '/') {
  const server = createServer(reply);
  try {
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Missing loopback address');
    return await new Promise<{ status: number; body: string; contentType: string | undefined }>((resolve, reject) => {
      const request = get({ host: '127.0.0.1', port: address.port, path, agent: false }, response => {
        let body = '';
        response.setEncoding('utf8');
        response.on('data', chunk => { body += chunk; });
        response.on('error', reject);
        response.on('end', () => resolve({
          status: response.statusCode ?? 0, body, contentType: response.headers['content-type']
        }));
      });
      request.on('error', reject);
      request.setTimeout(1500, () => request.destroy(new Error('Loopback demo timed out')));
    });
  } finally {
    server.closeAllConnections();
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
}

// Only module-owned programs reach spawn or Worker. Input is delivered as data.
export function fixedChild(program: string, input = '', flags: string[] = [], env: NodeJS.ProcessEnv = {}) {
  return new Promise<{ stdout: string; stderr: string; exitCode: number | null }>((resolve, reject) => {
    const child = spawn(process.execPath, [...flags, '-e', program], {
      shell: false, windowsHide: true, env, timeout: 3000
    });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8').on('data', chunk => { stdout += chunk; });
    child.stderr.setEncoding('utf8').on('data', chunk => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', exitCode => resolve({ stdout: stdout.trim(), stderr: stderr.trim(), exitCode }));
    child.stdin.on('error', () => {});
    child.stdin.end(input);
  });
}

export async function fixedWorker(program: string, data: string | number) {
  const worker = new Worker(program, { eval: true, workerData: data, resourceLimits: { maxOldGenerationSizeMb: 32 } });
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await new Promise<unknown>((resolve, reject) => {
      timeout = setTimeout(() => reject(new Error('Worker demo timed out')), 2500);
      worker.once('message', resolve);
      worker.once('error', reject);
      worker.once('exit', code => reject(new Error('Worker exited before replying (' + code + ')')));
    });
  } finally {
    clearTimeout(timeout);
    await worker.terminate();
  }
}
