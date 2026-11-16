export const combined = Promise.all([Promise.resolve(1), Promise.resolve('Ada')] as const);
export type Result = Awaited<typeof combined>;
export const valid: Result = [1, 'Ada'];
// @ts-expect-error -- Tuple positions preserve their individual fulfillment types.
export const invalid: Result = ['Ada', 1];
