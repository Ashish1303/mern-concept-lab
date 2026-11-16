import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Result } from './LabWidgets';

function Quantity() {
  const [count, setCount] = useState(0);
  return <><button onClick={() => setCount(value => value + 1)}>Add item</button><output aria-label="Quantity">{count}</output></>;
}
function EmailField() {
  return <label>Email <input required type="email" /></label>;
}
function DomCheck({ children, label, exercise, expected }: {
  children: ReactNode;
  label: string;
  exercise: (fixture: HTMLElement) => void;
  expected: (fixture: HTMLElement) => boolean;
}) {
  const fixture = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(0);
  const [result, setResult] = useState('Ready');
  const checked = useRef(0);
  useEffect(() => {
    if (!fixture.current || checked.current === requested) return;
    checked.current = requested;
    setResult(expected(fixture.current) ? 'PASS: ' + label : 'FAIL: ' + label);
  }, [expected, label, requested]);
  return <><div ref={fixture}>{children}</div>
    <button onClick={() => {
      if (!fixture.current) return;
      exercise(fixture.current);
      setRequested(value => value + 1);
    }}>Run component check</button><Result value={result} />
  </>;
}
export function Example01() {
  return <DomCheck label="click increases quantity" exercise={fixture => {
    const before = Number(fixture.querySelector('output')?.textContent);
    fixture.dataset.expected = String(before + 1);
    fixture.querySelector('button')?.click();
  }} expected={fixture => fixture.querySelector('output')?.textContent === fixture.dataset.expected}><Quantity /></DomCheck>;
}
export function Example02() {
  return <DomCheck label="invalid email is rejected" exercise={fixture => {
    const input = fixture.querySelector('input')!;
    input.value = 'invalid';
  }} expected={fixture => fixture.querySelector('input')?.validity.typeMismatch === true}><EmailField /></DomCheck>;
}
