export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };
export function valid(result: ApiResult<{ name: string }>) { return result.ok ? result.data.name : result.error; }
export function invalid(result: ApiResult<{ name: string }>) {
 // @ts-expect-error -- Error results do not carry success data.
 return result.data;
}
