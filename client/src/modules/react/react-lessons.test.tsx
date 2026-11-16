import type { Server } from 'node:http';
import { readFileSync } from 'node:fs';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { createApp } from '../../../../server/src/app';
import { reactSummary } from './react-summary';
import { catalog } from '../../app/catalog';
import { examples as registered, topics } from '../../app/registry';
import { reactCatalog } from './react-catalog';
import type { ReactDemoModule } from './react-types';
import { LabContext, createTrace } from './lab-context';
import type { LabRequest } from './lab-context';
import { TracePanel } from './LabWidgets';
import { loadReactLesson } from './load-react-lesson';

const modules = import.meta.glob<ReactDemoModule>('./react-[0-9][0-9][0-9].tsx', { eager: true });
let server: Server;
let origin: string;
beforeAll(async () => {
  server = createApp().listen(0, '127.0.0.1');
  await new Promise<void>((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('No test address.');
  origin = `http://127.0.0.1:${address.port}`;
});
afterAll(async () => { if (server) await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

function mount(id: string, number = 1, request: LabRequest = (path, options) => fetch(new URL(path, origin), options)) {
  const Demo = modules[`./${id}.tsx`]![`Example${String(number).padStart(2, '0')}`]!;
  const trace = createTrace();
  const view = render(<LabContext value={{ trace, request }}><Demo /><TracePanel /></LabContext>);
  return { ...view, trace, user: userEvent.setup() };
}
function output() { return screen.queryAllByTestId('react-result').map(node => node.textContent).join('\n'); }
function control(label: string) { return screen.queryByRole('button', { name: label }) ?? screen.getByLabelText(label, { exact: true }); }

describe('Phase 3 curriculum and actual component interactions', () => {
  it('covers all 46 concepts and all 27 mandatory requirements with exact source and six questions', async () => {
    expect(reactCatalog).toHaveLength(46);
    expect(reactSummary).toEqual(reactCatalog.map(lesson => ({ id: lesson.id, description: lesson.description, questions: lesson.questions.map(({ id }) => ({ id })), examples: lesson.examples.map(({ id, title, aliases }) => ({ id, title, aliases })) })));
    expect(reactCatalog.flatMap(lesson => lesson.examples)).toHaveLength(118);
    expect(reactCatalog.flatMap(lesson => lesson.examples.flatMap(example => example.aliases))).toHaveLength(27);
    for (const [id, , , , phase, kind, minimum] of catalog) {
      if (phase !== 3 || kind !== 'concept') continue;
      const lesson = reactCatalog.find(lesson => lesson.id === id)!;
      expect(lesson.examples.length).toBeGreaterThanOrEqual(minimum);
      expect(lesson.questions).toHaveLength(6);
      expect(topics.find(topic => topic.id === id)?.description).toBe(lesson.description);
      const loaded = await loadReactLesson(id);
      expect(loaded.sources[0]?.content).toBe(readFileSync(`src/modules/react/${id}.tsx`, 'utf8'));
      for (const example of lesson.examples) {
        expect(typeof loaded.demos[example.component]).toBe('function');
        for (const id of [example.id, ...example.aliases]) expect(registered.find(item => item.id === id)?.title).toBe(example.title);
      }
    }
  });
  for (const lesson of reactCatalog) for (const example of lesson.examples) {
    it(`${example.id}: ${example.title}`, async () => {
      const { user } = mount(lesson.id, lesson.examples.indexOf(example) + 1);
      for (const step of example.test) {
        if (step.action === 'click') await act(async () => { await user.click(control(step.label)); });
        if (step.action === 'clear') await user.clear(control(step.label));
        if (step.action === 'type') { await user.click(control(step.label)); await user.paste(step.value!); }
        if (step.action === 'select') await user.selectOptions(control(step.label), step.value!);
        if (step.expect) await waitFor(() => expect(output()).toContain(step.expect));
        if (step.trace) await waitFor(() => expect(screen.getByTestId('react-trace').textContent).toContain(step.trace));
      }
      for (const alert of screen.queryAllByRole('alert')) expect(alert).not.toHaveTextContent(/This React example failed/);
    });
  }
});

describe('State, cleanup and modern Hook contracts', () => {
  it('preserves saved nested history after the corrected update', async () => {
    const { user } = mount('react-027', 6);
    await user.click(control('Copy the nested path'));
    expect(output()).toContain('"current": 2'); expect(output()).toContain('"savedHistory": 1');
  });
  it('memoization skips actual child commits on unrelated updates', async () => {
    const { user, trace } = mount('react-032');
    act(() => trace.clear());
    await user.click(control('Unrelated memo update'));
    expect(trace.snapshot().map(event => event.event)).toEqual(['Fresh commit']);
  });
  it('stable callbacks preserve memoized child props', async () => {
    const { user, trace } = mount('react-033');
    act(() => trace.clear()); await user.click(control('Unrelated callback update'));
    expect(trace.snapshot().map(event => event.event)).toEqual(['Fresh callback commit']);
  });
  it('external store readers unsubscribe on unmount', () => {
    const { unmount } = mount('react-040');
    unmount(); expect(screen.queryByTestId('react-result')).toBeNull();
  });
  it('viewport subscriptions read real snapshots after resize and remove listeners', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    const { unmount } = mount('react-040', 2);
    const width = Object.getOwnPropertyDescriptor(window, 'innerWidth');
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 777 });
    fireEvent(window, new Event('resize'));
    expect(output()).toContain('777'); unmount();
    expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
    if (width) Object.defineProperty(window, 'innerWidth', width);
  });
  it('insertion rules have per-instance ownership, copy nonce and clean up', async () => {
    const meta = document.createElement('meta'); meta.name = 'csp-nonce'; meta.content = 'test-nonce'; document.head.append(meta);
    try {
      const { user, unmount } = mount('react-041', 2);
      expect(document.querySelectorAll('style[data-mern-rule]')).toHaveLength(2);
      expect([...document.querySelectorAll<HTMLStyleElement>('style[data-mern-rule]')].every(style => style.nonce === 'test-nonce')).toBe(true);
      await user.click(control('Toggle owned style')); expect(document.querySelectorAll('style[data-mern-rule]')).toHaveLength(1);
      unmount(); expect(document.querySelectorAll('style[data-mern-rule]')).toHaveLength(0);
      const single = mount('react-041');
      expect(single.trace.snapshot().at(-1)?.value).toMatchObject({ installed: true, nonceRequired: true, nonceMatchesPage: true });
      single.unmount();
    } finally { meta.remove(); }
  });
  it('layout measures a committed ref (geometry explicitly stubbed in jsdom)', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) { return { width: this.classList.contains('wide') ? 260 : 160 } as DOMRect; });
    const { user } = mount('react-034'); expect(output()).toContain('160');
    await user.click(control('Toggle measured width')); expect(output()).toContain('260');
  });
  it('Effect Events read current notification data without resubscribing', async () => {
    const { user, trace } = mount('react-044', 2); act(() => trace.clear());
    await user.click(control('Change latest theme')); await user.click(control('Dispatch effect-installed notice'));
    expect(trace.snapshot()).toHaveLength(1); expect(trace.snapshot()[0]?.value).toMatchObject({ theme: 'dark' });
  });
  it('Effect Events preserve reactive subscription dependencies', async () => {
    const { user, trace } = mount('react-044', 3); act(() => trace.clear());
    await user.click(control('Change reactive room'));
    expect(trace.snapshot().map(event => [event.event, event.value])).toEqual([['channel unsubscribe', 'A'], ['channel subscribe', 'B']]);
    act(() => trace.clear()); await user.click(control('Change room notification theme'));
    expect(trace.snapshot()).toHaveLength(0);
  });
  it('owned Action requests abort on unmount without starting queued work', async () => {
    const signals: AbortSignal[] = [];
    const request: LabRequest = async (_path, options) => { const signal = options!.signal!; signals.push(signal); return new Promise<Response>((_resolve, reject) => signal.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')), { once: true })); };
    const { user, unmount } = mount('react-042', 2, request);
    await user.click(control('Queue two actions')); expect(signals).toHaveLength(1);
    unmount(); expect(signals[0]?.aborted).toBe(true);
    await act(async () => { await Promise.resolve(); }); expect(signals).toHaveLength(1);
  });
  it('optimistic rollback preserves an unrelated base update after actual HTTP rejection', async () => {
    // Keep the real HTTP rejection pending until the unrelated update has rendered.
    let releaseReply!: () => void;
    const reply = new Promise<void>(resolve => { releaseReply = resolve; });
    const { user } = mount('react-043', 2, async (path, options) => {
      await reply;
      return fetch(new URL(path, origin), options);
    });
    try {
      await user.click(control('Reject optimistic increment'));
      await user.click(control('Optimistic increment'));
      await waitFor(() => expect(output()).toContain('"optimistic": 1'));
      expect(output()).toContain('"pending": true');
      await user.click(control('External base plus ten'));
      await waitFor(() => expect(output()).toContain('"optimistic": 11'));
    } finally {
      releaseReply();
    }
    await waitFor(() => {
      const result = JSON.parse(output());
      expect(result).toMatchObject({ base: 10, optimistic: 10, pending: false });
      expect(result.error).toContain('HTTP 503');
    });
  });
  it('form Actions show actual pending, validation, HTTP failure and successful retry', async () => {
    const { user } = mount('react-042');
    await user.clear(control('Action name')); await user.click(control('Submit action'));
    await waitFor(() => expect(output()).toContain('Enter a name.'));
    await user.click(control('Action name')); await user.paste('Grace'); await user.click(control('Reject action request')); await user.click(control('Submit action'));
    expect(output()).toContain('"pending": true'); await waitFor(() => expect(output()).toContain('HTTP 503'));
    await user.clear(control('Action name')); await user.click(control('Action name')); await user.paste('Grace');
    if ((control('Reject action request') as HTMLInputElement).checked) await user.click(control('Reject action request'));
    await user.click(control('Submit action'));
    await waitFor(() => expect(output()).toContain('acknowledged'));
  });
  it('empty dependencies skip prop changes but cleanup on unmount', async () => {
    const { user, trace, unmount } = mount('react-028', 3); act(() => trace.clear());
    await user.click(control('Change displayed prop')); expect(trace.snapshot()).toHaveLength(0);
    unmount(); expect(trace.snapshot().map(event => event.event)).toEqual(['empty-array cleanup']);
  });
  it('specific dependencies clean up old values before setup and ignore unrelated state', async () => {
    const { user, trace } = mount('react-028', 4); act(() => trace.clear());
    await user.click(control('Change unrelated state')); expect(trace.snapshot()).toHaveLength(0);
    await user.click(control('Change dependency'));
    expect(trace.snapshot().map(event => [event.event, event.value])).toEqual([['dependency cleanup', 0], ['dependency setup', 1]]);
  });
  it('stale listener and corrected listener really read different closures', async () => {
    const { user, trace } = mount('react-028', 11); await user.click(control('Increment captured count')); await user.click(control('Read both closures'));
    expect(trace.snapshot().map(event => [event.event, event.value])).toEqual([['stale closure read', 0], ['current closure read', 1]]);
  });
  it('listeners and intervals release resources on unmount', async () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    const listener = mount('react-028', 9); listener.unmount();
    expect(remove).toHaveBeenCalledWith('mern-concept-lab:ping', expect.any(Function));
    const clear = vi.spyOn(globalThis, 'clearInterval'); const timer = mount('react-028', 8);
    await timer.user.click(control('Start bounded interval')); timer.unmount(); expect(clear).toHaveBeenCalled();
    expect(timer.trace.snapshot().at(-1)?.event).toBe('interval cleanup');
  });
  it('request effects pass a signal and abort their request on unmount', () => {
    let signal: AbortSignal | null = null;
    const request: LabRequest = async (_path, options) => { signal = options!.signal!; return new Promise<Response>((_resolve, reject) => signal!.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')))); };
    const { unmount, trace } = mount('react-028', 5, request);
    expect(signal).not.toBeNull(); unmount(); expect((signal as AbortSignal | null)?.aborted).toBe(true);
    expect(trace.snapshot().at(-1)?.event).toBe('request cleanup');
  });
  it('the latest-request guard stays correct when older work resolves last', async () => {
    const complete: ((response: Response) => void)[] = [];
    const request: LabRequest = () => new Promise<Response>(resolve => complete.push(resolve));
    const { user } = mount('react-028', 12, request); await user.click(control('Run request race'));
    const response = (name: string) => new Response(JSON.stringify({ data: [{ name }] }), { status: 200 });
    await act(async () => { complete[1]!(response('Grace')); });
    await act(async () => { complete[0]!(response('Ada')); });
    expect(output()).toContain('"unchecked": "Ada"'); expect(output()).toContain('"guarded": "Grace"');
  });
  it('StrictMode control uses actual isolated roots and releases both', async () => {
    const { user, trace, unmount } = mount('react-025'); await user.click(control('Run isolated StrictMode comparison'));
    const events = trace.snapshot().map(event => event.event);
    expect(events.filter(value => value === 'Plain setup')).toHaveLength(1);
    expect(events.filter(value => value === 'Strict setup')).toHaveLength(2);
    expect(events.filter(value => value === 'Strict cleanup')).toHaveLength(1);
    unmount(); await act(async () => { await Promise.resolve(); });
    expect(trace.snapshot().filter(event => event.event === 'Plain cleanup')).toHaveLength(1);
    expect(trace.snapshot().filter(event => event.event === 'Strict cleanup')).toHaveLength(2);
  });
  it('generated labels target different actual inputs', () => {
    mount('react-036'); const first = screen.getByLabelText('First generated field'); const second = screen.getByLabelText('Second generated field');
    expect(first.id).not.toBe(second.id); expect(first.id).not.toBe('');
  });
  it('imperative focus targets the owned DOM input', async () => {
    const { user } = mount('react-035'); await user.click(control('Handle focus'));
    expect(screen.getByLabelText('Command input')).toHaveFocus();
  });
  it.each([
    ['react-028', 8, 'Start bounded interval', 'interval tick'],
    ['react-044', 4, 'Start effect-event timer', 'latest timer increment']
  ] as const)('%s bounded timer stops visibly and restarts for another five ticks', (id, number, button, eventName) => {
    vi.useFakeTimers();
    try {
      const { trace, unmount } = mount(id, number);
      fireEvent.click(control(button));
      act(() => { vi.advanceTimersByTime(1000); });
      expect(output()).toContain('"running": false');
      expect(trace.snapshot().filter(event => event.event === eventName)).toHaveLength(5);
      fireEvent.click(control(button));
      expect(output()).toContain('"running": true');
      act(() => { vi.advanceTimersByTime(1000); });
      expect(output()).toContain('"running": false');
      expect(trace.snapshot().filter(event => event.event === eventName)).toHaveLength(10);
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    } finally { cleanup(); vi.useRealTimers(); }
  });
});
