import type { Server } from 'node:http';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { createApp } from '../../../../server/src/app';
import { catalog } from '../../app/catalog';
import { examples, topics } from '../../app/registry';
import { advancedCatalog } from './advanced-catalog';
import { createTrace, LabContext } from './lab-context';
import { loadReactLesson } from './load-react-lesson';

let server: Server;
let origin: string;
beforeAll(async () => {
  server = createApp().listen(0, '127.0.0.1');
  await new Promise<void>((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('No test address.');
  origin = 'http://127.0.0.1:' + address.port;
});
afterAll(async () => { if (server) await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); });
afterEach(async () => {
  await act(async () => { cleanup(); });
  vi.restoreAllMocks();
});

async function mount(id: string, component: string, captureError = false) {
  const { demos } = await loadReactLesson(id);
  const Demo = demos[component]!;
  const trace = createTrace();
  const caught: unknown[] = [];
  const user = userEvent.setup();
  await act(async () => {
    render(<MemoryRouter><LabContext value={{ trace, request: (path, options) => fetch(new URL(path, origin), options) }}>
      <Demo />
    </LabContext></MemoryRouter>, captureError ? { onCaughtError: error => caught.push(error) } : undefined);
  });
  return { user, trace, caught };
}

function output() { return screen.queryAllByTestId('react-result').map(node => node.textContent).join('\n'); }

describe('Phase 4 Advanced React', () => {
  it('registers every planned topic, demo and interview question', async () => {
    const planned = catalog.filter(([, , , , phase, kind]) => phase === 4 && kind === 'concept');
    expect(advancedCatalog.map(lesson => lesson.id)).toEqual(planned.map(([id]) => id));
    for (const [id, , , , , , minimum] of planned) {
      const { lesson, demos, sources } = await loadReactLesson(id);
      expect(lesson.examples).toHaveLength(minimum);
      expect(lesson.questions).toHaveLength(6);
      expect(new Set(lesson.questions.map(question => question.question)).size).toBe(6);
      expect(topics.find(topic => topic.id === id)?.interviewQuestionIds).toEqual(lesson.questions.map(question => question.id));
      expect(sources[0]?.name).toBe(id + '.tsx');
      for (const example of lesson.examples) {
        expect(typeof demos[example.component]).toBe('function');
        expect(examples.find(item => item.id === example.id)?.title).toBe(example.title);
      }
    }
    const split = await loadReactLesson('react-084');
    expect(split.sources.map(source => source.name)).toEqual(expect.arrayContaining(['advanced-panel.tsx', 'advanced-calculation.ts']));
  });

  for (const lesson of advancedCatalog) for (const example of lesson.examples) {
    it(example.id + ' ' + example.title, async () => {
      const { user, caught } = await mount(lesson.id, example.component, lesson.id === 'react-081');
      for (const step of example.test) {
        if (step.action === 'click') {
          const control = screen.queryByRole('button', { name: step.label }) ?? screen.getByRole('link', { name: step.label });
          await user.click(control);
        }
        if (step.action === 'type') await user.type(screen.getByLabelText(step.label), step.value!);
        if (step.action === 'select') await user.selectOptions(screen.getByLabelText(step.label), step.value!);
        if (step.expect) await waitFor(() => expect(output()).toContain(step.expect));
      }
      if (lesson.id === 'react-081') expect(caught).toContainEqual(new Error('Intentional panel failure'));
    });
  }

  it.each([
    ['react-074', 'Example01', 'Update parent (0)', []],
    ['react-074', 'Example02', 'Recreate props (0)', ['badge.commit']],
    ['react-098', 'Example01', 'Update local counter', []],
    ['react-098', 'Example02', 'Update parent counter', ['Plain summary.commit']],
    ['react-099', 'Example01', 'Toggle note', []],
    ['react-099', 'Example02', 'Increment from child', []]
  ] as const)('records the actual commits for %s %s', async (id, component, label, expected) => {
    const { user, trace } = await mount(id, component);
    trace.clear();
    await user.click(screen.getByRole('button', { name: label }));
    expect(trace.snapshot().map(event => event.event)).toEqual(expected);
  });

  it('records the actual profiling callback for the updated region', async () => {
    const { user, trace } = await mount('react-093', 'Example02');
    trace.clear();
    await user.click(screen.getByRole('button', { name: 'Update Right' }));
    expect(trace.snapshot().map(event => event.event)).toEqual(['Right.commit', 'profiler.render']);
    expect(trace.snapshot()[1]?.value).toEqual(expect.objectContaining({ id: 'Right', phase: 'update', actualDuration: expect.any(Number) }));
  });

  it.each([['Example01', 5], ['Example02', 9]])('limits actual DOM rows for %s', async (component, mounted) => {
    const { user } = await mount('react-095', component);
    await user.click(screen.getByRole('button', { name: 'Jump to row 5000' }));
    expect(screen.getByLabelText('Virtual list viewport').scrollTop).toBe(4999 * 32);
    expect(screen.getAllByRole('listitem')).toHaveLength(mounted);
    expect(screen.getByText('Row 5000')).toHaveAttribute('aria-setsize', '10000');
  });
});

