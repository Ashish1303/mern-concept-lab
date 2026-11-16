import { CounterProvider, CounterControls } from './redux-local';
import { selectValue, useCounterDispatch, useCounterSelector, counter } from './redux-store';
import { Result } from './LabWidgets';

function TypedReset() {
  const dispatch = useCounterDispatch();
  const value = useCounterSelector(selectValue);
  return <><button onClick={() => dispatch(counter.actions.add(4))}>Set up typed reset</button>
    <button onClick={() => dispatch(counter.actions.reset())}>Reset through typed dispatch</button><Result value={value} /></>;
}

export function Example01() {
  return <CounterProvider><CounterControls amount={11} /></CounterProvider>;
}

export function Example02() {
  return <CounterProvider><TypedReset /></CounterProvider>;
}
