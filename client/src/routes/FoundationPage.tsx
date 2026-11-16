import { Link, useSearchParams } from 'react-router';
import { ExampleFrame } from '../components/examples/ExampleFrame';
import { InteractionDemo } from '../foundation/InteractionDemo';
import { HealthDemo } from '../foundation/HealthDemo';
import { foundationExamples } from '../foundation/definitions';
import { RecoveryPage } from './RecoveryPage';
import { SnippetPlayground } from '../playground/SnippetPlayground';
import { foundationSnippet } from '../playground/definitions';

export function FoundationPage() {
  const [params] = useSearchParams();
  const selectedId = params.get('example') ?? 'interaction';
  const selected = foundationExamples.find((example) => example.id === selectedId);
  if (!selected) return <RecoveryPage message="That foundation example does not exist." />;
  return <>
    <header className="page-heading">
      <p className="eyebrow">BUILD THE BASE. THEN EXPLORE.</p>
      <div className="title-row"><h1>Application foundation</h1><span className="phase-badge">PHASE 1</span></div>
      <p className="page-intro">Try the foundation checks below, or browse the lessons in the sidebar.</p>
    </header>
    <nav className="example-tabs" aria-label="Foundation examples">
      {foundationExamples.map((example, index) => {
        const next = new URLSearchParams(params);
        next.set('example', example.id);
        return <Link key={example.id} to={{ pathname: '/foundation', search: `?${next}` }} aria-current={selectedId === example.id ? 'page' : undefined}><span className="tab-number">0{index + 1}</span>{example.title}<span aria-hidden="true">↗</span></Link>;
      })}
    </nav>
    <ExampleFrame definition={selected} key={selected.id} editor={<SnippetPlayground key={selected.id} definition={foundationSnippet(selected.sources,selected.id)} />}>{selected.id === 'interaction' ? <InteractionDemo /> : <HealthDemo />}</ExampleFrame>
  </>;
}
