import { memo, useLayoutEffect, useState } from 'react';
import { useLab } from './lab-context';
import type { LabTrace } from './lab-context';
const CallbackButton = memo(function CallbackButton({ label, action, trace }: {
    label: string;
    action: () => void;
    trace: LabTrace;
}) {
    useLayoutEffect(() => { trace.emit(`${label} callback commit`); });
    return <button onClick={action}>{label} callback</button>;
});
export function CallbackPair({ stable, fresh }: {
    stable: () => void;
    fresh: () => void;
}) {
    const { trace } = useLab();
    return <><CallbackButton label="Stable" action={stable} trace={trace}/><CallbackButton label="Fresh" action={fresh} trace={trace}/></>;
}
const rows = Array.from({ length: 800 }, (_, index) => `${index % 2 ? 'Grace' : 'Ada'} ${index}`);
export const FilteredRows = memo(function FilteredRows({ query }: {
    query: string;
}) {
    const { trace } = useLab();
    const matching = rows.filter(row => row.toLowerCase().includes(query.toLowerCase()));
    useLayoutEffect(() => { trace.emit('filtered list commit', { query, count: matching.length }); });
    return <section><p>Matching rows: {matching.length}</p><ul>{matching.slice(0, 5).map(row => <li key={row}>{row}</li>)}</ul></section>;
});
export function DebugHelp({ lazy }: {
    lazy: boolean;
}) {
    return <p className="compiler-notice">Open React Developer Tools and inspect the custom hook. {lazy ? 'React calls the supplied formatter when the hook is inspected.' : 'The custom hook registers the value with useDebugValue.'} The ordinary UI below displays state, not a fabricated DevTools label.</p>;
}
export function SharedCounterView({ label, count, increment }: {
    label: string;
    count: number;
    increment: () => void;
}) {
    return <button onClick={increment}>{label}: {count}</button>;
}
export function FocusMarker() {
    const [focused, setFocused] = useState(false);
    return <p>{focused ? 'Focused control observed.' : 'No focus event yet.'}<button onFocus={() => setFocused(true)}>Focus marker</button></p>;
}
