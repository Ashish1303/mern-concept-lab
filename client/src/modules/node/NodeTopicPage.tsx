import { Link, useSearchParams } from 'react-router';
import type { PlannedTopic } from '../../app/types';
import { ExampleFrame } from '../../components/examples/ExampleFrame';
import { SnippetPlayground } from '../../playground/SnippetPlayground';
import { ReactExperimentView } from '../react/ReactExperimentView';
import { BackendDemo } from '../backend/BackendDemo';
import { nodeCatalog } from './node-catalog';
import { backendSnippet } from '../backend/backend-snippet';
import toolsSource from '../../../../server/src/routes/node-tools.ts?raw';
import socketSource from '../../../../server/src/routes/node-websocket.ts?raw';

const sources = import.meta.glob<string>('../../../../server/src/routes/node-demos/*.ts', { query: '?raw', import: 'default', eager: true });

export function NodeTopicPage({ topic }: { topic: PlannedTopic }) {
  const [params] = useSearchParams();
  const lesson = nodeCatalog.find(item => item.id === topic.id)!;
  const example = lesson.examples.find(item => item.id === params.get('example')) ?? lesson.examples[0]!;
  const snippet = backendSnippet(example.id, example.initial);
  const source = sources['../../../../server/src/routes/node-demos/' + topic.id + '.ts']!;
  const questions = [lesson.interview, ...lesson.questions].map(([question, answer], index) => ({
    id: topic.id + '.q0' + (index + 1), level: index < 2 ? 'Basic' : index < 4 ? 'Intermediate' : 'Senior', question, answer
  }));
  const files = [
    { name: 'server/routes/node-demos/' + topic.id + '.ts', content: source },
    ...(source.includes('node-tools') ? [{ name: 'server/routes/node-tools.ts', content: toolsSource }] : []),
    ...(source.includes('node-websocket') ? [{ name: 'server/routes/node-websocket.ts', content: socketSource }] : [])
  ];
  return <>
    <header className="page-heading"><p className="eyebrow">Node.js / Phase 6</p>
      <div className="title-row"><h1>{topic.title}</h1><span className="status-badge">{topic.status.replaceAll('_', ' ')}</span></div>
      <p className="page-intro">{lesson.description}</p>
    </header>
    <nav className="lesson-examples" aria-label="Practical examples">{lesson.examples.map(item => (
      <Link key={item.id} to={'?example=' + item.id} aria-current={item.id === example.id ? 'page' : undefined}>{item.title}<small>Node.js backend</small></Link>
    ))}</nav>
    <ExampleFrame key={example.id} label="Phase 6 · Node.js" definition={{
      id: example.id, title: example.title, purpose: lesson.description, expected: example.expected,
      when: lesson.when, avoid: lesson.avoid, steps: ['Run the backend demo with its starting input.', 'Change the request input in the editable snippet and run it. Compare the output.', 'Open the implementation source to see the Node.js code that serves the request.'],
      sources: files, mistakes: [{ problem: lesson.avoid, fix: lesson.when }], questions
    }} editor={<><p className="panel-section">Edit the request to the Node.js backend. The server runs the lesson implementation shown below.</p><SnippetPlayground definition={snippet} /></>}>
      <ReactExperimentView showTrace={false}><BackendDemo id={example.id} initial={example.initial} /></ReactExperimentView>
    </ExampleFrame>
    <p className="lesson-reference"><a href={'https://nodejs.org/docs/latest-v24.x/api/' + lesson.reference + '.html'} target="_blank" rel="noreferrer">Node.js documentation</a></p>
  </>;
}

