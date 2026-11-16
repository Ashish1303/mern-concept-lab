import { ActionLab } from './redux-local';
import { counter } from './redux-store';

export function Example01() {
  return <ActionLab label="Reduce increment" run={() => counter.reducer({ value: 4, note: '' }, counter.actions.increment())} />;
}

export function Example02() {
  return <ActionLab label="Reduce unknown" run={() => {
    const state = counter.getInitialState();
    return { sameState: counter.reducer(state, { type: 'unknown' }) === state };
  }} />;
}
