export const defaults = { retries: 3, mode: 'safe' };
export type Config = typeof defaults;
export const valid: Config = { retries: 2, mode: 'fast' };
// @ts-expect-error -- The inferred retries field is numeric.
export const invalid: Config = { retries: '2', mode: 'safe' };
