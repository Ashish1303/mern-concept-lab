import { configureStore, createAction, createSlice } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';
import { counter } from './redux-store';

const signedOut = createAction('session/signedOut');
const session = createSlice({
  name: 'session', initialState: { user: 'Ada' },
  reducers: {},
  extraReducers: builder => builder.addCase(signedOut, state => { state.user = ''; })
});
const preferences = createSlice({
  name: 'preferences', initialState: { density: 'compact' },
  reducers: {},
  extraReducers: builder => builder.addCase(signedOut, state => { state.density = 'comfortable'; })
});

export function Example01() {
  return <ActionLab label="Increment only" run={() => {
    const store = configureStore({ reducer: { counter: counter.reducer, session: session.reducer } });
    store.dispatch(counter.actions.increment());
    return store.getState();
  }} />;
}

export function Example02() {
  return <ActionLab label="Dispatch sign-out" run={() => {
    const store = configureStore({ reducer: { session: session.reducer, preferences: preferences.reducer } });
    store.dispatch(signedOut());
    return store.getState();
  }} />;
}
