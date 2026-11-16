import type { ComponentType } from 'react';
import type { PlannedTopic } from '../../app/types';
import { ExampleFrame } from '../../components/examples/ExampleFrame';
import { SnippetPlayground } from '../../playground/SnippetPlayground';
import { ReactExperimentView } from '../react/ReactExperimentView';
import { mernCatalog } from './mern-catalog';
import { mernSnippet } from './mern-snippet';
import * as demos from './mern-scenarios';
import routeSource from '../../../../server/src/routes/mern-lab.ts?raw';
import authSource from '../../../../server/src/routes/mern-auth.ts?raw';

export function MernTopicPage({ topic }: { topic: PlannedTopic }) {
  const scenario = mernCatalog.find(entry => entry.id === topic.id)!;
  const example = scenario.examples[0]!;
  const Demo = (demos as Record<string, ComponentType>)[scenario.component]!;
  const snippet = mernSnippet(example.id, scenario.component);
  const frontend = /mern-00[4-9]|mern-010/.test(topic.id) ? 'MernAuth.tsx'
    : /mern-011|mern-017/.test(topic.id) ? 'MernQueryDemo.tsx'
    : /mern-016|mern-022|mern-023/.test(topic.id) ? 'MernWorkspace.tsx' : 'MernItems.tsx';
  const sources = [
    ...snippet.files.filter(file => file.name.endsWith(frontend) || file.name.endsWith('mern-client.ts') ||
      (frontend === 'MernQueryDemo.tsx' && file.name.endsWith('mern-query.ts'))),
    { name: 'server/routes/mern-lab.ts', content: routeSource },
    ...(frontend === 'MernAuth.tsx' ? [{ name: 'server/routes/mern-auth.ts', content: authSource }] : [])
  ];
  const interview = [
    ...scenario.interview,
    ['How would you describe this end-to-end flow?', scenario.description],
    ['What observable result should an integration test verify?', scenario.expected],
    ['How can repeated runs start from known data?', 'Start a fresh workspace and verify the response against its isolated MongoDB fixture.']
  ];
  return <>
    <header className="page-heading">
      <p className="eyebrow">End-to-End MERN / Phase 9</p>
      <div className="title-row"><h1>{topic.title}</h1><span className="status-badge">{topic.status.replaceAll('_', ' ')}</span></div>
      <p className="page-intro">{scenario.description}</p>
    </header>
    <ExampleFrame key={example.id} label="Phase 9 · Full-stack MERN" definition={{
      id: example.id, title: example.title, purpose: scenario.description, expected: scenario.expected,
      when: 'Trace a user action through React, Express, and MongoDB.',
      avoid: 'Using real account details or files in teaching workspaces.',
      steps: ['Start a workspace, then use the demo controls.', 'Edit and run the snippet to start an independent workspace.', 'Compare the React output with the API and database implementation.'],
      mistakes: [{ problem: 'Assuming a UI update guarantees a database write.', fix: 'Verify the server result and read the persisted record when the workflow requires it.' }],
      sources, questions: interview.map(([question, answer], index) => ({
        id: topic.id + '.q0' + (index + 1), level: index < 2 ? 'Basic' : index < 4 ? 'Intermediate' : 'Senior',
        question: question!, answer: answer!
      }))
    }} editor={<SnippetPlayground definition={snippet} />}>
      <ReactExperimentView showTrace={false} component={Demo} />
    </ExampleFrame>
  </>;
}
