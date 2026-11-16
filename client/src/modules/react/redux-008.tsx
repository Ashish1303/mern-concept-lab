import { ActionLab, CounterControls, CounterProvider, CounterSnapshot } from './redux-local';
import { counter, createCounterStore, inventory } from './redux-store';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export function Example01() {
  return <ActionLab label="Trace action" run={() => {
    const store = createCounterStore();
    const before = store.getState();
    const action = store.dispatch(counter.actions.add(2));
    return { before, action, after: store.getState() };
  }} />;
}

export function Example02() {
  return <ActionLab label="Notify subscriber" run={() => {
    const store = createCounterStore();
    let observed = 0;
    const unsubscribe = store.subscribe(() => { observed = store.getState().counter.value; });
    store.dispatch(counter.actions.increment());
    unsubscribe();
    store.dispatch(counter.actions.increment());
    return { observed, current: store.getState().counter.value };
  }} />;
}

export function Example03() {
  const cart = createSlice({
    name: 'cart', initialState: [] as number[],
    reducers: { add(state, action: PayloadAction<number>) { state.push(action.payload); } }
  });
  return <ActionLab label="Add two cart items" run={() => {
    const store = configureStore({ reducer: cart.reducer });
    store.dispatch(cart.actions.add(1));
    store.dispatch(cart.actions.add(2));
    const total = store.getState().reduce((sum, id) => sum + (inventory.find(item => item.id === id)?.price ?? 0), 0);
    return { ids: store.getState(), total };
  }} />;
}

export function Example04() {
  return <CounterProvider><CounterControls amount={7} /></CounterProvider>;
}

export function Example05() {
  return <ActionLab label="Update one store" run={() => {
    const first = createCounterStore();
    const second = createCounterStore();
    first.dispatch(counter.actions.increment());
    return { first: first.getState().counter.value, second: second.getState().counter.value };
  }} />;
}

export function Example06() {
  return <CounterSnapshot />;
}
