import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useDebugValue } from 'react';
import { useDebugCounter, useFormattedDebugCounter, formatDebugCounter } from './custom-hooks';

vi.mock('react', async importOriginal => {
  const actual = await importOriginal<typeof import('react')>();
  return { ...actual, useDebugValue: vi.fn(actual.useDebugValue) };
});
function Probe({ formatted }: { formatted: boolean }) {
  // Separate components keep each custom Hook call unconditional.
  return formatted ? <Formatted /> : <Plain />;
}
function Plain() { const result = useDebugCounter(); return <button onClick={result.increment}>{result.count}</button>; }
function Formatted() { const result = useFormattedDebugCounter(); return <button onClick={result.increment}>{result.count}</button>; }

describe('actual useDebugValue registrations (DevTools presentation is external)', () => {
  it('registers changing primitive state with the real API', async () => {
    render(<Probe formatted={false} />);
    expect(useDebugValue).toHaveBeenLastCalledWith(0);
    await userEvent.click(screen.getByRole('button', { name: '0' }));
    expect(useDebugValue).toHaveBeenLastCalledWith(1);
  });
  it('passes the deferred formatter and verifies its contract', () => {
    render(<Probe formatted />);
    expect(useDebugValue).toHaveBeenLastCalledWith({ count: 0 }, formatDebugCounter);
    expect(formatDebugCounter({ count: 3 })).toBe('Bounded count: 3');
  });
});
