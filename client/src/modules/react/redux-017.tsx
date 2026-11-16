import { configureStore, createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';

const reset = createAction('workspace/reset');
const archive = createAction('workspace/archive');
const journal = createSlice({
  name: 'journal', initialState: { entries: 3, events: 0 },
  reducers: {},
  extraReducers: builder => builder
    .addCase(reset, state => { state.entries = 0; })
    .addMatcher(isAnyOf(reset, archive), state => { state.events += 1; })
});

export function Example01() {
  return <ActionLab label="Reset workspace" run={() => journal.reducer(undefined, reset())} />;
}

export function Example02() {
  return <ActionLab label="Count workspace actions" run={() => {
    const store = configureStore({ reducer: journal.reducer });
    store.dispatch(reset());
    store.dispatch(archive());
    return store.getState();
  }} />;
}
