import { memo, useLayoutEffect, useState } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';

const Greeting = memo(function Greeting({ name }: { name: string }) {
  const { trace } = useLab();
  useLayoutEffect(() => { trace.emit('greeting.commit', name); });
  return <Result value={name} />;
});

export function Example01() {
  const [count, setCount] = useState(0);
  return <><button onClick={() => setCount(count + 1)}>Update parent ({count})</button><Greeting name="Ada" /></>;
}

const Badge = memo(function Badge({ user }: { user: { name: string } }) {
  const { trace } = useLab();
  useLayoutEffect(() => { trace.emit('badge.commit', user.name); });
  return <Result value={user.name} />;
});

export function Example02() {
  const [count, setCount] = useState(0);
  return <><button onClick={() => setCount(count + 1)}>Recreate props ({count})</button><Badge user={{ name: 'Ada' }} /></>;
}
