import { createContext, useContext, useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Result } from './LabWidgets';

const Density = createContext('Comfortable');
function Toolbar() { return <Result value={useContext(Density)} />; }
export function Example01() {
  const [compact, setCompact] = useState(false);
  return <Density value={compact ? 'Compact' : 'Comfortable'}><button onClick={() => setCompact(!compact)}>Toggle density</button><Toolbar /></Density>;
}
const cart = createSlice({
  name: 'cart',
  initialState: { quantity: 0 },
  reducers: { add(state) { state.quantity += 1; } }
});
function Cart() {
  const quantity = useSelector((state: { cart: { quantity: number } }) => state.cart.quantity);
  const dispatch = useDispatch();
  return <><button onClick={() => dispatch(cart.actions.add())}>Dispatch cart/add</button><Result value={{ quantity }} /></>;
}
export function Example02() {
  const [store] = useState(() => configureStore({ reducer: { cart: cart.reducer } }));
  return <Provider store={store}><Cart /></Provider>;
}
