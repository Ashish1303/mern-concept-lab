import { useEffect, useMemo, useState } from 'react';
import { debounce, throttle } from '../helpers';
import { Result } from './LabWidgets';

export function Example01() {
  const [input, setInput] = useState('');
  const [applied, setApplied] = useState('');
  const search = useMemo(() => debounce(setApplied, 250), []);
  useEffect(() => search.cancel, [search]);
  return <><label>Debounced search <input value={input} onChange={event => {
    setInput(event.target.value);
    search.call(event.target.value);
  }} /></label><Result value={applied || 'Waiting for input'} /></>;
}
export function Example02() {
  const [samples, setSamples] = useState<number[]>([]);
  const sample = useMemo(() => throttle((value: number) => setSamples(old => [...old, value]), 250), []);
  useEffect(() => sample.cancel, [sample]);
  return <><button onClick={() => { sample.call(1); sample.call(2); sample.call(3); }}>Send burst</button><Result value={samples} /></>;
}
