import { createContext, useContext, useState } from 'react';
import { Result } from './LabWidgets';
import { CounterControls, CounterProvider } from './redux-local';

const Density = createContext('Comfortable');
function DensityResult() { return <Result value={useContext(Density)} />; }
function DensityLabel() { return <p>Context density: {useContext(Density)}</p>; }

export function Example01() {
  const [compact, setCompact] = useState(false);
  return <Density value={compact ? 'Compact' : 'Comfortable'}>
    <button onClick={() => setCompact(value => !value)}>Toggle density</button><DensityResult />
  </Density>;
}

export function Example02() {
  return <CounterProvider><CounterControls amount={4} /></CounterProvider>;
}

export function Example03() {
  return <Density value="Compact"><DensityLabel /><CounterProvider><CounterControls amount={6} /></CounterProvider></Density>;
}
