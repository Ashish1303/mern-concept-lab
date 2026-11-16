export function convert(value: string): number;
export function convert(value: number): string;
export function convert(value: string | number) { return typeof value === 'string' ? Number(value) : String(value); }
export const valid: number = convert('3');
// @ts-expect-error -- No public overload accepts boolean.
export const invalid = convert(true);
