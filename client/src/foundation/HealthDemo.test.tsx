import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HealthDemo } from './HealthDemo';
import { fetchHealth } from '../services/health';
import type { HealthResponse } from '../services/health';

vi.mock('../services/health', () => ({ fetchHealth: vi.fn() }));
const response: HealthResponse = { ok: true, data: { service: 'MERN Concept Lab API', status: 'healthy', database: { status: 'not_checked' }, timestamp: '2026-11-08T00:00:00.000Z' }, requestId: 'from-server' };

afterEach(() => { vi.useRealTimers(); vi.mocked(fetchHealth).mockReset(); });

describe('health interaction lifecycle', () => {
  it('starts idle and shows only the received server result', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchHealth).mockResolvedValue(response);
    render(<HealthDemo />);
    expect(screen.getByRole('status')).toHaveTextContent('No request sent yet.');
    await user.click(screen.getByRole('button', { name: 'Check API connection' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('from-server'));
    expect(screen.getByRole('status')).toHaveTextContent('not_checked');
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByRole('status')).toHaveTextContent('No request sent yet.');
  });

  it('shows a rejection and recovers on the next request', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchHealth).mockRejectedValueOnce(new Error('HTTP 400: Invalid query.')).mockResolvedValueOnce(response);
    render(<HealthDemo />);
    await user.click(screen.getByRole('button', { name: 'Send invalid query' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('HTTP 400'));
    expect(vi.mocked(fetchHealth).mock.calls[0]?.[1]).toBe(true);
    await user.click(screen.getByRole('button', { name: 'Check API connection' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('from-server'));
  });

  it('cancels reset/unmount and ignores late responses', async () => {
    const user = userEvent.setup();
    let resolveRequest: ((value: HealthResponse) => void) | undefined;
    vi.mocked(fetchHealth).mockImplementation(() => new Promise((resolve) => { resolveRequest = resolve; }));
    const view = render(<HealthDemo />);
    await user.click(screen.getByRole('button', { name: 'Check API connection' }));
    const signal = vi.mocked(fetchHealth).mock.calls[0]?.[0];
    expect(screen.getByRole('button', { name: 'Check API connection' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(signal?.aborted).toBe(true);
    await act(async () => { resolveRequest?.(response); });
    expect(screen.getByRole('status')).toHaveTextContent('No request sent yet.');
    await user.click(screen.getByRole('button', { name: 'Check API connection' }));
    const secondSignal = vi.mocked(fetchHealth).mock.calls[1]?.[0];
    view.unmount();
    expect(secondSignal?.aborted).toBe(true);
    await act(async () => { resolveRequest?.(response); });
  });

  it('times out and displays the cancellation outcome', async () => {
    vi.useFakeTimers();
    vi.mocked(fetchHealth).mockImplementation((signal) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
    }));
    render(<HealthDemo />);
    fireEvent.click(screen.getByRole('button', { name: 'Check API connection' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(8000); });
    expect(screen.getByRole('status')).toHaveTextContent('Request timed out or was cancelled.');
    expect(screen.getByRole('button', { name: 'Check API connection' })).toBeEnabled();
  });
});
