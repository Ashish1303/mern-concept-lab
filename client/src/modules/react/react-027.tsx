import { useState, useRef } from 'react';
import { Result } from './LabWidgets';
import { BatchingComparison } from './observations';
function LazySeed({ seed }: {
    seed: number;
}) { const [initialSquare] = useState(() => seed * seed); return <Result value={{ seed, initialSquare }}/>; }
export function Example01() {
    const [count, setCount] = useState(0);
    return <><div className="button-row"><button onClick={() => setCount(value => value + 1)}>Increment</button><button onClick={() => setCount(value => value - 1)}>Decrement</button></div><Result value={{ count }}/></>;
}
export function Example02() {
    const [count, setCount] = useState(0);
    return <><button onClick={() => { setCount(value => value + 1); setCount(value => value + 1); setCount(value => value + 1); }}>Queue three functional increments</button><Result value={{ count }}/></>;
}
export function Example03() {
    const [count, setCount] = useState(0);
    return <><div className="button-row"><button onClick={() => { setCount(5); setCount(value => value + 1); setCount(42); }}>Replace, update, replace</button><button onClick={() => { setCount(42); setCount(value => value + 1); }}>Replace then update</button></div><Result value={{ count }}/></>;
}
export function Example04() {
    const [user, setUser] = useState({ name: 'Ada', role: 'engineer' });
    return <><label>Name<input value={user.name} onChange={event => setUser(previous => ({ ...previous, name: event.target.value }))} maxLength={40}/></label><button onClick={() => setUser(previous => ({ ...previous, role: 'reviewer' }))}>Change role</button><Result value={user}/></>;
}
export function Example05() {
    const [items, setItems] = useState([{ id: 1, name: 'Ada' }]);
    const nextId = useRef(2);
    const [name, setName] = useState('Grace');
    function addItem() { const label = name.trim(); if (!label || items.length >= 8)
        return; const id = nextId.current++; setItems(previous => [...previous, { id, name: label }]); }
    return <><label>Item name<input value={name} onChange={event => setName(event.target.value)} maxLength={30}/></label><button onClick={addItem}>Add item</button><ul>{items.map(item => <li key={item.id}>{item.name} <button aria-label={`Remove ${item.name}`} onClick={() => setItems(previous => previous.filter(value => value.id !== item.id))}>Remove</button></li>)}</ul><Result value={items}/></>;
}
export function Example06() {
    const [history] = useState(() => [{ profile: { score: 1 } }]);
    const [current, setCurrent] = useState(history[0]!);
    function shallowBug() { const copy = { ...current }; copy.profile.score += 1; setCurrent(copy); }
    function corrected() { setCurrent(previous => ({ ...previous, profile: { ...previous.profile, score: previous.profile.score + 1 } })); }
    return <><p>The saved history contains the original object reference.</p><div className="button-row"><button onClick={shallowBug}>Shallow-copy bug</button><button onClick={corrected}>Copy the nested path</button></div><Result value={{ current: current.profile.score, savedHistory: history[0]!.profile.score }}/></>;
}
export function Example07() {
    return <BatchingComparison />;
}
export function Example08() {
    let local = 0;
    const [count, setCount] = useState(0);
    const [lastHandlerLocal, setLastHandlerLocal] = useState(0);
    return <><button onClick={() => { local++; setLastHandlerLocal(local); setCount(value => value + 1); }}>Update local and state</button><Result value={{ renderLocal: local, lastHandlerLocal, count }}/></>;
}
export function Example09() {
    const [seed, setSeed] = useState(2);
    const [generation, setGeneration] = useState(0);
    return <><button onClick={() => setSeed(value => value + 1)}>Change seed</button><button onClick={() => setGeneration(value => value + 1)}>Remount initializer</button><LazySeed key={generation} seed={seed}/></>;
}
export function Example10() {
    const [count, setCount] = useState(0);
    const pending = useRef<(() => void) | null>(null);
    const [scheduled, setScheduled] = useState(false);
    function schedule(functional: boolean) { pending.current = functional ? () => setCount(value => value + 1) : () => setCount(count + 1); setScheduled(true); }
    return <><div className="button-row"><button onClick={() => schedule(false)}>Schedule captured update</button><button onClick={() => schedule(true)}>Schedule functional update</button><button onClick={() => setCount(value => value + 10)}>Add ten</button><button disabled={!scheduled} onClick={() => { pending.current?.(); pending.current = null; setScheduled(false); }}>Resolve scheduled update</button></div><Result value={{ count, scheduled }}/></>;
}
