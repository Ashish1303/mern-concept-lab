import { ActionLab, CounterSnapshot } from './redux-local';
import { createCounterStore } from './redux-store';

export function Example01() {
  return <CounterSnapshot />;
}

export function Example02() {
  return <ActionLab label="Inspect store" run={() => createCounterStore().getState()} />;
}
