import { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Result } from './LabWidgets';
import { ActionLab } from './redux-local';
import { selectProducts } from './redux-store';

const filters = createSlice({
  name: 'filters', initialState: { category: '' },
  reducers: { category(state, action: PayloadAction<string>) { state.category = action.payload; } }
});
function ProductFilters() {
  const matches = useSelector(selectProducts);
  const dispatch = useDispatch();
  return <><button onClick={() => dispatch(filters.actions.category('stationery'))}>Show stationery</button>
    <button onClick={() => dispatch(filters.actions.category('home'))}>Show home products</button>
    <button onClick={() => dispatch(filters.actions.category(''))}>Show all products</button>
    <Result value={matches.map(product => product.name)} /></>;
}

export function Example01() {
  return <ActionLab label="Compare result identity" run={() => {
    const before = selectProducts({ category: 'home' });
    const after = selectProducts({ category: 'home' });
    return { sameResult: before === after, names: after.map(product => product.name) };
  }} />;
}

export function Example02() {
  return <ActionLab label="Compare categories" run={() => {
    const home = selectProducts({ category: 'home' });
    const stationery = selectProducts({ category: 'stationery' });
    return { changed: home !== stationery, names: stationery.map(product => product.name) };
  }} />;
}

export function Example03() {
  const [store] = useState(() => configureStore({ reducer: filters.reducer }));
  return <Provider store={store}><ProductFilters /></Provider>;
}
