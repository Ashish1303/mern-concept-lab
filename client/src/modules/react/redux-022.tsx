import { configureStore, isAction } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';
import { counter } from './redux-store';

export function Example01() {
  return <ActionLab label="Dispatch in named store" run={() => {
    const store = configureStore({ reducer: counter.reducer, devTools: { name: 'Concept Lab counter' } });
    const action = store.dispatch(counter.actions.increment());
    return { action, state: store.getState() };
  }} />;
}

export function Example02() {
  return <ActionLab label="Record action timeline" run={() => {
    const timeline: unknown[] = [];
    const record: Middleware = api => next => action => {
      const result = next(action);
      if (isAction(action)) timeline.push({ type: action.type, state: api.getState() });
      return result;
    };
    const store = configureStore({
      reducer: counter.reducer,
      devTools: { name: 'Concept Lab timeline', maxAge: 10 },
      middleware: defaults => defaults().concat(record)
    });
    store.dispatch(counter.actions.add(3));
    store.dispatch(counter.actions.reset());
    return timeline;
  }} />;
}
