export interface HealthResponse {
  ok: true;
  data: {
    service: string;
    status: 'healthy';
    database: { status: 'not_checked' };
    timestamp: string;
  };
  requestId: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function fetchHealth(signal: AbortSignal, invalidQuery = false): Promise<HealthResponse> {
  const response = await fetch(`/api/v1/health${invalidQuery ? '?unexpected=1' : ''}`, { signal, cache: 'no-store' });
  let body: unknown;
  try { body = await response.json(); } catch { throw new Error('The API returned an unreadable response. Check that the Express server is running.'); }
  if (!response.ok) {
    const message = isRecord(body) && isRecord(body.error) && typeof body.error.message === 'string' ? body.error.message : 'The API request failed.';
    throw new Error(`HTTP ${response.status}: ${message}`);
  }
  if (!isRecord(body) || body.ok !== true || typeof body.requestId !== 'string' || !isRecord(body.data) || body.data.status !== 'healthy' || typeof body.data.service !== 'string' || typeof body.data.timestamp !== 'string' || !isRecord(body.data.database) || body.data.database.status !== 'not_checked') {
    throw new Error('The API response does not match the health contract.');
  }
  return body as unknown as HealthResponse;
}
