export type ElementOf<T> = T extends readonly (infer Item)[] ? Item : T;
export const valid: ElementOf<number[]> = 3;
// @ts-expect-error -- The extracted element type is number.
export const invalid: ElementOf<number[]> = '3';
