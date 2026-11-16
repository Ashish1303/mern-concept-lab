import { Link, useParams, useSearchParams } from 'react-router';
import { categories, examples, findTopic, groups } from '../app/registry';
import { RecoveryPage } from './RecoveryPage';
import { LearningTopicPage } from '../modules/LearningTopicPage';
import { lazy, Suspense } from 'react';
import { ReactTopicPage } from '../modules/react/ReactTopicPage';

const NodeTopicPage = lazy(() => import('../modules/node/NodeTopicPage').then(module => ({ default: module.NodeTopicPage })));

const ExpressTopicPage = lazy(() => import('../modules/express/ExpressTopicPage').then(module => ({ default: module.ExpressTopicPage })));

const MongoTopicPage = lazy(() => import('../modules/mongodb/MongoTopicPage').then(module => ({ default: module.MongoTopicPage })));

const MernTopicPage = lazy(() => import('../modules/mern/MernTopicPage').then(module => ({ default: module.MernTopicPage })));

export function TopicPage() {
  const { category, topicId } = useParams();
  const [params] = useSearchParams();
  const topic = findTopic(category, topicId);
  if (!topic) return <RecoveryPage message="That topic does not belong to this category, or its ID is unknown." />;
  const exampleId = params.get('example');
  const selectedExample = exampleId ? examples.find((example) => example.id === exampleId && example.topicId === topic.id) : undefined;
  if (exampleId && !selectedExample) return <RecoveryPage message="That example does not belong to the selected topic." />;
  if (topic.phase === 6) return <Suspense fallback={<p role="status">Loading Node.js examples…</p>}><NodeTopicPage topic={topic} /></Suspense>;
  if (topic.phase === 7) return <Suspense fallback={<p role="status">Loading Express examples…</p>}><ExpressTopicPage topic={topic} /></Suspense>;
  if (topic.phase === 8) return <Suspense fallback={<p role="status">Loading database examples…</p>}><MongoTopicPage topic={topic} /></Suspense>;
  if (topic.phase === 9) return <Suspense fallback={<p role="status">Loading full-stack examples…</p>}><MernTopicPage topic={topic} /></Suspense>;
  if (topic.phase === 2) return <LearningTopicPage topic={topic} />;
  if (topic.phase >= 3 && topic.phase <= 5) return <ReactTopicPage topic={topic} />;
  const required = examples.filter((example) => example.topicId === topic.id && example.title !== null);
  const group = groups.find((entry) => entry.id === topic.groupId);
  return <>
    <header className="page-heading">
      <p className="eyebrow">{categories.find((entry) => entry.id === topic.categoryId)?.title} / {group?.title}</p>
      <div className="title-row"><h1>{topic.title}</h1><span className="status-badge">NOT STARTED</span></div>
      <p className="page-intro">Planned for Phase {topic.phase}. This topic’s explanation, working examples, source code and interview preparation have not been implemented yet.</p>
    </header>
    <section className="planned-card">
      <span className="planned-symbol" aria-hidden="true">{'{ }'}</span>
      <p className="eyebrow">ON THE LEARNING PATH</p>
      <h2>{selectedExample?.title ?? 'Practical examples come next.'}</h2>
      <p>Each topic will include observable behavior, the actual TypeScript implementation, expected and actual output, common mistakes, and interview questions.</p>
      <p className="muted">No behavior has been verified for this topic. A navigation entry does not mean it is complete.</p>
      <Link className="button secondary" to="/foundation">Try the foundation checks <span aria-hidden="true">↗</span></Link>
    </section>
    {required.length > 0 && <section className="planned-examples"><h2>Required examples</h2><p className="muted">Named requirements from the syllabus. All are Not started.</p><ol>{required.map((example) => {
      const next = new URLSearchParams(params);
      next.set('example', example.id);
      return <li key={example.id}><Link to={`?${next}`} aria-current={exampleId === example.id ? 'page' : undefined}>{example.title}</Link><span>Not started</span></li>;
    })}</ol></section>}
  </>;
}
