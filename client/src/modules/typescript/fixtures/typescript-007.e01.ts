export type Status = 'idle' | 'ready';
export const valid: Status = 'ready';
// @ts-expect-error -- The misspelled state is outside the union.
export const invalid: Status = 'raedy';
