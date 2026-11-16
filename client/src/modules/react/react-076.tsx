import { useState } from 'react';
import type { ReactNode } from 'react';
import { Result } from './LabWidgets';

function Toggle({ render }: { render: (open: boolean, toggle: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false);
  return render(open, () => setOpen(value => !value));
}
export function Example01() {
  return <Toggle render={(open, toggle) => <><button onClick={toggle}>Toggle panel</button><Result value={open ? 'Panel open' : 'Panel closed'} /></>} />;
}

function Filter({ children }: { children: (matches: string[]) => ReactNode }) {
  const [query, setQuery] = useState('');
  const matches = ['Ada', 'Grace', 'Linus'].filter(name => name.toLowerCase().includes(query.toLowerCase()));
  return <><label>Filter names <input value={query} onChange={event => setQuery(event.target.value)} /></label>{children(matches)}</>;
}
export function Example02() {
  return <Filter>{matches => <><Result value={matches} /><ul>{matches.map(name => <li key={name}>{name}</li>)}</ul></>}</Filter>;
}

