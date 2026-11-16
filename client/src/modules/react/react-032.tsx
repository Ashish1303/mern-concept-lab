import { useState, useMemo } from 'react';
import { Result } from './LabWidgets';
import { IdentityLists } from './observations';
export function Example01() {
    const [query, setQuery] = useState('Ada');
    const [tick, setTick] = useState(0);
    const stable = useMemo(() => ['Ada', 'Grace'].filter(name => name.includes(query)), [query]);
    const fresh = ['Ada', 'Grace'].filter(name => name.includes(query));
    return <><label>Memo query<input value={query} onChange={event => setQuery(event.target.value)}/></label><button onClick={() => setTick(value => value + 1)}>Unrelated memo update</button><IdentityLists stable={stable} fresh={fresh}/><Result value={{ tick }}/></>;
}
export function Example02() {
    const [tick, setTick] = useState(0);
    // Deliberate comparison: a newly allocated object invalidates this cache.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const settings = { query: 'Ada' };
    const stable = useMemo(() => ['Ada', 'Grace'].filter(name => name.includes(settings.query)), [settings.query]);
    const fresh = useMemo(() => ['Ada', 'Grace'].filter(name => name.includes(settings.query)), [settings]);
    return <><button onClick={() => setTick(value => value + 1)}>Recreate settings object</button><IdentityLists stable={stable} fresh={fresh}/><Result value={{ tick }}/></>;
}
