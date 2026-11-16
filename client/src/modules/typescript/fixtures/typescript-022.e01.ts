export interface User { name: string }
export function isUser(value: unknown): value is User { return typeof value === 'object' && value !== null && 'name' in value && typeof value.name === 'string'; }
export function valid(value: unknown) { return isUser(value) ? value.name.toUpperCase() : 'invalid'; }
export function invalid(value: unknown) {
 // @ts-expect-error -- Unknown data has not been narrowed.
 return value.name;
}
