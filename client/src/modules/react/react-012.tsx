import { useState } from 'react';
import { Result } from './LabWidgets';
function IndependentSeed({ seed }: {
    seed: number;
}) { const [local, setLocal] = useState(seed); return <><button onClick={() => setLocal(value => value + 1)}>Increment child local</button><Result value={{ seed, local }}/></>; }
function ControlledValue({ value, onChange }: {
    value: number;
    onChange: (value: number) => void;
}) { return <><button onClick={() => onChange(value + 1)}>Increment controlled child</button><Result value={{ value }}/></>; }
export function Example01() {
    const [seed, setSeed] = useState(2);
    return <><button onClick={() => setSeed(value => value + 1)}>Change seed prop</button><IndependentSeed seed={seed}/></>;
}
export function Example02() {
    const [value, setValue] = useState(2);
    return <><button onClick={() => setValue(number => number + 1)}>Increment parent value</button><ControlledValue value={value} onChange={setValue}/></>;
}
