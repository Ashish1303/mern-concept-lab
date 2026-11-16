import type { SnippetDefinition } from '../../playground/types';
import runtime from '../runtime.ts?raw';
import labContext from '../react/lab-context.ts?raw';
import widgets from '../react/LabWidgets.tsx?raw';
import router from '../react/RouterLab.tsx?raw';

const own = import.meta.glob<string>(['./Mern*.tsx', './mern-client.ts', './mern-query.ts', './mern-scenarios.tsx', '!./MernTopicPage.tsx'], {
  query: '?raw', import: 'default', eager: true
});

export function mernSnippet(id: string, component: string): SnippetDefinition {
  return { id, mode: 'react', entry: 'modules/mern/mern-scenarios.tsx', functionName: component,
    files: [
      ...Object.entries(own).map(([path, content]) => ({ name: 'modules/mern/' + path.slice(2), content })),
      { name: 'modules/react/lab-context.ts', content: labContext },
      { name: 'modules/react/LabWidgets.tsx', content: widgets },
      { name: 'modules/react/RouterLab.tsx', content: router },
      { name: 'modules/runtime.ts', content: runtime }
    ]
  };
}
