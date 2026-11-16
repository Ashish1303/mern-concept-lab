import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { PlannedTopic } from '../../app/types';
import { ExampleFrame } from '../../components/examples/ExampleFrame';
import { RecoveryPage } from '../../routes/RecoveryPage';
import { loadReactLesson } from './load-react-lesson';
import { ReactExperimentView } from './ReactExperimentView';
import { SnippetPlayground } from '../../playground/SnippetPlayground';
import { reactSnippet } from '../../playground/definitions';
export function ReactTopicPage({ topic }: {
    topic: PlannedTopic;
}) {
    const [params] = useSearchParams();
    const subject = topic.categoryId === 'redux' ? 'Redux Toolkit' : 'React';
    const [loaded, setLoaded] = useState<{
        id: string;
        value?: Awaited<ReturnType<typeof loadReactLesson>>;
        error?: string;
    } | null>(null);
    useEffect(() => {
        let active = true;
        void loadReactLesson(topic.id).then(value => { if (active)
            setLoaded({ id: topic.id, value }); }, error => { if (active)
            setLoaded({ id: topic.id, error: error instanceof Error ? error.message : 'Lesson failed to load.' }); });
        return () => { active = false; };
    }, [topic.id]);
    if (loaded?.id !== topic.id)
        return <p role="status">Loading {subject} examples and their source…</p>;
    if (!loaded.value)
        return <section><h1>Lesson could not load</h1><p role="alert">{loaded.error}</p><p>Reload to retry.</p></section>;
    const { lesson, demos, sources } = loaded.value;
    const id = params.get('example') ?? lesson.examples[0]?.id;
    const selected = lesson.examples.find(item => item.id === id || item.aliases.includes(id ?? ''));
    const Demo = selected ? demos[selected.component] : undefined;
    if (!selected || !Demo)
        return <RecoveryPage message="That example does not belong to this lesson."/>;
    return <>
    <header className="page-heading"><p className="eyebrow">{subject} / Phase {topic.phase}</p><div className="title-row"><h1>{topic.title}</h1><span className="status-badge">{topic.status.replaceAll('_', ' ')}</span></div><p className="page-intro">{lesson.description}</p></header>
    <p className="muted">{lesson.examples.length} working experiments · Change a control, predict the result, then inspect the actual output and commit trace.</p>
    <nav className="lesson-examples" aria-label="Practical examples">{lesson.examples.map((example, index) => {
            const next = new URLSearchParams(params);
            next.set('example', example.id);
            return <Link key={example.id} to={`?${next}`} aria-current={selected.id === example.id ? 'page' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{example.title}<small>{subject} + browser</small></Link>;
        })}</nav>
    <ExampleFrame key={selected.id} editor={<SnippetPlayground key={selected.id} definition={reactSnippet(sources,selected)} />} label={`Phase ${topic.phase} · Interactive ${subject}`} definition={{ id: selected.id, title: selected.title, purpose: lesson.description, when: lesson.when, avoid: lesson.avoid, expected: selected.expected, steps: [...selected.steps, lesson.tradeoff], sources, mistakes: lesson.mistakes, questions: lesson.questions }}>
      {selected.prerequisites && <p className="compiler-notice">{selected.prerequisites}</p>}
      <ReactExperimentView component={Demo}/>
    </ExampleFrame>
    <p className="lesson-reference">Reference: <a href={lesson.reference} target="_blank" rel="noreferrer">Related documentation</a></p>
  </>;
}

