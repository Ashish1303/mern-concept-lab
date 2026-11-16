export interface User { id: number; name: string; note?: string }
export const patch: Partial<User> = { name: 'Grace' };
export const selected: Pick<User, 'name'> = { name: 'Ada' };
export const withoutId: Omit<User, 'id'> = { name: 'Ada' };
export const required: Required<User> = { id: 1, name: 'Ada', note: '' };
export const indexed: Record<string, number> = { total: 2 };
export type NotNull = NonNullable<string | null>;
export type Kept = Extract<'a' | 'b', 'a'>;
export type Removed = Exclude<'a' | 'b', 'a'>;
export function sum(a: number, b: number) { return a + b; }
export const args: Parameters<typeof sum> = [1, 2];
export const result: ReturnType<typeof sum> = sum(...args);
// @ts-expect-error -- Pick selected only the name property.
export const invalid = selected.id;
