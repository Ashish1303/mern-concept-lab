export interface User { name: string }
declare const value: unknown;
export const unchecked = value as User;
export function assertUser(item: unknown): asserts item is User { if (typeof item !== 'object' || item === null || !('name' in item) || typeof item.name !== 'string') throw new Error('Invalid user'); }
// @ts-expect-error -- Unknown cannot be directly assigned to the trusted shape.
export const invalid: User = value;
