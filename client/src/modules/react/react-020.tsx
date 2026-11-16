import { useState } from 'react';
import { Result } from './LabWidgets';
function PersonEditor({ person }: {
    person: string;
}) { const [draft, setDraft] = useState(person); return <><label>Person draft<input value={draft} onChange={event => setDraft(event.target.value)} maxLength={40}/></label><Result value={{ person, draft }}/></>; }
function TypeCounter({ kind }: {
    kind: string;
}) { const [count, setCount] = useState(0); return <><button onClick={() => setCount(value => value + 1)}>Type counter increment</button><Result value={{ kind, count }}/></>; }
function FirstType() { return <TypeCounter kind="first"/>; }
function SecondType() { return <TypeCounter kind="second"/>; }
export function Example01() {
    const [person, setPerson] = useState('Ada');
    const [resetByKey, setResetByKey] = useState(false);
    return <><button onClick={() => setPerson(value => value === 'Ada' ? 'Grace' : 'Ada')}>Change editor person</button><label><input type="checkbox" checked={resetByKey} onChange={event => setResetByKey(event.target.checked)}/>Reset with entity key</label><PersonEditor key={resetByKey ? person : 'stable'} person={person}/></>;
}
export function Example02() {
    const [alternate, setAlternate] = useState(false);
    return <><button onClick={() => setAlternate(value => !value)}>Switch component type</button>{alternate ? <SecondType /> : <FirstType />}</>;
}
