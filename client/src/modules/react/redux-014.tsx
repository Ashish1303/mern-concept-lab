import { createAction } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';
import { counter } from './redux-store';

export function Example01() {
  return <ActionLab label="Inspect amount" run={() => counter.actions.add(12)} />;
}

export function Example02() {
  const add = createAction('tasks/add', (title: string) => ({ payload: { title: title.trim() }, meta: { source: 'lab' } }));
  return <ActionLab label="Prepare title" run={() => add('  Write tests  ')} />;
}
