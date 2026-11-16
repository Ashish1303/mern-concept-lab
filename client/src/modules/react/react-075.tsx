import { useState } from 'react';
import type { ComponentType } from 'react';
import { Result } from './LabWidgets';

function withAccess(View: ComponentType, denied: string) {
  return function AccessGate({ allowed }: { allowed: boolean }) {
    return allowed ? <View /> : <Result value={denied} />;
  };
}

const Report = withAccess(() => <Result value="Revenue report" />, 'Report locked');
export function Example01() {
  const [allowed, setAllowed] = useState(false);
  return <><button onClick={() => setAllowed(!allowed)}>Toggle access</button><Report allowed={allowed} /></>;
}

function withCounter(View: ComponentType<{ count: number; increment: () => void }>) {
  return function CounterOwner() {
    const [count, setCount] = useState(0);
    return <View count={count} increment={() => setCount(value => value + 1)} />;
  };
}
const Counter = withCounter(({ count, increment }) => <><button onClick={increment}>Increase score</button><Result value={count} /></>);
export function Example02() { return <Counter />; }
