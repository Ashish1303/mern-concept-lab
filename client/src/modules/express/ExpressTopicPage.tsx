import { Link, useSearchParams } from 'react-router';
import type { PlannedTopic } from '../../app/types';
import { ExampleFrame } from '../../components/examples/ExampleFrame';
import { SnippetPlayground } from '../../playground/SnippetPlayground';
import { BackendDemo } from '../backend/BackendDemo';
import { backendSnippet } from '../backend/backend-snippet';
import { ReactExperimentView } from '../react/ReactExperimentView';
import { practicalInterview } from './express-interview';
import { expressCatalog } from './express-catalog';
import toolsSource from '../../../../server/src/routes/express-tools.ts?raw';

const sources = import.meta.glob<string>('../../../../server/src/routes/express-demos/*.ts', { query: '?raw', import: 'default', eager: true });

export function ExpressTopicPage({ topic }: { topic: PlannedTopic }) {
  const [params] = useSearchParams();
  const lesson = expressCatalog.find(item => item.id === topic.id)!;
  const example = lesson.examples.find(item => item.id === params.get('example')) ?? lesson.examples[0]!;
  const source = sources['../../../../server/src/routes/express-demos/' + topic.id + '.ts']!;
  const interview = [
    ...lesson.questions,
    ['What behavior does this example demonstrate?', example.expected],
    ['How would you describe the underlying HTTP contract?', lesson.description],
    practicalInterview[Number(topic.id.slice(8)) - 1]!
  ];
  return <>
    <header className="page-heading">
      <p className="eyebrow">Express.js / Phase 7</p>
      <div className="title-row"><h1>{topic.title}</h1><span className="status-badge">{topic.status.replaceAll('_', ' ')}</span></div>
      <p className="page-intro">{lesson.description}</p>
    </header>
    <nav className="lesson-examples" aria-label="Practical examples">{lesson.examples.map(item => (
      <Link key={item.id} to={'?example=' + item.id} aria-current={item.id === example.id ? 'page' : undefined}>{item.title}<small>Express API</small></Link>
    ))}</nav>
    <ExampleFrame key={example.id} label="Phase 7 · Express.js" definition={{
      id: example.id, title: example.title, purpose: lesson.description, expected: example.expected,
      when: lesson.questions[0]![1], avoid: 'Treating the demo fixture as shared application state.',
      steps: ['Run the API demo and inspect the status, headers, and response body.', 'Edit the request or its input in the snippet and run it again.', 'Read the route implementation to match the result with the handlers that produced it.'],
      sources: [
        { name: 'server/routes/express-demos/' + topic.id + '.ts', content: source },
        { name: 'server/routes/express-tools.ts', content: toolsSource }
      ],
      mistakes: [{ problem: 'Checking response text without verifying the HTTP contract.', fix: 'Check the status, relevant headers, and body together.' }],
      questions: interview.map(([question, answer], index) => ({
        id: topic.id + '.q0' + (index + 1), level: index < 2 ? 'Basic' : index < 4 ? 'Intermediate' : 'Senior',
        question: question!, answer: answer!
      }))
    }} editor={<><p className="panel-section">Edit the request to the Express API. Each run starts with a fresh fixture.</p><SnippetPlayground definition={backendSnippet(example.id, example.initial)} /></>}>
      <ReactExperimentView showTrace={false}><BackendDemo id={example.id} initial={example.initial} /></ReactExperimentView>
    </ExampleFrame>
    <p className="lesson-reference"><a href="https://expressjs.com/en/5x/api.html" target="_blank" rel="noreferrer">Express 5 documentation</a></p>
  </>;
}
