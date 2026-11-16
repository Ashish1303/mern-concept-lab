import { useDispatch } from 'react-redux';
import { CounterControls, CounterProvider } from './redux-local';
import { counter } from './redux-store';

export function Example01() {
  return <CounterProvider><CounterControls amount={3} /></CounterProvider>;
}

function Reset() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(counter.actions.reset())}>Clear counter</button>;
}

export function Example02() {
  return <CounterProvider><CounterControls amount={5} /><Reset /></CounterProvider>;
}
