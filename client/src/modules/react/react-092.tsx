import { useDeferredValue, useMemo, useState } from 'react';
import { Result } from './LabWidgets';

const names = Array.from({ length: 2_000 }, (_, index) => 'Item ' + index);
function search(query: string) { return names.filter(name => name.includes(query)); }

export function Example01() {
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const matches = useMemo(() => search(deferred), [deferred]);
  return <><label>Search items <input value={query} onChange={event => setQuery(event.target.value)} /></label>
    {query !== deferred && <p role="status">Updating results</p>}<Result value={{ matches: matches.length, preview: matches.slice(0, 5) }} />
  </>;
}
export function Example02() {
  const [selected, setSelected] = useState(0);
  return <><button onClick={() => setSelected(value => value + 1)}>Select next</button>
    <Result value={{ selected: names[selected % names.length], total: names.length }} />
  </>;
}
