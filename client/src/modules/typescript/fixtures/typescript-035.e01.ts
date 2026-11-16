export const values: number[] = [];
export const valid: number | undefined = values[0];
// @ts-expect-error -- noUncheckedIndexedAccess includes undefined.
export const invalid: number = values[0];
