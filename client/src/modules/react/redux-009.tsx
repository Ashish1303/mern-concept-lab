import { ActionLab } from './redux-local';

export function Example01() {
  return <ActionLab label="Rename immutably" run={() => {
    const before = { profile: { name: 'Original' }, preferences: { theme: 'dark' } };
    const next = { ...before, profile: { ...before.profile, name: 'Updated' } };
    return { before, next, sharesPreferences: before.preferences === next.preferences };
  }} />;
}

export function Example02() {
  return <ActionLab label="Toggle row" run={() => {
    const previous = [{ id: 1, done: false }, { id: 2, done: false }];
    const next = previous.map(row => row.id === 1 ? { ...row, done: true } : row);
    return { next, sameUntouched: next[1] === previous[1] };
  }} />;
}
