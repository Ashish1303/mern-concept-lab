import { Link, useSearchParams } from 'react-router';
import type { PlannedTopic } from '../../app/types';
import { ExampleFrame } from '../../components/examples/ExampleFrame';
import { SnippetPlayground } from '../../playground/SnippetPlayground';
import { BackendDemo } from '../backend/BackendDemo';
import { backendSnippet } from '../backend/backend-snippet';
import { ReactExperimentView } from '../react/ReactExperimentView';
import { practicalInterview } from './mongo-interview';
import { mongoCatalog } from './mongo-catalog';
import toolsSource from '../../../../server/src/routes/mongo-tools.ts?raw';
import odmSource from '../../../../server/src/routes/mongo-odm.ts?raw';

const sources = import.meta.glob<string>('../../../../server/src/routes/mongo-demos/*.ts', { query: '?raw', import: 'default', eager: true });

export function MongoTopicPage({ topic }: { topic: PlannedTopic }) {
  const [params] = useSearchParams();
  const lesson = mongoCatalog.find(item => item.id === topic.id)!;
  const example = lesson.examples.find(item => item.id === params.get('example')) ?? lesson.examples[0]!;
  const source = sources['../../../../server/src/routes/mongo-demos/' + topic.id + '.ts']!;
  const interview = [
    lesson.interview,
    ['How would you explain this concept?', lesson.description],
    ['Which operation demonstrates the expected result?', example.title + '. ' + example.expected],
    practicalInterview[Number(topic.id.slice(8)) - 1]!,
    ['How should application input reach the database?', 'Parse it as a value and use it in a server-defined operation. The caller supplies neither collection names nor operators.'],
    ['How should an integration test isolate its database writes?', 'Create an owned database for the test and clean up that namespace after assertions.']
  ];
  return <>
    <header className="page-heading">
      <p className="eyebrow">MongoDB and Mongoose / Phase 8</p>
      <div className="title-row"><h1>{topic.title}</h1><span className="status-badge">{topic.status.replaceAll('_', ' ')}</span></div>
      <p className="page-intro">{lesson.description}</p>
    </header>
    <nav className="lesson-examples" aria-label="Practical examples">{lesson.examples.map(item => (
      <Link key={item.id} to={'?example=' + item.id} aria-current={item.id === example.id ? 'page' : undefined}>{item.title}<small>Local database</small></Link>
    ))}</nav>
    <ExampleFrame key={example.id} label="Phase 8 · MongoDB and Mongoose" definition={{
      id: example.id, title: example.title, purpose: lesson.description, expected: example.expected,
      when: lesson.interview[1], avoid: 'Passing unvalidated values directly into a database operation.',
      steps: ['Run the database demo and inspect the returned result.', 'Edit the request input and rerun it against a fresh fixture.', 'Read the database implementation to identify the query, write, or transaction.'],
      sources: [
        { name: 'server/routes/mongo-demos/' + topic.id + '.ts', content: source },
        { name: 'server/routes/mongo-tools.ts', content: toolsSource },
        ...(source.includes('mongo-odm') ? [{ name: 'server/routes/mongo-odm.ts', content: odmSource }] : [])
      ],
      mistakes: [{ problem: 'Inferring stored state from a request alone.', fix: 'Verify the driver result or inspect stored data using an independent read.' }],
      questions: interview.map(([question, answer], index) => ({
        id: topic.id + '.q0' + (index + 1), level: index < 2 ? 'Basic' : index < 4 ? 'Intermediate' : 'Senior',
        question: question!, answer: answer!
      }))
    }} editor={<><p className="panel-section">The editor runs the request. Each run uses a fresh database on the dedicated local replica set.</p><SnippetPlayground definition={backendSnippet(example.id, example.initial)} /></>}>
      <ReactExperimentView showTrace={false}><BackendDemo id={example.id} initial={example.initial} /></ReactExperimentView>
    </ExampleFrame>
    <p className="lesson-reference"><a href={Number(topic.id.slice(8)) >= 43 ? 'https://mongoosejs.com/docs/guide.html' : 'https://www.mongodb.com/docs/manual/'} target="_blank" rel="noreferrer">Database documentation</a></p>
  </>;
}
