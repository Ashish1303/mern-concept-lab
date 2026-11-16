import { useState, useLayoutEffect, useDeferredValue } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
import { FilteredRows } from './hook-widgets';
export function Example01() {
    const [query, setQuery] = useState('');
    const deferred = useDeferredValue(query);
    const { trace } = useLab();
    useLayoutEffect(() => { trace.emit('deferred commit', { query, deferred }); }, [query, deferred, trace]);
    return <><label>Deferred search<input value={query} onChange={event => setQuery(event.target.value)}/></label><FilteredRows query={deferred}/><Result value={{ query, deferred, stale: query !== deferred }}/></>;
}
export function Example02() {
    const [query, setQuery] = useState('Ada');
    const deferred = useDeferredValue(query, '');
    const { trace } = useLab();
    useLayoutEffect(() => { trace.emit('initial deferred commit', { query, deferred }); }, [query, deferred, trace]);
    return <><button onClick={() => setQuery('Grace')}>Change initial deferred query</button><FilteredRows query={deferred}/><Result value={{ query, deferred }}/></>;
}
