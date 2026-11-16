import { configureStore } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';
import { counter } from './redux-store';

const key = 'concept-lab.redux.counter';
function restore(value: string | null) {
  try {
    const record: unknown = JSON.parse(value ?? 'null');
    if (record && typeof record === 'object' && 'value' in record && Number.isSafeInteger(record.value)) {
      return { value: record.value as number, note: '' };
    }
  } catch { /* Ignore invalid saved data. */ }
  return counter.getInitialState();
}

export function Example01() {
  return <ActionLab label="Restore saved count" run={() => {
    const store = configureStore({ reducer: counter.reducer });
    store.dispatch(counter.actions.add(6));
    const saved = JSON.stringify({ value: store.getState().value });
    try {
      sessionStorage.setItem(key, saved);
      return { ...restore(sessionStorage.getItem(key)), medium: 'sessionStorage' };
    } catch {
      return { ...restore(saved), medium: 'in-memory snapshot' };
    } finally {
      try { sessionStorage.removeItem(key); } catch { /* Storage may be unavailable in the preview. */ }
    }
  }} />;
}

export function Example02() {
  return <ActionLab label="Restore invalid snapshot" run={() => configureStore({
    reducer: counter.reducer, preloadedState: restore('{"value":"not a number"}')
  }).getState()} />;
}
