import { useState } from 'react';
import { Result } from './LabWidgets';
function SharedButton({ label, value, onChange }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
}) { return <button aria-label={label} onClick={() => onChange(value + 1)}>{label}: {value}</button>; }
export function Example01() {
    const [source, setSource] = useState({ scale: 'c', text: '20' });
    const numeric = Number(source.text);
    const valid = source.text.trim() !== '' && Number.isFinite(numeric);
    const celsius = valid ? source.scale === 'c' ? numeric : (numeric - 32) * 5 / 9 : null;
    const fahrenheit = celsius === null ? null : celsius * 9 / 5 + 32;
    return <><label>Celsius<input value={source.scale === 'c' ? source.text : celsius === null ? '' : String(Number(celsius.toFixed(2)))} onChange={event => setSource({ scale: 'c', text: event.target.value })} maxLength={10}/></label><label>Fahrenheit<input value={source.scale === 'f' ? source.text : fahrenheit === null ? '' : String(Number(fahrenheit.toFixed(2)))} onChange={event => setSource({ scale: 'f', text: event.target.value })} maxLength={10}/></label><Result value={{ valid, celsius, fahrenheit }}/></>;
}
export function Example02() {
    const [count, setCount] = useState(0);
    return <><SharedButton label="Left sibling" value={count} onChange={setCount}/><SharedButton label="Right sibling" value={count} onChange={setCount}/><Result value={{ count }}/></>;
}
