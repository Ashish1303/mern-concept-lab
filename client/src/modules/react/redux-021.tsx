import { configureStore, createListenerMiddleware, isAction } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';
import { counter } from './redux-store';

export function Example01() {
  return <ActionLab label="Observe middleware" run={() => {
    const seen: unknown[] = [];
    const log: Middleware<object, ReturnType<typeof counter.getInitialState>> = api => next => action => {
      const before = api.getState().value;
      const result = next(action);
      if (isAction(action)) seen.push({ type: action.type, before, after: api.getState().value });
      return result;
    };
    const store = configureStore({ reducer: counter.reducer, middleware: defaults => defaults().concat(log) });
    store.dispatch(counter.actions.increment());
    return seen;
  }} />;
}

export function Example02() {
  return <ActionLab label="Reject negative amount" run={() => {
    const guard: Middleware = () => next => action => counter.actions.add.match(action) && action.payload < 0 ? undefined : next(action);
    const store = configureStore({ reducer: counter.reducer, middleware: defaults => defaults().concat(guard) });
    store.dispatch(counter.actions.add(-4));
    return store.getState().value;
  }} />;
}

export function Example03() {
  return <ActionLab label="Run listener" run={() => {
    const listener = createListenerMiddleware();
    const seen: string[] = [];
    const stop = listener.startListening({ actionCreator: counter.actions.increment, effect: () => { seen.push('observed increment'); } });
    const store = configureStore({ reducer: counter.reducer, middleware: defaults => defaults().prepend(listener.middleware) });
    store.dispatch(counter.actions.increment());
    stop();
    return seen;
  }} />;
}

export function Example04() {
  return <ActionLab label="Inspect chain order" run={() => {
    const order: string[] = [];
    const layer = (name: string): Middleware => () => next => action => {
      order.push(name + ' before');
      const result = next(action);
      order.push(name + ' after');
      return result;
    };
    const store = configureStore({ reducer: counter.reducer, middleware: defaults => defaults().concat(layer('outer'), layer('inner')) });
    store.dispatch(counter.actions.increment());
    return order;
  }} />;
}

export function Example05() {
  return <ActionLab label="Read dispatch result" run={() => {
    const passthrough: Middleware = () => next => action => next(action);
    const store = configureStore({ reducer: counter.reducer, middleware: defaults => defaults().concat(passthrough) });
    return store.dispatch(counter.actions.add(5));
  }} />;
}
