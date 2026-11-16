import { ActionLab } from './redux-local';
import { counter, createCounterStore } from './redux-store';

export function Example01() {
  return <ActionLab label="Test reducer" run={() => {
    const previous = { value: 2, note: '' };
    const result = counter.reducer(previous, counter.actions.add(4));
    return result.value === 6 && previous.value === 2 ? 'PASS: reducer transition' : 'FAIL: reducer transition';
  }} />;
}

export function Example02() {
  return <ActionLab label="Test store" run={() => {
    const store = createCounterStore();
    let observed = 0;
    const unsubscribe = store.subscribe(() => { observed = store.getState().counter.value; });
    store.dispatch(counter.actions.add(5));
    unsubscribe();
    return observed === 5 ? 'PASS: subscriber observed update' : 'FAIL: unexpected store value';
  }} />;
}
