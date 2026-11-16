import { configureStore, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const counter = createSlice({
  name: 'counter',
  initialState: { value: 0, note: '' },
  reducers: {
    increment(state) { state.value += 1; },
    add(state, action: PayloadAction<number>) { state.value += action.payload; },
    reset() { return { value: 0, note: '' }; },
    note(state, action: PayloadAction<string>) { state.note = action.payload; }
  }
});

export function createCounterStore() {
  return configureStore({ reducer: { counter: counter.reducer } });
}
export type CounterStore = ReturnType<typeof createCounterStore>;
export type CounterState = ReturnType<CounterStore['getState']>;
export const useCounterDispatch = useDispatch.withTypes<CounterStore['dispatch']>();
export const useCounterSelector = useSelector.withTypes<CounterState>();
export const selectValue = (state: CounterState) => state.counter.value;

export const inventory = [
  { id: 1, name: 'Pencil', category: 'stationery', price: 2 },
  { id: 2, name: 'Notebook', category: 'stationery', price: 5 },
  { id: 3, name: 'Mug', category: 'home', price: 8 }
];

export const selectProducts = createSelector(
  [(state: { category: string }) => state.category, () => inventory],
  (category, products) => products.filter(product => !category || product.category === category)
);
