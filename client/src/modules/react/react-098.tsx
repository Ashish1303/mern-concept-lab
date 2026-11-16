import { memo, useLayoutEffect, useState } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';

function Summary({ label }: { label: string }) {
  const { trace } = useLab();
  useLayoutEffect(() => { trace.emit(label + '.commit'); });
  return <p>{label} stays visible</p>;
}
function Counter() {
  const [count, setCount] = useState(0);
  return <><button onClick={() => setCount(value => value + 1)}>Update local counter</button><Result value={count} /></>;
}
export function Example01() {
  return <><Counter /><Summary label="Independent summary" /></>;
}
const MemoSummary = memo(Summary);
export function Example02() {
  const [count, setCount] = useState(0);
  return <><button onClick={() => setCount(value => value + 1)}>Update parent counter</button>
    <Summary label="Plain summary" /><MemoSummary label="Memo summary" /><Result value={count} />
  </>;
}
