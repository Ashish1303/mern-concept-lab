import { configureStore, createAction } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';
import { counter, createCounterStore } from './redux-store';

export function Example01() {
  return <ActionLab label="Inspect reducer map" run={() => createCounterStore().getState()} />;
}

export function Example02() {
  return <ActionLab label="Load initial count" run={() => configureStore({
    reducer: counter.reducer, preloadedState: { value: 9, note: 'loaded' }
  }).getState()} />;
}

export function Example03() {
  return <ActionLab label="Run default thunk" run={() => {
    const store = createCounterStore();
    store.dispatch(dispatch => dispatch(counter.actions.add(8)));
    return store.getState().counter.value;
  }} />;
}

export function Example04() {
  return <ActionLab label="Run plain action" run={() => {
    const store = configureStore({ reducer: counter.reducer, middleware: defaults => defaults({ thunk: false }) });
    store.dispatch(counter.actions.increment());
    return store.getState().value;
  }} />;
}

export function Example05() {
  const connect = createAction('session/connect');
  return <ActionLab label="Initialize combined store" run={() => {
    const store = configureStore({ reducer: {
      counter: counter.reducer,
      online: (state = false, action) => connect.match(action) ? true : state
    } });
    store.dispatch(connect());
    return store.getState();
  }} />;
}
