/* eslint-disable @typescript-eslint/no-explicit-any -- This compile-only fixture compares any with unknown. */
declare const unchecked: any;
export const acceptedUnchecked = unchecked.missing.method();
export function valid(value: unknown) { return typeof value === 'string' ? value.toUpperCase() : 'invalid'; }
export function unreachable(value: never): never { throw new Error(String(value)); }
export function invalid(value: unknown) {
 // @ts-expect-error -- Unknown blocks unchecked property access.
 return value.name;
}
