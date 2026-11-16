import type { ReactNode } from 'react';
import { SourceViewer } from '../code/SourceViewer';
import type { SourceFile } from '../code/SourceViewer';
import { InterviewQuestions } from './InterviewQuestions';
import type { Question } from './InterviewQuestions';
import { CommonMistakes } from './CommonMistakes';
import type { Mistake } from './CommonMistakes';

export interface ExampleDefinition {
  id: string;
  title: string;
  purpose: string;
  when: string;
  avoid: string;
  expected: string;
  steps: string[];
  sources: SourceFile[];
  mistakes: Mistake[];
  questions: Question[];
}

export function ExampleFrame({ definition, children, editor, label = 'Infrastructure check · Phase 1' }: { definition: ExampleDefinition; children: ReactNode; editor?: ReactNode; label?: string }) {
  return <article className="example-card" aria-labelledby="example-heading">
    <header className="example-header">
      <span className="eyebrow">{label}</span>
      <h2 id="example-heading">{definition.title}</h2>
      <p>{definition.purpose}</p>
    </header>
    {editor}
    <section className="panel-section live-demo" aria-label="Live demonstration">
      <h3><span className="live-dot" aria-hidden="true" />Try it</h3>
      {children}
    </section>
    <section className="panel-section expected-output"><h3>Expected output</h3><p>{definition.expected}</p></section>
    <SourceViewer files={definition.sources} />
    <section className="panel-section">
      <h3>How it works</h3>
      <ol className="steps">{definition.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      <div className="usage-grid"><p><strong>Use when</strong>{definition.when}</p><p><strong>Avoid when</strong>{definition.avoid}</p></div>
    </section>
    <CommonMistakes mistakes={definition.mistakes} />
    <InterviewQuestions questions={definition.questions} />
  </article>;
}
