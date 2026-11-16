import { useState } from 'react';
import type { ReactNode } from 'react';
import { Result } from './LabWidgets';
function Panel({ title, children }: {
    title: string;
    children: ReactNode;
}) { return <fieldset><legend>{title}</legend>{children}</fieldset>; }
function Slots({ leading, trailing }: {
    leading: ReactNode;
    trailing: ReactNode;
}) { return <div className="usage-grid"><div>{leading}</div><div>{trailing}</div></div>; }
export function Example01() {
    const [count, setCount] = useState(0);
    return <><Panel title="Caller-provided child"><button onClick={() => setCount(value => value + 1)}>Increment slotted child</button></Panel><Result value={{ count }}/></>;
}
export function Example02() {
    const [label, setLabel] = useState('Preview');
    return <><label>Slot title<input value={label} onChange={event => setLabel(event.target.value)} maxLength={30}/></label><Slots leading={<strong>{label}</strong>} trailing={<button onClick={() => setLabel('Updated')}>Update slot</button>}/><Result value={{ label }}/></>;
}
