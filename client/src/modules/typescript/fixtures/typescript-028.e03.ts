export async function guarded() { try { await Promise.reject(new Error('offline')); } catch (error) { return error instanceof Error ? error.message : 'unknown'; } }
export function invalid(error: unknown) {
 // @ts-expect-error -- Unknown reasons need narrowing.
 return error.message;
}
