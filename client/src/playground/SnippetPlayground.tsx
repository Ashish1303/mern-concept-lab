import { lazy, Suspense } from 'react';
import type { SnippetDefinition } from './types';
const Editor = lazy(() => import('./EditableSnippet').then(module => ({ default:module.EditableSnippet })));
export function SnippetPlayground({ definition }: {definition:SnippetDefinition}) {
  return <Suspense fallback={<p role="status">Loading the code editor…</p>}><Editor key={definition.id} definition={definition} /></Suspense>;
}
