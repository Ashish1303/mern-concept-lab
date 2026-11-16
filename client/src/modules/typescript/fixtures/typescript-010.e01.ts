export const valid: [name: string, score: number] = ['Ada', 5];
// @ts-expect-error -- Tuple positions have different types.
export const invalid: [string, number] = [5, 'Ada'];
