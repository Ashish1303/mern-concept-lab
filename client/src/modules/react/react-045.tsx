import { useState, useRef, use, createContext, Suspense } from 'react';
import { Result, LabBoundary } from './LabWidgets';
import { useOwnedRequests } from './lab-context';
import { itemsResponse } from '../helpers';
const UseContext = createContext('fallback');
function ConditionalReader({ enabled }: {
    enabled: boolean;
}) { let value = 'disabled'; if (enabled)
    value = use(UseContext); return <Result value={{ value }}/>; }
function PromiseReader({ promise }: {
    promise: Promise<string[]>;
}) { const names = use(promise); return <Result value={{ names }}/>; }
export function Example01() {
    const [enabled, setEnabled] = useState(false);
    return <><button onClick={() => setEnabled(value => !value)}>Toggle conditional context read</button><UseContext value="provided"><ConditionalReader enabled={enabled}/></UseContext></>;
}
export function Example02() {
    const request = useOwnedRequests();
    const [resource, setResource] = useState<{
        promise: Promise<string[]>;
        version: number;
    } | null>(null);
    const [fail, setFail] = useState(false);
    const next = useRef(0);
    return <><label><input type="checkbox" checked={fail} onChange={event => setFail(event.target.checked)}/>Reject Promise resource</label><button onClick={() => { const promise = itemsResponse(request, `/api/v1/lab/items?delay=100&fail=${fail ? '1' : '0'}`); void promise.catch(() => undefined); setResource({ promise, version: ++next.current }); }}>Create Promise resource</button>{resource ? <LabBoundary key={resource.version}><Suspense fallback={<p role="status">Waiting for actual Promise…</p>}><PromiseReader promise={resource.promise}/></Suspense></LabBoundary> : <Result value={{ status: 'No resource yet' }}/>}</>;
}
