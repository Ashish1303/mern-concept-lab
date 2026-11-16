export function identity<T>(value: T): T { return value; }
export const valid: number = identity(3);
// @ts-expect-error -- The inferred return value is numeric.
export const invalid: string = identity(3);
