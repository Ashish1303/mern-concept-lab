export async function load(): Promise<number> { return 3; }
export const valid: Awaited<ReturnType<typeof load>> = 3;
// @ts-expect-error -- Fulfillment values do not match.
export const invalid: Promise<number> = Promise.resolve('3');
