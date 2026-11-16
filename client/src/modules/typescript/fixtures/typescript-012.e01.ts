export function double(value: number): number { return value * 2; }
export const valid = double(3);
// @ts-expect-error -- The function accepts a number, not numeric text.
export const invalid = double('3');
