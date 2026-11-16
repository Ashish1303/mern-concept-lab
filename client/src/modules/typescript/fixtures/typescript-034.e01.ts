export interface User { name: string }
export const authored = { name: 'Ada' } satisfies User;
declare const external: unknown;
// @ts-expect-error -- The boundary value needs validation.
export const invalid: User = external;
export function isUser(value: unknown): value is User { return typeof value === 'object' && value !== null && 'name' in value && typeof value.name === 'string'; }
