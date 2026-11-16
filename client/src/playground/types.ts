export interface SnippetFile { name: string; content: string }
export interface SnippetDefinition {
  id: string;
  mode: 'react' | 'runtime' | 'typecheck';
  entry: string;
  functionName?: string;
  files: SnippetFile[];
  input?: { label: string; initial: string };
}
export interface PreparedSnippet { code: string; start: number; end: number; focusFile?: string }
export interface CompiledSnippet { modules: Record<string, string>; entry: string; functionName?: string; mode: 'react' | 'runtime'; input: string }
export interface CompilerAssets { files: Record<string, string>; options: Record<string, unknown>; roots: string[] }
export interface WorkerRequest { action: 'prepare' | 'compile'; definition: SnippetDefinition; code?: string; input?: string }
export type WorkerResult = { kind: 'prepared'; prepared: PreparedSnippet } | { kind: 'compiled'; compiled: CompiledSnippet } | { kind: 'checked'; output: string } | { kind: 'error'; error: string };
export const previewOrigin = () => document.querySelector<HTMLMetaElement>('meta[name="playground-origin"]')?.content ?? '';
