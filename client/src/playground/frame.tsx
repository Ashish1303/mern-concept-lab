import * as React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom/client';
import * as ReactDOMCore from 'react-dom';
import * as ReactRouter from 'react-router';
import * as ReactRedux from 'react-redux';
import * as ReduxToolkit from '@reduxjs/toolkit';
import * as ReduxQuery from '@reduxjs/toolkit/query/react';
import type { CompiledSnippet } from './types';

// Bundled as a classic script and served only by the separate loopback preview.
// No editable code executes in the application or on the Express server.
const nativeTimeout = window.setTimeout.bind(window);
let channel = '';
let parentOrigin = '';
let root: ReactDOM.Root | undefined;
const send = (type: string, value: unknown) => { if (channel) parent.postMessage({ channel, type, value }, parentOrigin); };
const format = (value: unknown) => { try { return JSON.stringify(value, (_key, item: unknown) => typeof item === 'bigint' ? `${item}n` : item === undefined ? '[undefined]' : typeof item === 'number' && !Number.isFinite(item) ? String(item) : item, 2) ?? String(value); } catch { return String(value); } };
function report(error: unknown) { send('error', error instanceof Error ? error.message : String(error)); }
window.addEventListener('error', event => { event.preventDefault(); report(event.error ?? event.message); });
window.addEventListener('unhandledrejection', event => { event.preventDefault(); report(event.reason); });
let calls = 0;
let deadline = 0;
let budgetReset = false;
Object.assign(globalThis, { __labCheckpoint() {
  if (!budgetReset) { calls = 0; deadline = performance.now() + 1500; budgetReset = true; nativeTimeout(() => { budgetReset = false; }, 0); }
  if (++calls > 100000 || performance.now() > deadline) throw new Error('Execution stopped: the snippet exceeded its loop or recursion budget.');
} });
for (const level of ['log', 'info', 'warn', 'error'] as const) console[level] = (...values: unknown[]) => send(level === 'error' ? 'error' : 'log', values.map(format).join(' ').slice(0,4000));

const pending = new Map<number, { resolve: (value: Response) => void; reject: (error: Error) => void }>();
let requestId = 0;
const request = (path: string, options: RequestInit = {}): Promise<Response> => new Promise((resolve, reject) => {
  if (options.signal?.aborted) { reject(new DOMException('Request cancelled.', 'AbortError')); return; }
  const id = ++requestId;
  const abort = () => { pending.delete(id); send('abort-request', id); reject(new DOMException('Request cancelled.', 'AbortError')); };
  options.signal?.addEventListener('abort', abort, { once: true });
  pending.set(id, { resolve: response => { options.signal?.removeEventListener('abort', abort); resolve(response); }, reject: error => { options.signal?.removeEventListener('abort', abort); reject(error); } });
  const headers = new Headers(options.headers);
  const authorization = headers.get('authorization');
  const contentType = headers.get('content-type');
  send('request', { id, path, method: options.method ?? 'GET', authorization, contentType, body: typeof options.body === 'string' ? options.body : undefined });
});
const originalFetch = window.fetch;
// The same broker also supports existing foundation fetch code. The frame CSP
// prohibits direct connections; the parent accepts only fixed lab API paths.
window.fetch = (input, options) => typeof input === 'string' ? request(input, options) : Promise.reject(new Error('Use a fixed lab API path.'));
void originalFetch;

