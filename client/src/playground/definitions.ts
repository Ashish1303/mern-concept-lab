import type { SnippetDefinition, SnippetFile } from './types';
import type { LoadedLesson } from '../modules/load-lesson';
import type { LearningExample } from '../modules/lesson-types';
import type { ReactExperiment } from '../modules/react/react-types';
import type { SourceFile } from '../components/code/SourceViewer';
import runtime from '../modules/runtime.ts?raw';
import helpers from '../modules/helpers.ts?raw';
import algorithms from '../modules/algorithms.ts?raw';
import output from '../components/examples/OutputViewer.tsx?raw';

export function languageSnippet(loaded: LoadedLesson, selected: LearningExample): SnippetDefinition {
  const files = loaded.sources.filter(file => file.name.startsWith('modules/')).map(file => ({ ...file }));
  for (const [name,content] of [['modules/runtime.ts',runtime],['modules/helpers.ts',helpers],['modules/algorithms.ts',algorithms]]) if (!files.some(file => file.name === name)) files.push({ name:name!,content:content! });
  if (selected.runtime === 'typecheck') {
    return { id:selected.id, mode:'typecheck', entry:selected.fixture, files:[{ name:selected.fixture,content:loaded.fixtures[selected.fixture]! }] };
  }
  return { id:selected.id, mode:'runtime', entry:files[0]!.name, files, functionName:`example${Number(selected.id.split('.e')[1])}`, ...(selected.input ? {input:selected.input} : {}) };
}
export function reactSnippet(sources: SourceFile[], selected: ReactExperiment): SnippetDefinition {
  const files: SnippetFile[] = sources.filter(file => !file.name.startsWith('server/')).map(file => ({ name: file.name.startsWith('../') ? `modules/${file.name.slice(3)}` : `modules/react/${file.name}`,content:file.content }));
  if (!files.some(file => file.name === 'modules/runtime.ts')) files.push({name:'modules/runtime.ts',content:runtime});
  if (!files.some(file => file.name === 'modules/helpers.ts')) files.push({name:'modules/helpers.ts',content:helpers});
  return { id:selected.id, mode:'react', entry:files[0]!.name, functionName:selected.component, files };
}
export function foundationSnippet(sources: SourceFile[], id: string): SnippetDefinition {
  const name = id === 'interaction' ? 'InteractionDemo' : 'HealthDemo';
  const files = sources.filter(file => !file.name.startsWith('server/')).map(file => ({name:file.name.startsWith('services/') ? file.name : file.name==='OutputViewer.tsx' ? 'components/examples/OutputViewer.tsx' : `foundation/${file.name}`,content:file.content}));
  if (!files.some(file => file.name === 'components/examples/OutputViewer.tsx')) files.push({name:'components/examples/OutputViewer.tsx',content:output});
  return { id:`foundation-${id}`,mode:'react',entry:`foundation/${name}.tsx`,functionName:name,files };
}
