import { CounterControls, CounterProvider, SelectionProbe } from './redux-local';

export function Example01() {
  return <CounterProvider><CounterControls amount={2} /></CounterProvider>;
}

export function Example02() {
  return <CounterProvider><SelectionProbe /></CounterProvider>;
}
