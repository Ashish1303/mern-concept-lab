import { useLayoutEffect, useState, useSyncExternalStore } from 'react';
import { Provider } from 'react-redux';
import { counter, createCounterStore, selectValue, useCounterDispatch, useCounterSelector } from './redux-store';
import type { ReactNode } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';

export function ActionLab({ label, run }: { label: string; run: () => unknown }) {
  const [result, setResult] = useState<unknown>('Ready');
  return <><button onClick={() => setResult(run())}>{label}</button><Result value={result} /></>;
}

export function CounterProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createCounterStore);
  return <Provider store={store}>{children}</Provider>;
}

export function CounterSnapshot() {
  const [store] = useState(createCounterStore);
  const snapshot = useSyncExternalStore(store.subscribe, store.getState);
  return <><button onClick={() => store.dispatch(counter.actions.increment())}>Dispatch increment</button><Result value={snapshot.counter} /></>;
}

export function CounterControls({ amount = 1 }: { amount?: number }) {
  const value = useCounterSelector(selectValue);
  const dispatch = useCounterDispatch();
  return <><button onClick={() => dispatch(counter.actions.add(amount))}>Add {amount}</button><Result value={value} /></>;
}

export function SelectionProbe() {
  const value = useCounterSelector(selectValue);
  const dispatch = useCounterDispatch();
  const { trace } = useLab();
  useLayoutEffect(() => { trace.emit('counter view committed', value); });
  return <><button onClick={() => dispatch(counter.actions.note('unrelated'))}>Update note</button>
    <button onClick={() => dispatch(counter.actions.increment())}>Update count</button><Result value={value} /></>;
}

