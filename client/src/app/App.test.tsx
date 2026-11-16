import { StrictMode } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate, useLocation } from 'react-router';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { foundationExamples } from '../foundation/definitions';

function HistoryControls() {
  const navigate = useNavigate();
  const location = useLocation();
  return <><button onClick={() => void navigate(-1)}>Test back</button><button onClick={() => void navigate(1)}>Test forward</button><output data-testid="url">{location.pathname}{location.search}</output></>;
}

function open(path = '/foundation') {
  return render(<StrictMode><MemoryRouter initialEntries={[path]}><App /><HistoryControls /></MemoryRouter></StrictMode>);
}

describe('foundation and topic navigation', () => {
  it('runs and resets the real interaction and shows the exact source', async () => {
    const user = userEvent.setup();
    open();
    await user.click(screen.getByRole('button', { name: 'Record a click' }));
    await user.click(screen.getByRole('button', { name: 'Record a click' }));
    expect(screen.getByText('2')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByText('0')).toBeInTheDocument();
    const sourcePanel = screen.getByLabelText('Implementation source');
    await user.click(within(sourcePanel).getByText('InteractionDemo.tsx'));
    expect(sourcePanel.querySelector('code')?.textContent).toBe(foundationExamples[0]?.sources[0]?.content);
    expect(sourcePanel).toHaveTextContent('setCount((value) => value + 1)');
  });

  it('preserves a deep-linked hook and selects its real mandatory requirements', async () => {
    const user = userEvent.setup();
    open('/learn/react/react-028');
    expect(await screen.findByRole('heading', { level: 1, name: 'useEffect' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^useEffect —/ })).toHaveAttribute('aria-current', 'page');
    const examples = screen.getByRole('navigation', { name: 'Practical examples' });
    expect(within(examples).getAllByRole('link')).toHaveLength(17);
    await user.click(within(examples).getAllByRole('link')[1]!);
    expect(screen.getByTestId('url')).toHaveTextContent('example=react-028.e02');
    expect(screen.getByTestId('react-trace')).toHaveTextContent('effect');
  });

  it('filters without changing the selected topic and restores browser history', async () => {
    const user = userEvent.setup();
    open('/learn/react/react-028');
    await screen.findByRole('heading', { level: 1, name: 'useEffect' });
    const input = screen.getByRole('searchbox', { name: 'Find a concept' });
    await user.type(input, 'closure');
    expect(await screen.findByRole('heading', { level: 1, name: 'useEffect' })).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Concepts' });
    await user.click(within(nav).getByRole('link', { name: /^Closures —/ }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Closures' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Test back' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'useEffect' })).toBeInTheDocument();
    expect(input).toHaveValue('closure');
    await user.click(screen.getByRole('button', { name: 'Test forward' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Closures' })).toBeInTheDocument();
  });

  it.each([
    ['/learn/react/react-027?example=react-064.e01', 'useState', 'Increment'],
    ['/learn/react/react-028?example=react-047.e01', 'useEffect', 'Mount child']
  ])('resolves mandatory example aliases on direct entry %s', async (path, title, button) => {
    open(path);
    expect(await screen.findByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: button })).toBeInTheDocument();
    expect(screen.getByTestId('url')).toHaveTextContent(path);
  });

  it.each(['/unknown', '/learn/javascript/react-028', '/learn/react/react-028?example=react-064.e01', '/foundation?example=missing'])('handles invalid route %s', (path) => {
    open(path);
    expect(screen.getByRole('heading', { level: 1, name: 'Let’s get you back to the lab.' })).toBeInTheDocument();
  });

  it('recovers from empty search and keeps example selection across history', async () => {
    const user = userEvent.setup();
    open('/foundation?example=api');
    expect(screen.getByRole('button', { name: 'Check API connection' })).toBeInTheDocument();
    await user.type(screen.getByRole('searchbox'), 'zzzz-no-topic');
    expect(screen.getByText(/No matching concepts/)).toBeInTheDocument();
    await user.clear(screen.getByRole('searchbox'));
    await user.click(screen.getByRole('link', { name: /Local interaction/ }));
    await user.click(screen.getByRole('button', { name: 'Test back' }));
    expect(screen.getByRole('button', { name: 'Check API connection' })).toBeInTheDocument();
    expect(screen.getByTestId('url')).toHaveTextContent('example=api');
  });

  it('exposes mobile navigation state and closes it when selecting a link', async () => {
    const user = userEvent.setup();
    open();
    await user.click(screen.getByRole('button', { name: 'Browse topics' }));
    expect(screen.getByRole('button', { name: 'Close topics' })).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('link', { name: /Application foundation/ }));
    expect(screen.getByRole('button', { name: 'Browse topics' })).toHaveAttribute('aria-expanded', 'false');
  });
});
