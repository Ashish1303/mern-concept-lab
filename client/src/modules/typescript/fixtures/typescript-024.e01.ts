export type State = { kind: 'loading' } | { kind: 'ready'; value: string } | { kind: 'error'; message: string };
export function valid(state: State) { switch (state.kind) { case 'loading': return 'waiting'; case 'ready': return state.value; case 'error': return state.message; default: return assertNever(state); } }
function assertNever(value: never): never { throw new Error(String(value)); }
export function invalid(state: State) {
 // @ts-expect-error -- Not every union member has value.
 return state.value;
}
