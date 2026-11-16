export async function identity<T>(value: T): Promise<T> { return value; }
export const valid: Promise<number> = identity(3);
// @ts-expect-error -- The generic call inferred number, not string.
export const invalid: Promise<string> = identity(3);
