import type { RunContext } from './lesson-types';

export function createRunContext(input: string, host: HTMLElement, signal: AbortSignal, request: RunContext['request'] = globalThis.fetch): { context: RunContext; dispose: () => void } {
  const cleanups = new Set<() => void>();
  const dispose = () => { for (const cleanup of cleanups) cleanup(); cleanups.clear(); };
  const cleanup = (callback: () => void) => { cleanups.add(callback); };
  signal.addEventListener('abort', dispose, { once: true });
  cleanup(() => signal.removeEventListener('abort', dispose));
  return {
    context: {
      input, host, signal, cleanup,
      request: (path, options) => {
        if (!path.startsWith('/api/v1/lab/') && path !== '/api/v1/health') throw new Error('Only fixed lab API paths are allowed.');
        return request(path, { ...options, signal: options?.signal ?? signal });
      },
      delay: (milliseconds) => new Promise<void>((resolve, reject) => {
        if (!Number.isInteger(milliseconds) || milliseconds < 0 || milliseconds > 250) { reject(new Error('Delay must be 0–250 milliseconds.')); return; }
        if (signal.aborted) { reject(new DOMException('Run cancelled.', 'AbortError')); return; }
        const onAbort = () => { clearTimeout(timer); reject(new DOMException('Run cancelled.', 'AbortError')); };
        const timer = setTimeout(() => { signal.removeEventListener('abort', onAbort); cleanups.delete(cancel); resolve(); }, milliseconds);
        const cancel = () => { clearTimeout(timer); signal.removeEventListener('abort', onAbort); reject(new DOMException('Run cancelled.', 'AbortError')); };
        cleanup(cancel);
        signal.addEventListener('abort', onAbort, { once: true });
      })
    },
    dispose
  };
}

export function capture(action: () => unknown): unknown {
  try { return action(); } catch (error) { return error instanceof Error ? error.name : 'UnknownError'; }
}

export function numbers(input: string): number[] {
  if (input.length > 300) throw new Error('Use at most 300 characters.');
  const result: unknown = JSON.parse(input);
  if (!Array.isArray(result) || result.length > 30 || !result.every((value: unknown) => typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= 1000000)) throw new Error('Enter an array of at most 30 finite numbers between -1000000 and 1000000.');
  return result as number[];
}

export function integer(input: string, maximum = 100): number {
  const value = Number(input);
  if (!input.trim() || !Number.isInteger(value) || value < 0 || value > maximum) throw new Error(`Enter an integer from 0 to ${maximum}.`);
  return value;
}

export function text(input: string): string {
  if (input.length > 200) throw new Error('Use at most 200 characters.');
  return input;
}

export function element<K extends keyof HTMLElementTagNameMap>(context: RunContext, tag: K, label: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.textContent = label;
  context.host.append(node);
  return node;
}

export function print(value: unknown): string {
  return JSON.stringify(value, (_key: string, item: unknown) => {
    if (item === undefined) return { kind: 'undefined' };
    if (typeof item === 'number' && (!Number.isFinite(item) || Object.is(item, -0))) return { kind: 'number', value: Object.is(item, -0) ? '-0' : String(item) };
    if (typeof item === 'bigint') return { kind: 'bigint', value: item.toString() };
    return item;
  }, 2) ?? String(value);
}
