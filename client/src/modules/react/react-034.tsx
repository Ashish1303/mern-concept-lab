import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
export function Example01() {
    const [wide, setWide] = useState(false);
    const [width, setWidth] = useState(0);
    const box = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        // Measurement must update before paint; this is the documented layout-effect use case.
        setWidth(box.current?.getBoundingClientRect().width ?? 0);
    }, [wide]);
    return <><button onClick={() => setWide(value => !value)}>Toggle measured width</button><div ref={box} className={wide ? 'measure-box wide' : 'measure-box'}>Measured box</div><Result value={{ width, wide }}/></>;
}
export function Example02() {
    const [count, setCount] = useState(0);
    const { trace } = useLab();
    useLayoutEffect(() => { trace.emit('layout phase', count); return () => trace.emit('layout cleanup', count); }, [count, trace]);
    useEffect(() => { trace.emit('passive phase', count); return () => trace.emit('passive cleanup', count); }, [count, trace]);
    return <><button onClick={() => setCount(value => value + 1)}>Commit both effect phases</button><Result value={{ count }}/></>;
}
