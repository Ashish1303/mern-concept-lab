import { useState, useLayoutEffect, useTransition } from 'react';
import { Result } from './LabWidgets';
import { useLab, useOwnedRequests, acknowledge } from './lab-context';
import { FilteredRows } from './hook-widgets';
export function Example01() {
    const [text, setText] = useState('');
    const [query, setQuery] = useState('');
    const [pending, startTransition] = useTransition();
    const { trace } = useLab();
    useLayoutEffect(() => { trace.emit('transition commit', { text, query, pending }); }, [text, query, pending, trace]);
    return <><label>Transition search<input value={text} onChange={event => { const value = event.target.value; setText(value); startTransition(() => setQuery(value)); }}/></label><FilteredRows query={query}/><Result value={{ text, query, pending }}/></>;
}
export function Example02() {
    const request = useOwnedRequests();
    const [name, setName] = useState('none');
    const [error, setError] = useState('');
    const [pending, startTransition] = useTransition();
    return <><button disabled={pending} onClick={() => startTransition(async () => { try {
        const result = await acknowledge(request, 'Ada');
        startTransition(() => { setName(result); setError(''); });
    }
    catch (error) {
        startTransition(() => setError(error instanceof Error ? error.message : 'Request failed.'));
    } })}>Run transition request</button><Result value={{ name, pending, error }}/></>;
}
