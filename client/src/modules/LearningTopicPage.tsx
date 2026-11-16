import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { PlannedTopic } from '../app/types';
import { ExampleFrame } from '../components/examples/ExampleFrame';
import { RecoveryPage } from '../routes/RecoveryPage';
import { loadLesson } from './load-lesson';
import type { LoadedLesson } from './load-lesson';
import { CompilerRunner, LearningRunner } from './LearningRunner';
import { print } from './runtime';
import compilerReport from './typescript/compiler-evidence.json';
import type { CompilerEvidence } from './lesson-types';
import { SnippetPlayground } from '../playground/SnippetPlayground';
import { languageSnippet } from '../playground/definitions';

const evidence: CompilerEvidence = compilerReport;

export function LearningTopicPage({ topic }: { topic: PlannedTopic }) {
  const [params] = useSearchParams();
  const [loaded, setLoaded] = useState<{ id: string; value?: LoadedLesson; error?: string } | null>(null);
  useEffect(() => {
    let cancelled = false;
    void loadLesson(topic.id).then(value => { if (!cancelled) setLoaded({ id: topic.id, value }); }, error => { if (!cancelled) setLoaded({ id: topic.id, error: error instanceof Error ? error.message : 'Lesson failed to load.' }); });
    return () => { cancelled = true; };
  }, [topic.id]);
  if (loaded?.id !== topic.id) return <p role="status">Loading the lesson and its implementation source…</p>;
  if (!loaded.value) return <section className="planned-card"><h1>Lesson could not load</h1><p role="alert">{loaded.error}</p><p>Reload this page to retry.</p></section>;
  const { lesson, sources, fixtures } = loaded.value;
  const selectedId = params.get('example') ?? lesson.examples[0]?.id;
  const selected = lesson.examples.find(example => example.id === selectedId);
  if (!selected) return <RecoveryPage message="That example does not belong to this lesson." />;
  const selectedSources = selected.runtime === 'typecheck'
    ? [{ name: selected.fixture, content: fixtures[selected.fixture] ?? '' }, ...sources]
    : sources.filter(source => !source.name.includes('check-type-examples') && !source.name.startsWith('tsconfig.'));
  const definition = {
    id: selected.id, title: selected.title, purpose: lesson.description,
    when: lesson.when, avoid: lesson.avoid,
    expected: selected.runtime === 'typecheck' ? selected.expected : `With the default input, the result is:\n${print(selected.expected)}`,
    steps: [selected.explanation, lesson.tradeoff], sources: selectedSources,
    mistakes: lesson.mistakes, questions: lesson.questions
  };
  return <>
    <header className="page-heading"><p className="eyebrow">{topic.categoryId} / Phase 2</p><div className="title-row"><h1>{topic.title}</h1><span className="status-badge">{topic.status.replaceAll('_', ' ')}</span></div><p className="page-intro">{lesson.description}</p></header>
    <p className="muted">{lesson.examples.length} working experiments · Select one, predict the result, then run it. Changed inputs can produce a different valid result.</p>
    <p className="muted">Output uses formatted JSON. Non-JSON values such as NaN and undefined use explicit kind/value labels so their meaning is preserved.</p>
    <nav className="lesson-examples" aria-label="Practical examples">{lesson.examples.map((example, index) => {
      const next = new URLSearchParams(params); next.set('example', example.id);
      return <Link key={example.id} to={`?${next}`} aria-current={selected.id === example.id ? 'page' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{example.title}<small>{example.runtime === 'typecheck' ? 'Compiler' : example.network ? 'Browser + API' : 'Browser'}</small></Link>;
    })}</nav>
    <ExampleFrame definition={definition} editor={<SnippetPlayground key={selected.id} definition={languageSnippet(loaded.value,selected)} />} label={`Phase 2 · ${selected.runtime === 'typecheck' ? 'Compiler-checked TypeScript' : 'Runnable browser example'}`} key={selected.id}>
      {selected.runtime === 'typecheck' ? <CompilerRunner example={selected} evidence={evidence.fixtures[selected.fixture]} checkedAt={evidence.checkedAt} compiler={evidence.compiler} /> : <LearningRunner example={selected} />}
    </ExampleFrame>
    <p className="lesson-reference">Reference: <a href={lesson.reference} target="_blank" rel="noreferrer">{topic.categoryId === 'typescript' ? 'TypeScript Handbook' : 'JavaScript Guide'}</a></p>
  </>;
}
