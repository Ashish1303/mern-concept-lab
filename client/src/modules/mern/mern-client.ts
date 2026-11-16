import type { LabRequest } from '../react/lab-context';

export const base = '/api/v1/lab/mern/workspaces';
export const samplePassword = 'lab-reader-sample';
export const json = (method: string, body: unknown): RequestInit => ({
  method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body)
});

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}
export async function call<T>(request: LabRequest, path: string, init?: RequestInit): Promise<T> {
  const response = await request(path, init);
  if (response.status === 204 || response.status === 202) return undefined as T;
  const body = await response.json() as { data: T; error?: { message: string } };
  if (!response.ok) throw new ApiError(response.status, body.error?.message ?? 'HTTP ' + response.status);
  return body.data;
}
export function message(error: unknown) {
  return error instanceof ApiError ? error.status + ' ' + error.message :
    error instanceof Error ? error.message : 'The request failed.';
}
export interface Item { _id: string; title: string; category: string }
export interface ItemList { rows: Item[]; page: number; pageSize: number; total: number }
export interface Session { access: string; refresh: string; role: 'reader' | 'editor' }
export const withAccess = (token: string): RequestInit => ({ headers: { authorization: 'Bearer ' + token } });
