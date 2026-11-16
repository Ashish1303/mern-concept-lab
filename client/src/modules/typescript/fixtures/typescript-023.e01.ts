export function valid(value: string | number) { if (typeof value === 'string') return value.toUpperCase(); return value.toFixed(1); }
export function invalid(value: string | number) {
 // @ts-expect-error -- A number may reach this path.
 return value.toUpperCase();
}
