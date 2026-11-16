import { memo, StrictMode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { useLab } from './lab-context';
import type { LabTrace } from './lab-context';
import { Result } from './LabWidgets';
export function BatchingComparison() {
    const [count, setCount] = useState(0);
    const [active, setActive] = useState(false);
    const { trace } = useLab();
    useLayoutEffect(() => { trace.emit('batch commit', { count, active }); });
    return <><button onClick={() => { setCount(value => value + 1); setActive(value => !value); }}>Update both fields</button><Result value={{ count, active }}/></>;
}
const StableList = memo(function StableList({ values, label, trace }: {
    values: readonly (string | number)[];
    label: string;
    trace: LabTrace;
}) {
    useLayoutEffect(() => { trace.emit(`${label} commit`, { values: values.length }); });
    return <p>{label}: {values.join(', ')}</p>;
});
// Each render receives values computed by the owner; probes record actual commits.
export function IdentityLists({ stable, fresh }: {
    stable: readonly (string | number)[];
    fresh: readonly (string | number)[];
}) {
    const { trace } = useLab();
    return <><StableList values={stable} label="Stable" trace={trace}/><StableList values={fresh} label="Fresh" trace={trace}/></>;
}
function MountProbe({ trace, label }: {
    trace: LabTrace;
    label: string;
}) {
    useEffect(() => { trace.emit(`${label} setup`); return () => trace.emit(`${label} cleanup`); }, [label, trace]);
    return <p>{label} root mounted</p>;
}
export function StrictComparison() {
    const { trace } = useLab();
    const plain = useRef<HTMLDivElement>(null);
    const strict = useRef<HTMLDivElement>(null);
    const roots = useRef<Root[]>([]);
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const owned = roots.current;
        return () => { const pending = owned.splice(0); queueMicrotask(() => pending.forEach(root => root.unmount())); };
    }, []);
    function mount() {
        if (!plain.current || !strict.current || roots.current.length)
            return;
        const first = createRoot(plain.current);
        const second = createRoot(strict.current);
        roots.current.push(first, second);
        first.render(<MountProbe trace={trace} label="Plain"/>);
        second.render(<StrictMode><MountProbe trace={trace} label="Strict"/></StrictMode>);
        setStarted(true);
    }
    return <><p>{import.meta.env.DEV ? 'Development: the strict root replays setup/cleanup to find missing cleanup.' : 'Production: development-only StrictMode replay is disabled; both roots mount normally.'}</p><button disabled={started} onClick={mount}>Run isolated StrictMode comparison</button><div ref={plain}/><div ref={strict}/><Result value={{ started, development: import.meta.env.DEV }}/></>;
}
