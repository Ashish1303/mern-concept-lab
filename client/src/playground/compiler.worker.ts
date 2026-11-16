import { compileSnippet, createTypeChecker, prepareSnippet } from './compiler';
import type { CompilerAssets, WorkerRequest, WorkerResult } from './types';
let checker: Promise<ReturnType<typeof createTypeChecker>> | undefined;
self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  void (async () => {
    const { action, definition, code = '', input } = event.data;
    if (action === 'prepare') return { kind: 'prepared', prepared: prepareSnippet(definition) } satisfies WorkerResult;
    if (definition.mode !== 'typecheck') return { kind: 'compiled', compiled: compileSnippet(definition, code, input) } satisfies WorkerResult;
    checker ??= fetch('/playground/types.json').then(async response => { if (!response.ok) throw new Error('Compiler assets are unavailable. Rebuild the application.'); return createTypeChecker(await response.json() as CompilerAssets); });
    return { kind: 'checked', output: (await checker)(definition.entry, code) } satisfies WorkerResult;
  })().then(result => self.postMessage(result), error => self.postMessage({ kind: 'error', error: error instanceof Error ? error.message : 'Compilation failed.' } satisfies WorkerResult));
};
