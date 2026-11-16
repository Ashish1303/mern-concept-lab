import { useState } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const [name, setName] = useState('<b>Ada</b>');
    return <><label>JSX text<input value={name} onChange={event => setName(event.target.value)} maxLength={80}/></label><p data-testid="escaped-text">{name}</p><Result value={{ text: name }}/></>;
}
export function Example02() {
    const [count, setCount] = useState(1);
    return <><button onClick={() => setCount(value => value + 1)}>Change JSX expression</button><p>{count} × 2 = {count * 2}</p><Result value={{ count, doubled: count * 2 }}/></>;
}
