import { useState, useRef } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const input = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);
    return <><label>Ref focus target<input ref={input} onFocus={() => setFocused(true)}/></label><button onClick={() => input.current?.focus()}>Focus ref target</button><Result value={{ focused }}/></>;
}
export function Example02() {
    const ref = useRef(0);
    const [snapshot, setSnapshot] = useState(0);
    return <><button onClick={() => { ref.current++; }}>Mutate retained ref</button><button onClick={() => setSnapshot(ref.current)}>Read retained ref</button><Result value={{ snapshot }}/></>;
}
