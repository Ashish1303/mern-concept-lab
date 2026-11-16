import { useState, useRef, useCallback } from 'react';
import { Result } from './LabWidgets';
import { CallbackPair } from './hook-widgets';
export function Example01() {
    const [count, setCount] = useState(0);
    const [tick, setTick] = useState(0);
    const stable = useCallback(() => setCount(value => value + 1), []);
    const fresh = () => setCount(value => value + 1);
    return <><button onClick={() => setTick(value => value + 1)}>Unrelated callback update</button><CallbackPair stable={stable} fresh={fresh}/><Result value={{ count, tick }}/></>;
}
export function Example02() {
    const [count, setCount] = useState(0);
    const [read, setRead] = useState<number | null>(null);
    const retained = useRef<(() => void) | null>(null);
    const callback = useCallback(() => setRead(count), [count]);
    return <><button onClick={() => { retained.current = callback; }}>Retain current callback</button><button onClick={() => setCount(value => value + 1)}>Change callback dependency</button><button onClick={() => retained.current?.()}>Invoke retained callback</button><button onClick={callback}>Invoke latest callback</button><Result value={{ count, read }}/></>;
}
