import { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Result } from './LabWidgets';
import { ActionLab, CounterControls, CounterProvider } from './redux-local';
import { counter, inventory } from './redux-store';

const cart = createSlice({
  name: 'cart', initialState: [] as number[],
  reducers: { add(state, action: PayloadAction<number>) { state.push(action.payload); }, empty() { return []; } }
});
const todos = createSlice({
  name: 'todos', initialState: [{ id: 1, title: 'Read Redux', done: false }],
  reducers: {
    add(state, action: PayloadAction<string>) { state.push({ id: state.length + 1, title: action.payload, done: false }); },
    toggle(state, action: PayloadAction<number>) {
      const todo = state.find(item => item.id === action.payload);
      if (todo) todo.done = !todo.done;
    }
  }
});
function Cart() {
  const ids = useSelector((state: { cart: number[] }) => state.cart);
  const dispatch = useDispatch();
  const total = ids.reduce((sum, id) => sum + (inventory.find(item => item.id === id)?.price ?? 0), 0);
  return <><button onClick={() => dispatch(cart.actions.add(1))}>Add pencil</button>
    <button onClick={() => dispatch(cart.actions.add(3))}>Add mug</button>
    <button onClick={() => dispatch(cart.actions.empty())}>Empty cart</button><Result value={{ items: ids.length, total }} /></>;
}
function Todos() {
  const items = useSelector((state: { todos: ReturnType<typeof todos.getInitialState> }) => state.todos);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  return <><form onSubmit={event => {
    event.preventDefault();
    if (!title.trim()) return;
    dispatch(todos.actions.add(title.trim())); setTitle('');
  }}><label>Todo title <input value={title} onChange={event => setTitle(event.target.value)} /></label><button>Add todo</button></form>
    {items.map(item => <label key={item.id}><input type="checkbox" checked={item.done} onChange={() => dispatch(todos.actions.toggle(item.id))} />{item.title}</label>)}
    <Result value={items} /></>;
}

export function Example01() {
  return <ActionLab label="Inspect slice action" run={() => counter.actions.add(2)} />;
}

export function Example02() {
  return <ActionLab label="Update slice" run={() => counter.reducer(counter.getInitialState(), counter.actions.add(3)).value} />;
}

export function Example03() {
  return <ActionLab label="Reset slice" run={() => counter.reducer({ value: 11, note: 'clear me' }, counter.actions.reset())} />;
}

export function Example04() {
  return <ActionLab label="Read prefix" run={() => counter.actions.note.type} />;
}

export function Example05() {
  return <CounterProvider><CounterControls amount={9} /></CounterProvider>;
}

export function Example06() {
  const [store] = useState(() => configureStore({ reducer: { cart: cart.reducer } }));
  return <Provider store={store}><Cart /></Provider>;
}

export function Example07() {
  const [store] = useState(() => configureStore({ reducer: { todos: todos.reducer } }));
  return <Provider store={store}><Todos /></Provider>;
}
