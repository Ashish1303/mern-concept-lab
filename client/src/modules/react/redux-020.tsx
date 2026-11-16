import { createEntityAdapter, createSlice, configureStore } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';

const adapter = createEntityAdapter({ selectId: (task: { id: number; title: string }) => task.id, sortComparer: (left, right) => left.title.localeCompare(right.title) });
const tasks = createSlice({
  name: 'tasks', initialState: adapter.getInitialState(),
  reducers: { loaded: adapter.setAll, updated: adapter.updateOne }
});
const seed = [{ id: 2, title: 'Write' }, { id: 1, title: 'Read' }];

export function Example01() {
  return <ActionLab label="Load normalized tasks" run={() => tasks.reducer(undefined, tasks.actions.loaded(seed))} />;
}

export function Example02() {
  return <ActionLab label="Rename task by ID" run={() => {
    const store = configureStore({ reducer: tasks.reducer });
    store.dispatch(tasks.actions.loaded(seed));
    store.dispatch(tasks.actions.updated({ id: 2, changes: { title: 'Archive' } }));
    return adapter.getSelectors().selectAll(store.getState());
  }} />;
}
