import { createAction } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';
import { counter } from './redux-store';

export function Example01() {
  return <ActionLab label="Build action" run={() => counter.actions.increment()} />;
}

export function Example02() {
  const add = createAction<number>('cart/add');
  return <ActionLab label="Check payload" run={() => {
    const action = add(3);
    return { matched: add.match(action), payload: action.payload };
  }} />;
}
