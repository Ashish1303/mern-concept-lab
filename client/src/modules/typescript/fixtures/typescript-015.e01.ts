export function lengthOf<T extends { length: number }>(value: T) { return value.length; }
export const valid = lengthOf('MERN');
// @ts-expect-error -- Numbers do not satisfy a length-bearing contract.
export const invalid = lengthOf(3);
