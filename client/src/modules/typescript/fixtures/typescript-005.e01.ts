export function valid(value: string | number) { return typeof value === 'string' ? value.toUpperCase() : value.toFixed(1); }
export function invalid(value: string | number) {
 // @ts-expect-error -- Number has no toUpperCase method.
 return value.toUpperCase();
}
