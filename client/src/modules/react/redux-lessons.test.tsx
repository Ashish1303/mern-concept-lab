import { randomUUID } from 'node:crypto';
import type { Server } from 'node:http';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../../../../server/src/app';
import { catalog } from '../../app/catalog';
import { examples, topics } from '../../app/registry';
import { createTrace, LabContext } from './lab-context';
import type { LabRequest } from './lab-context';
import { loadReactLesson } from './load-react-lesson';
import { reduxCatalog } from './redux-catalog';

let server: Server;
let origin: string;
beforeAll(async () => {
  server = createApp().listen(0, '127.0.0.1');
  await new Promise<void>((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('No local test address.');
  origin = 'http://127.0.0.1:' + address.port;
});
afterEach(async () => { await act(async () => { cleanup(); }); });
afterAll(async () => { if (server) await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); });

const request: LabRequest = (path, init) => fetch(new URL(path, origin), init);
async function mount(id: string, component: string, transport = request) {
  const { demos } = await loadReactLesson(id);
  const Demo = demos[component]!;
  const user = userEvent.setup();
  const trace = createTrace();
  const view = render(<LabContext value={{ request: transport, trace }}><Demo /></LabContext>);
  return { user, trace, ...view };
}

function output() { return screen.queryAllByTestId('react-result').map(node => node.textContent).join('\n'); }
async function click(user: ReturnType<typeof userEvent.setup>, label: string) {
  const control = screen.queryByRole('button', { name: label }) ?? screen.getByLabelText(label);
  await waitFor(() => expect(control).toBeEnabled());
  await user.click(control);
}

describe('Phase 5 Redux Toolkit and RTK Query', () => {
  it('resolves all required projects and implements all reserved examples', async () => {
    const planned = catalog.filter(([, , , , phase]) => phase === 5);
    expect(reduxCatalog).toHaveLength(42);
    expect(reduxCatalog.flatMap(lesson => lesson.examples)).toHaveLength(112);
    for (const [id, , , , , kind, count] of planned) {
      if (kind === 'required-example') {
        const owner = topics.find(topic => topic.requirementIds.includes(id))!;
        const project = reduxCatalog.find(lesson => lesson.id === owner.id)?.examples.find(example => example.id === id + '.e01');
        expect(project?.title).toBeTruthy();
        expect(owner.exampleIds).toContain(project?.id);
      } else {
        const { lesson, demos } = await loadReactLesson(id);
        expect(lesson.examples.filter(example => example.id.startsWith(id + '.'))).toHaveLength(count);
        expect(lesson.questions).toHaveLength(6);
        for (const example of lesson.examples) {
          expect(typeof demos[example.component]).toBe('function');
          expect(examples.find(item => item.id === example.id)?.title).toBe(example.title);
        }
      }
    }
  });

  for (const lesson of reduxCatalog) for (const example of lesson.examples) {
    it(example.id + ' ' + example.title, async () => {
      const { user } = await mount(lesson.id, example.component);
      for (const step of example.test) {
        if (step.action === 'click') await click(user, step.label);
        if (step.action === 'type') {
          const field = screen.getByLabelText(step.label);
          await user.clear(field);
          await user.type(field, step.value!);
        }
        if (step.expect) await waitFor(() => expect(output()).toContain(step.expect), { timeout: 2500 });
      }
    });
  }

  it('skips unrelated useSelector commits', async () => {
    const { user, trace } = await mount('redux-006', 'Example02');
    trace.clear();
    await click(user, 'Update note');
    expect(trace.snapshot()).toEqual([]);
    await click(user, 'Update count');
    expect(trace.snapshot()).toEqual([{ sequence: 2, event: 'counter view committed', value: 1 }]);
  });

  it('deduplicates two subscribers into one HTTP request', async () => {
    const paths: string[] = [];
    const { user } = await mount('redux-041', 'Example01', (path, init) => {
      paths.push(path);
      return request(path, init);
    });
    await click(user, 'Mount matching readers');
    await waitFor(() => expect(screen.getAllByTestId('react-result').every(node => node.textContent?.includes('"read": 1'))).toBe(true));
    expect(paths).toHaveLength(1);
  });

  it('restores list and detail after a rejected patch without writing to Express', async () => {
    const paths: string[] = [];
    const { user } = await mount('redux-037', 'Example02', (path, init) => {
      paths.push(path);
      return request(path, init);
    });
    await waitFor(() => expect(screen.getByLabelText('Task detail')).toHaveTextContent('Read Redux'));
    await click(user, 'Rename first task');
    await waitFor(() => expect(screen.getByLabelText('Task detail')).toHaveTextContent('Practice selectors'));
    await waitFor(() => expect(output()).toContain('Rolled back (409)'));
    await waitFor(() => expect(screen.getByLabelText('Task detail')).toHaveTextContent('Read Redux'));
    const detail = await request(paths.find(path => path.endsWith('/tasks/1'))!);
    await expect(detail.json()).resolves.toEqual({ data: { id: 1, title: 'Read Redux' } });
  });

  it('clears the visible profile and cache on demo sign-out', async () => {
    const { user } = await mount('redux-039', 'Example05');
    await waitFor(() => expect(output()).toContain('reader'));
    await click(user, 'Clear demo session');
    expect(output()).toContain('uninitialized');
    expect(output()).not.toContain('Ada');
    expect(output()).not.toContain('reader');
  });

  it('isolates independent HTTP workspaces', async () => {
    const first = '/api/v1/lab/redux/' + randomUUID() + '/tasks';
    const second = '/api/v1/lab/redux/' + randomUUID() + '/tasks';
    const saved = await request(first, { method: 'POST', body: JSON.stringify({ title: 'Isolated' }), headers: { 'content-type': 'application/json' } });
    expect(saved.status).toBe(201);
    expect(await (await request(first)).text()).toContain('Isolated');
    expect(await (await request(second)).text()).not.toContain('Isolated');
  });
});

