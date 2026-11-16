import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchHealth } from './health';

afterEach(() => { vi.unstubAllGlobals(); });
const success = { ok: true, data: { service: 'MERN Concept Lab API', status: 'healthy', database: { status: 'not_checked' }, timestamp: '2026-11-08T00:00:00.000Z' }, requestId: 'test-request' };

describe('health client contract', () => {
  it('sends the fixed endpoint with a cancellation signal', async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json(success));
    vi.stubGlobal('fetch', fetch);
    const controller = new AbortController();
    expect(await fetchHealth(controller.signal)).toEqual(success);
    expect(fetch).toHaveBeenCalledWith('/api/v1/health', { signal: controller.signal, cache: 'no-store' });
  });

  it('shows real HTTP status and the public error message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ ok: false, error: { message: 'Invalid query.' } }, { status: 400 })));
    await expect(fetchHealth(new AbortController().signal, true)).rejects.toThrow('HTTP 400: Invalid query.');
  });

  it.each([{ ok: true }, { ...success, data: { ...success.data, database: { status: 'connected' } } }])('rejects an incompatible success response', async (body) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json(body)));
    await expect(fetchHealth(new AbortController().signal)).rejects.toThrow('does not match');
  });

  it('reports non-JSON and network failures without inventing success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('<html>wrong server</html>')));
    await expect(fetchHealth(new AbortController().signal)).rejects.toThrow('unreadable response');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(fetchHealth(new AbortController().signal)).rejects.toThrow('Failed to fetch');
  });
});
