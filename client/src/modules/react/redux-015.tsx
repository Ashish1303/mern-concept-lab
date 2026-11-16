import { createReducer, createAction } from '@reduxjs/toolkit';
import { ActionLab } from './redux-local';

const rename = createAction<string>('profile/rename');
const initial = { profile: { name: 'Ada' }, settings: { density: 'compact' } };
const reducer = createReducer(initial, builder => builder.addCase(rename, (draft, action) => { draft.profile.name = action.payload; }));

export function Example01() {
  return <ActionLab label="Rename draft" run={() => ({ before: initial, after: reducer(initial, rename('Grace')) })} />;
}

export function Example02() {
  return <ActionLab label="Compare branch identity" run={() => {
    const updated = reducer(initial, rename('Linus'));
    return { sameSettings: updated.settings === initial.settings, newProfile: updated.profile !== initial.profile };
  }} />;
}
