import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
import { StrictComparison } from './observations';
import { EffectRace } from './EffectRace';
import { useLabQuery } from './use-lab-query';
import { itemsResponse } from '../helpers';
function InitialEffectChild() { const trace = useRef(useLab().trace); useEffect(() => { const owned = trace.current; owned.emit('initial child setup'); return () => owned.emit('initial child cleanup'); }, []); return <p>Child is mounted.</p>; }
function EmptyEffectChild({ value }: {
    value: number;
}) { const trace = useRef(useLab().trace); useEffect(() => { const owned = trace.current; owned.emit('empty-array setup'); return () => owned.emit('empty-array cleanup'); }, []); return <Result value={{ value }}/>; }
export function Example01() {
    const [mounted, setMounted] = useState(false);
    return <><button onClick={() => setMounted(value => !value)}>{mounted ? 'Remove child' : 'Mount child'}</button>{mounted && <InitialEffectChild />}<Result value={{ mounted }}/></>;
}
export function Example02() {
    const [count, setCount] = useState(0);
    const { trace } = useLab();
    useEffect(() => { trace.emit('no-deps effect', { count }); });
    return <><button onClick={() => setCount(value => value + 1)}>Rerender counter</button><Result value={{ count }}/></>;
}
export function Example03() {
    const [value, setValue] = useState(0);
    return <><button onClick={() => setValue(number => number + 1)}>Change displayed prop</button><EmptyEffectChild value={value}/></>;
}
export function Example04() {
    const [count, setCount] = useState(0);
    const [other, setOther] = useState(false);
    const { trace } = useLab();
    useEffect(() => { trace.emit('dependency setup', count); return () => trace.emit('dependency cleanup', count); }, [count, trace]);
    return <><button onClick={() => setCount(value => value + 1)}>Change dependency</button><button onClick={() => setOther(value => !value)}>Change unrelated state</button><Result value={{ count, other }}/></>;
}
export function Example05() {
    const result = useLabQuery('Ada');
    return <><button onClick={result.retry}>Refetch Ada</button><Result value={{ status: result.status, names: result.names, error: result.error }}/></>;
}
export function Example06() {
    const [fail, setFail] = useState(false);
    const result = useLabQuery('Ada', fail, 80);
    return <><button onClick={() => setFail(true)}>Fail request</button><button onClick={() => { setFail(false); result.retry(); }}>Retry successful request</button><Result value={{ status: result.status, names: result.names, error: result.error }}/></>;
}
export function Example07() {
    const [room, setRoom] = useState('A');
    const [target] = useState(() => new EventTarget());
    const { trace } = useLab();
    useEffect(() => { const receive = () => trace.emit('notice delivered', room); target.addEventListener('notice', receive); trace.emit('subscription setup', room); return () => { target.removeEventListener('notice', receive); trace.emit('subscription cleanup', room); }; }, [room, target, trace]);
    return <><button onClick={() => setRoom(value => value === 'A' ? 'B' : 'A')}>Change subscribed room</button><button onClick={() => target.dispatchEvent(new Event('notice'))}>Send notice</button><Result value={{ room }}/></>;
}
export function Example08() {
    const [running, setRunning] = useState(false);
    const [ticks, setTicks] = useState(0);
    const { trace } = useLab();
    useEffect(() => {
        if (!running) return;
        let tick = 0;
        const timer = setInterval(() => {
            tick++;
            setTicks(tick);
            trace.emit('interval tick', tick);
            if (tick === 5) {
                clearInterval(timer);
                setRunning(false);
            }
        }, 60);
        return () => { clearInterval(timer); trace.emit('interval cleanup'); };
    }, [running, trace]);
    return <><button onClick={() => { setTicks(0); setRunning(true); }}>Start bounded interval</button><button onClick={() => setRunning(false)}>Stop interval</button><Result value={{ ticks, running }}/></>;
}
export function Example09() {
    const [received, setReceived] = useState(0);
    const { trace } = useLab();
    useEffect(() => { const onPing = () => { setReceived(value => value + 1); trace.emit('window ping handled'); }; window.addEventListener('mern-concept-lab:ping', onPing); trace.emit('window listener setup'); return () => { window.removeEventListener('mern-concept-lab:ping', onPing); trace.emit('window listener cleanup'); }; }, [trace]);
    return <><button onClick={() => window.dispatchEvent(new Event('mern-concept-lab:ping'))}>Dispatch lab ping</button><Result value={{ received }}/></>;
}
export function Example10() {
    const [running, setRunning] = useState(false);
    const [count, setCount] = useState(0);
    const { trace } = useLab();
    useEffect(() => {
        if (!running)
            return;
        trace.emit('self-dependent effect', count);
        if (count < 3) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- Bounded reproduction of a self-dependent effect; the explicit cap prevents an infinite loop.
            setCount(value => Math.min(value + 1, 3));
        }
    }, [count, running, trace]);
    return <><p>This reproduction stops at three. Removing the bound would make every update retrigger its own effect.</p><button onClick={() => { setCount(0); setRunning(true); }}>Start bounded loop</button><Result value={{ count, safetyStop: count === 3, renderDerivedDouble: count * 2 }}/></>;
}
export function Example11() {
    const [count, setCount] = useState(0);
    const [target] = useState(() => new EventTarget());
    const { trace } = useLab();
    useEffect(() => {
        const stale = () => trace.emit('stale closure read', count);
        target.addEventListener('read', stale);
        return () => target.removeEventListener('read', stale);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Deliberately missing count to reproduce a stale callback; the corrected subscription below includes it.
    }, [target, trace]);
    useEffect(() => { const fresh = () => trace.emit('current closure read', count); target.addEventListener('read', fresh); return () => target.removeEventListener('read', fresh); }, [count, target, trace]);
    return <><button onClick={() => setCount(value => value + 1)}>Increment captured count</button><button onClick={() => target.dispatchEvent(new Event('read'))}>Read both closures</button><Result value={{ count }}/></>;
}
export function Example12() {
    return <EffectRace />;
}
export function Example13() {
    const result = useLabQuery('Ada', false, 1000);
    return <><button onClick={result.cancel}>Cancel active request</button><button onClick={result.retry}>Start fresh request</button><Result value={{ status: result.status, names: result.names, error: result.error }}/></>;
}
export function Example14() {
    return <StrictComparison />;
}
export function Example15() {
    const [query, setQuery] = useState('Ada');
    const result = useLabQuery(query, false, 80);
    return <><label>Search names<input value={query} maxLength={30} onChange={event => setQuery(event.target.value)}/></label><Result value={{ query, status: result.status, names: result.names, error: result.error }}/></>;
}
export function Example16() {
    const { request, trace } = useLab();
    const [result, setResult] = useState({ status: 'loading', names: [] as string[] });
    useEffect(() => {
        const controller = new AbortController();
        let active = true;
        async function load() { try {
            const names = await itemsResponse((path, options) => request(path, { ...options, signal: controller.signal }));
            if (active) {
                setResult({ status: 'success', names });
                trace.emit('async inner function completed');
            }
        }
        catch {
            if (active)
                setResult({ status: 'error', names: [] });
        } }
        void load();
        return () => { active = false; controller.abort(); trace.emit('async effect cleanup'); };
    }, [request, trace]);
    return <Result value={result}/>;
}
export function Example17() {
    const [first, setFirst] = useState('Ada');
    const [last, setLast] = useState('Lovelace');
    const [effectName, setEffectName] = useState('');
    const { trace } = useLab();
    useLayoutEffect(() => { trace.emit('derived-value commit', { first, last, effectName, renderName: `${first} ${last}` }); });
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional unnecessary-effect comparison; derive renderName directly instead.
        setEffectName(`${first} ${last}`);
    }, [first, last]);
    return <><label>First name<input value={first} onChange={event => setFirst(event.target.value)} maxLength={30}/></label><label>Last name<input value={last} onChange={event => setLast(event.target.value)} maxLength={30}/></label><Result value={{ effectName, renderName: `${first} ${last}` }}/></>;
}
