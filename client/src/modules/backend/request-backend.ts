import type { LabRequest } from '../react/lab-context';

export async function requestBackend(request: LabRequest, id: string, input: string) {
  const category = id.split('-')[0];
  const response = await request('/api/v1/lab/' + category + '/' + id, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input })
  });
  const body = await response.json() as { data?: unknown; error?: { message: string } };
  if (!response.ok) throw new Error(body.error?.message ?? 'HTTP ' + response.status);
  return body.data;
}
