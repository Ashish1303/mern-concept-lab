import { useState, useEffect } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
function MountCounter() { const [count, setCount] = useState(0); const { trace } = useLab(); useEffect(() => { trace.emit('counter mounted'); return () => trace.emit('counter unmounted'); }, [trace]); return <><button onClick={() => setCount(value => value + 1)}>Mounted child increment</button><Result value={{ count }}/></>; }
export function Example01() {
    const [show, setShow] = useState(true);
    return <><button onClick={() => setShow(value => !value)}>Toggle mounted child</button>{show && <MountCounter />}<Result value={{ show }}/></>;
}
export function Example02() {
    const [show, setShow] = useState(true);
    return <><button onClick={() => setShow(value => !value)}>Toggle hidden child</button><div hidden={!show}><MountCounter /></div><Result value={{ show }}/></>;
}
