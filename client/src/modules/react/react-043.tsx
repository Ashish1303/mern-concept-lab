import { useState, useRef, useTransition, useOptimistic } from 'react';
import { Result } from './LabWidgets';
import { useOwnedRequests, acknowledge } from './lab-context';
type OptimisticItem = {
    id: number;
    name: string;
    pending: boolean;
};
function upsertOptimistic(items: OptimisticItem[], item: OptimisticItem) { if (items.some(existing => existing.id === item.id && !existing.pending))
    return items; return [...items.filter(existing => existing.id !== item.id), item]; }
export function Example01() {
    const request = useOwnedRequests();
    const [items, setItems] = useState<OptimisticItem[]>([]);
    const [optimistic, addOptimistic] = useOptimistic(items, upsertOptimistic);
    const next = useRef(1);
    const [fail, setFail] = useState(false);
    const [error, setError] = useState('');
    const [pending, startTransition] = useTransition();
    return <><label><input type="checkbox" checked={fail} onChange={event => setFail(event.target.checked)}/>Reject optimistic item</label><button disabled={pending} onClick={() => { const item = { id: next.current++, name: 'Ada', pending: true }; startTransition(async () => { addOptimistic(item); try {
        await acknowledge(request, item.name, fail, true);
        startTransition(() => { setItems(previous => upsertOptimistic(previous, { ...item, pending: false })); setError(''); });
    }
    catch (error) {
        setError(error instanceof Error ? error.message : 'Request failed.');
    } }); }}>Add optimistic item</button><Result value={{ items: optimistic, confirmed: items.length, pending, error }}/></>;
}
export function Example02() {
    const request = useOwnedRequests();
    const [base, setBase] = useState(0);
    const [optimistic, addOptimistic] = useOptimistic(base, (current, delta: number) => current + delta);
    const [fail, setFail] = useState(false);
    const [error, setError] = useState('');
    const [pending, startTransition] = useTransition();
    return <><label><input type="checkbox" checked={fail} onChange={event => setFail(event.target.checked)}/>Reject optimistic increment</label><button disabled={pending} onClick={() => startTransition(async () => { addOptimistic(1); try {
        await acknowledge(request, 'increment', fail, true);
        startTransition(() => { setBase(value => value + 1); setError(''); });
    }
    catch (error) {
        setError(error instanceof Error ? error.message : 'Request failed.');
    } })}>Optimistic increment</button><button onClick={() => setBase(value => value + 10)}>External base plus ten</button><Result value={{ base, optimistic, pending, error }}/></>;
}
