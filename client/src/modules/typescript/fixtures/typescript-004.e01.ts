export type Identifier = string | number;
export const valid: Identifier = 'user-1';
// @ts-expect-error -- Boolean is outside the alias union.
export const invalid: Identifier = true;
