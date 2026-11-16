import { useState } from 'react';
import { Result } from './LabWidgets';
function Greeting({ name }: {
    name: string;
}) { return <Result value={`Hi ${name}`}/>; }
function SmallCounter({ label }: {
    label: string;
}) { const [count, setCount] = useState(0); return <section aria-label={label}><button onClick={() => setCount(value => value + 1)}>{label} increment</button><Result value={{ label, count }}/></section>; }
export function Example01() {
    const [name, setName] = useState('Ada');
    return <><label>Greeting name<input value={name} onChange={event => setName(event.target.value)} maxLength={30}/></label><Greeting name={name}/></>;
}
export function Example02() {
    return <><SmallCounter label="First counter"/><SmallCounter label="Second counter"/></>;
}
