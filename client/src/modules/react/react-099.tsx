import { memo, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';

const prices = [12, 18, 30];
const Total = memo(function Total({ value }: { value: { total: number } }) {
  const { trace } = useLab();
  useLayoutEffect(() => { trace.emit('total.commit', value.total); });
  return <Result value={value.total} />;
});
export function Example01() {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState(false);
  const value = useMemo(() => ({ total: prices.reduce((sum, price) => sum + price, 0) * quantity }), [quantity]);
  return <><button onClick={() => setNote(!note)}>Toggle note</button><button onClick={() => setQuantity(quantity + 1)}>Add bundle</button>
    {note && <p>Includes three products.</p>}<Total value={value} />
  </>;
}
const Action = memo(function Action({ increment }: { increment: () => void }) {
  const { trace } = useLab();
  useLayoutEffect(() => { trace.emit('action.commit'); });
  return <button onClick={increment}>Increment from child</button>;
});
export function Example02() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(value => value + 1), []);
  return <><Action increment={increment} /><Result value={count} /></>;
}
