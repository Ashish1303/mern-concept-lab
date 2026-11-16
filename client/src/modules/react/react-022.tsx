import { useState, createElement } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const [label, setLabel] = useState('Ada');
    const [inspection, setInspection] = useState<unknown>('Not inspected');
    const element = <span title={label}>{label}</span>;
    return <><label>Element label<input value={label} maxLength={30} onChange={event => setLabel(event.target.value)}/></label>{element}<button onClick={() => setInspection({ type: element.type, title: element.props.title as unknown, isDOMNode: element instanceof HTMLElement, frozenHere: Object.isFrozen(element) })}>Inspect React element</button><Result value={inspection}/></>;
}
export function Example02() {
    const [label, setLabel] = useState('MERN');
    const jsx = <p>{label}</p>;
    const manual = createElement('p', null, label);
    return <><label>Shared element text<input value={label} onChange={event => setLabel(event.target.value)} maxLength={30}/></label>{jsx}{manual}<Result value={{ sameType: jsx.type === manual.type, sameChild: jsx.props.children === manual.props.children, sameObject: jsx === manual, label }}/></>;
}
