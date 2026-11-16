export type Flags<T> = { [K in keyof T]: boolean };
export interface User { name: string; score: number }
export const valid: Flags<User> = { name: true, score: false };
// @ts-expect-error -- All mapped values are boolean.
export const invalid: Flags<User> = { name: 'yes', score: false };
