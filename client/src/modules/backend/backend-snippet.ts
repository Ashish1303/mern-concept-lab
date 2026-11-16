import runtimeSource from '../runtime.ts?raw';
import requestSource from './request-backend.ts?raw';

export function backendSnippet(id: string, input: string) {
  const content = `import type { RunContext } from '../lesson-types';
import { requestBackend } from './request-backend';

export async function example1(context: RunContext) {
  return requestBackend(context.request, ${JSON.stringify(id)}, ${JSON.stringify(input)});
}`;
  const entry = 'modules/backend/example.ts';
  return { id, mode: 'runtime' as const, entry, functionName: 'example1',
    files: [{ name: entry, content }, { name: 'modules/backend/request-backend.ts', content: requestSource }, { name: 'modules/runtime.ts', content: runtimeSource }] };
}

