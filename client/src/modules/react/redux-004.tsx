import { ActionLab } from './redux-local';
import { counter, createCounterStore } from './redux-store';

export function Example01() {
  return <ActionLab label="Dispatch add" run={() => {
    const store = createCounterStore();
    store.dispatch(counter.actions.add(4));
    return store.getState().counter;
  }} />;
}

export function Example02() {
  return <ActionLab label="Dispatch thunk" run={() => {
    const store = createCounterStore();
    store.dispatch(dispatch => {
      dispatch(counter.actions.increment());
      dispatch(counter.actions.increment());
    });
    return store.getState().counter;
  }} />;
}
