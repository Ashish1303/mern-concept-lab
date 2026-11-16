import { useState, useRef, Fragment } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const host = useRef<HTMLDivElement>(null);
    const [children, setChildren] = useState<number | null>(null);
    return <><div ref={host}><><span>One</span><span>Two</span></></div><button onClick={() => setChildren(host.current?.children.length ?? 0)}>Inspect fragment DOM</button><Result value={{ directDOMChildren: children }}/></>;
}
export function Example02() {
    const [values, setValues] = useState([{ id: 'a', label: 'Ada' }, { id: 'g', label: 'Grace' }]);
    return <><button onClick={() => setValues(previous => [...previous].reverse())}>Reverse fragment groups</button><dl>{values.map(item => <Fragment key={item.id}><dt>{item.label}</dt><dd>{item.id}</dd></Fragment>)}</dl><Result value={values.map(item => item.id)}/></>;
}
