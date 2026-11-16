export function get<T, K extends keyof T>(value: T, key: K): T[K] { return value[key]; }
export const valid = get({ name: 'Ada' }, 'name');
// @ts-expect-error -- The object has no property with this spelling.
export const invalid = get({ name: 'Ada' }, 'nmae');
