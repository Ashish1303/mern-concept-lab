import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../app/App';
import { LearningRunner } from './LearningRunner';
import type { RuntimeExample } from './lesson-types';

afterEach(() => { vi.useRealTimers(); });

describe('Phase 2 lesson UI', () => {
  it('runs changed inputs, exposes real source and restores a selected example', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/learn/javascript/javascript-045?example=javascript-045.e01']}><App /></MemoryRouter>);
    await screen.findByRole('heading', { level: 1, name: 'reduce' });
    const input = screen.getByRole('textbox', { name: 'Number array' });
    await user.clear(input); await user.paste('[4,5]');
    await user.click(screen.getByRole('button', { name: 'Run example' }));
    expect(screen.getAllByRole('status').some(region => region.textContent === '9')).toBe(true);
    await user.click(screen.getByText('modules/javascript/javascript-045.ts', { exact: true }));
    expect(screen.getByLabelText('Implementation source')).toHaveTextContent('reduce((sum, value) => sum + value, 0)');
    await user.click(screen.getByRole('link', { name: /Empty reduction error and identity fix/ }));
    expect(await screen.findByRole('heading', { level: 2, name: 'Empty reduction error and identity fix' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Run example' }));
    expect(screen.getByRole('region', { name: 'Live demonstration' })).toHaveTextContent('TypeError');
  });

  it('shows actual compiler evidence distinctly from runtime execution', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/learn/typescript/typescript-014']}><App /></MemoryRouter>);
    await screen.findByRole('heading', { level: 1, name: 'Generics' });
    expect(screen.getByText(/Use the editable snippet above to run a new type check/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show compiler verification' }));
    const live = screen.getByRole('region', { name: 'Live demonstration' });
    expect(live).toHaveTextContent('negativeDiagnostics'); expect(live).toHaveTextContent('2322'); expect(live).toHaveTextContent('sourceSHA256');
    expect(screen.queryByRole('button', { name: 'Run example' })).not.toBeInTheDocument();
  });

  it('rejects malformed input through the real runtime parser', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/learn/javascript/javascript-100']}><App /></MemoryRouter>);
    await screen.findByRole('heading', { level: 1, name: 'Two Sum' });
    const input = screen.getByRole('textbox', { name: 'Number array, target 9' });
    await user.clear(input); await user.paste('[1,"bad"]');
    await user.click(screen.getByRole('button', { name: 'Run example' }));
    expect(screen.getByRole('region', { name: 'Live demonstration' })).toHaveTextContent('at most 30 finite numbers');
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(input).toHaveValue('[2,7,11,15]');
  });
});

describe('runner ownership', () => {
  it('does not publish a stale completion after reset', async () => {
    const user = userEvent.setup(); let complete: ((value: unknown) => void) | undefined;
    const example: RuntimeExample = { id: 'ownership', title: 'Ownership', explanation: 'A controlled completion.', expected: 1, runtime: 'browser', run: () => new Promise(resolve => { complete = resolve; }) };
    render(<LearningRunner example={example} />);
    await user.click(screen.getByRole('button', { name: 'Run example' }));
    await user.click(screen.getByRole('button', { name: 'Cancel and reset' }));
    await act(async () => { complete?.('obsolete'); });
    expect(screen.getByRole('status')).toHaveTextContent('Reset.');
    expect(screen.getByRole('status')).not.toHaveTextContent('obsolete');
  });

  it('cancels a bounded run at its deadline', async () => {
    vi.useFakeTimers();
    const example: RuntimeExample = { id: 'deadline', title: 'Deadline', explanation: 'An operation that never completes.', expected: null, runtime: 'browser', run: () => new Promise(() => {}) };
    render(<LearningRunner example={example} />);
    fireEvent.click(screen.getByRole('button', { name: 'Run example' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(3000); });
    expect(screen.getByRole('status')).toHaveTextContent('3-second limit');
    expect(screen.getByRole('button', { name: 'Run example' })).toBeEnabled();
  });
});