type Factory = (require: (id: string) => unknown, module: { exports: Record<string, unknown> }, exports: Record<string, unknown>) => void;
const factories = new Map<string, Factory>();
Object.assign(globalThis, { __labDefine(id: string, factory: Factory) { factories.set(id, factory); } });
function normalize(path: string) { const parts: string[] = []; for (const part of path.split('/')) { if (part === '..') parts.pop(); else if (part && part !== '.') parts.push(part); } return parts.join('/'); }
async function run(compiled: CompiledSnippet) {
  const cache = new Map<string, { exports: Record<string, unknown> }>();
  function load(id: string, from = ''): Record<string, unknown> {
    if (id === 'react') return React as unknown as Record<string, unknown>;
    if (id === 'react/jsx-runtime') return jsxRuntime as unknown as Record<string, unknown>;
    if (id === 'react-dom') return ReactDOMCore;
    if (id === 'react-router') return ReactRouter;
    if (id === 'react-redux') return ReactRedux;
    if (id === 'react-dom/client') return ReactDOM as unknown as Record<string, unknown>;
    if (id === '@reduxjs/toolkit/query/react') return ReduxQuery;
    if (id === '@reduxjs/toolkit') return ReduxToolkit as unknown as Record<string, unknown>;
    const path = id.startsWith('.') ? normalize(from.slice(0, from.lastIndexOf('/') + 1) + id) : id;
    const key = [path, `${path}.ts`, `${path}.tsx`].find(key => factories.has(key));
    if (!key) throw new Error(`Unsupported import: ${id}. Keep the lesson’s supplied imports.`);
    const cached = cache.get(key); if (cached) return cached.exports;
    const module = { exports: {} }; cache.set(key, module);
    factories.get(key)!(dependency => load(dependency, key), module, module.exports);
    return module.exports;
  }
  const script = document.createElement('script');
  const blob = new Blob([Object.entries(compiled.modules).map(([id, code]) => `globalThis.__labDefine(${JSON.stringify(id)}, function(require,module,exports){\n${code}\n});`).join('\n')], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob); script.src = url;
  await new Promise<void>((resolve, reject) => { script.onload = () => resolve(); script.onerror = () => reject(new Error('The compiled snippet could not load.')); document.head.append(script); });
  URL.revokeObjectURL(url); script.remove();
  const module = load(compiled.entry);
  const target = module[compiled.functionName ?? ''];
  if (typeof target !== 'function') throw new Error('Keep the original function name when editing the snippet.');
  const host = document.getElementById('preview')!;
  if (compiled.mode === 'react') {
    root = ReactDOM.createRoot(host, { onUncaughtError: report, onCaughtError: report });
    const Demo = target as React.ComponentType;
    if (compiled.entry.startsWith('modules/react/') || compiled.entry.startsWith('modules/mern/')) {
      const { LabContext, createTrace } = load('modules/react/lab-context.ts') as unknown as typeof import('../modules/react/lab-context');
      const { TracePanel } = load('modules/react/LabWidgets.tsx') as unknown as typeof import('../modules/react/LabWidgets');
      root.render(<LabContext value={{ trace: createTrace(), request }}><Demo />{compiled.entry.startsWith('modules/react/') && <TracePanel />}</LabContext>);
    } else root.render(<Demo />);
    send('running', 'Interact with your edited React preview below.');
  } else {
    const { createRunContext, print } = load('modules/runtime.ts') as unknown as typeof import('../modules/runtime');
    const controller = new AbortController();
    const scope = createRunContext(compiled.input, host, controller.signal, request);
    let timer: number | undefined;
    const limit = new Promise<never>((_resolve,reject) => { timer = nativeTimeout(() => { controller.abort(); reject(new Error('Execution stopped after three seconds. Resolve or return from the snippet, then run again.')); },3000); });
    try { const result = await Promise.race([Promise.resolve(target(scope.context)),limit]) as unknown; send('result', { output:print(result), hasPreview:host.hasChildNodes() || document.body.childNodes.length>1 }); }
    finally { clearTimeout(timer); controller.abort(); scope.dispose(); }
  }
}
window.addEventListener('message', event => {
  if (event.source !== parent) return;
  const data = event.data as { channel?: string; type?: string; compiled?: CompiledSnippet; value?: { id: number; body: string; status: number; error?: string } };
  if (!channel && data.type === 'start' && typeof data.channel === 'string' && data.compiled) {
    channel = data.channel; parentOrigin = event.origin;
    void run(data.compiled).catch(report);
  } else if (data.channel === channel && event.origin === parentOrigin && data.type === 'response' && data.value) {
    const reply = data.value; const task = pending.get(reply.id); pending.delete(reply.id);
    if (reply.error) task?.reject(new Error(reply.error));
    else task?.resolve(new Response(reply.status === 204 || reply.status === 205 || reply.status === 304 ? null : reply.body, { status: reply.status, headers: { 'Content-Type': 'application/json' } }));
  }
});
window.addEventListener('pagehide', () => root?.unmount());
// The opaque code is sent only after the parent sees this trusted frame load.
document.body.dataset.ready = 'true';
