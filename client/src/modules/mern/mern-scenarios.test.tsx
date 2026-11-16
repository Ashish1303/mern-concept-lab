import type { ComponentType } from 'react';
import { fork } from 'node:child_process';
import type { ChildProcess } from 'node:child_process';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { parseEnvironment } from '../../../../server/src/config/env';
import { createTrace, LabContext } from '../react/lab-context';
import type { LabRequest } from '../react/lab-context';
import * as scenarios from './mern-scenarios';
import { mernCatalog } from './mern-catalog';

const port = parseEnvironment(process.env).mongoLabPort;
type Step = [control: string, expected?: string];
const scripts: Step[][] = [
  [['Save item', 'MERN form entry']],
  [['Save item', 'readBack']],
  [['Save item', 'readBack'], ['Update saved item', 'updated'], ['Delete saved item', 'remainingMatches']],
  [['Register sample account', 'saltedHashStored']],
  [['Register sample account', 'saltedHashStored'], ['Sign in', 'authenticated']],
  [['Register sample account', 'saltedHashStored'], ['Verify against the stored hash', 'passwordVerified']],
  [['Request without a token', '401'], ['Prepare reader session', 'authenticated'], ['Verify signed access token', 'tokenSegments']],
  [['Prepare reader session', 'authenticated'], ['Rotate refresh value', 'rotated'], ['Retry the previous value', '401']],
  [['Open the private route', 'Redirected to sign-in'], ['Prepare reader session', 'authenticated'], ['Open the private route'], ['Load protected profile', 'signed']],
  [['Prepare reader session', 'authenticated'], ['Request editor resource', '403'], ['Use the editor fixture', 'editor'], ['Request editor resource', 'signed']],
  [['Create and invalidate list', '"total": 4']],
  [['Search saved items', 'Mongo Notes']],
  [['Apply sort', 'Express Guide']],
  [['First page', '"page": 1'], ['Next page', '"page": 2']],
  [['Save item', 'at least three'], ['Verify server validation', '400']],
  [['Upload generated text file', 'persisted']],
  [['Rename with forced rollback', 'Restoring'], ['Save optimistic edit', 'Saved in MongoDB']],
  [['Request controlled failure', '503'], ['Retry healthy request', 'Express Guide']],
  [['Load with a delay', 'Loading from Express'], ['', 'Express Guide']],
  [['Run API assertions', '"passed": true']],
  [['Save item', 'React integration item']],
  [['Check running server', 'databaseReady']],
  [['Check running server', 'databaseReady']]
];

describe.skipIf(!port)('Phase 9 React against the real Express and MongoDB stack', () => {
  let server: ChildProcess;
  let origin: string;
  const request: LabRequest = (path, init) => fetch(new URL(path, origin), init);
  beforeAll(async () => {
    const fixture = resolve('../server/src/tests/fixtures/mern-react-fixture.mjs');
    server = fork(fixture, { execArgv: ['--import', 'tsx'], stdio: ['ignore', 'ignore', 'inherit', 'ipc'] });
    const [httpPort] = await once(server, 'message', { signal: AbortSignal.timeout(20_000) });
    if (typeof httpPort !== 'number') throw new Error('Missing local test API address');
    origin = 'http://127.0.0.1:' + httpPort;
  }, 25_000);
  afterEach(async () => {
    cleanup();
    if (!server?.connected) return;
    const reset = once(server, 'message', { signal: AbortSignal.timeout(5000) });
    server.send('reset');
    const [acknowledgement] = await reset;
    expect(acknowledgement).toBe('reset');
  });
  afterAll(async () => {
    if (!server?.connected) return;
    const exit = once(server, 'exit', { signal: AbortSignal.timeout(6000) });
    server.send('close');
    try {
      const [code] = await exit;
      expect(code).toBe(0);
    } finally {
      if (server.connected) server.kill();
    }
  }, 8000);

  for (const [index, scenario] of mernCatalog.entries()) {
    it(scenario.id + ' ' + scenario.title, async () => {
      const Demo = (scenarios as Record<string, ComponentType>)[scenario.component]!;
      const user = userEvent.setup();
      render(<LabContext value={{ request, trace: createTrace() }}><Demo /></LabContext>);
      await user.click(screen.getByRole('button', { name: 'Start workspace' }));
      for (const [control, expected] of scripts[index]!) {
        if (control) {
          const locator = await waitFor(() => {
            const element = screen.queryByRole('button', { name: control }) ?? screen.getByRole('link', { name: control });
            expect(element).toBeEnabled();
            return element;
          }, { timeout: 3500 });
          await user.click(locator);
        }
        if (expected) await waitFor(() => {
          const output = [...screen.queryAllByRole('status'), ...screen.queryAllByTestId('react-result')]
            .map(element => element.textContent).join(' ');
          expect(output).toContain(expected);
        }, { timeout: 3500 });
      }
    }, 15_000);
  }

  it('rolls back an optimistic rename and confirms the original title after the conflict', async () => {
    const Demo = scenarios.Example17;
    const user = userEvent.setup();
    render(<LabContext value={{ request, trace: createTrace() }}><Demo /></LabContext>);
    await user.click(screen.getByRole('button', { name: 'Start workspace' }));
    const fail = await screen.findByRole('button', { name: 'Rename with forced rollback' });
    await waitFor(() => expect(fail).toBeEnabled());
    await user.click(fail);
    expect(screen.getByTestId('react-result')).toHaveTextContent('A proposed title');
    await waitFor(() => expect(screen.getByTestId('react-result')).toHaveTextContent('Restoring'));
    expect(screen.getByTestId('react-result')).toHaveTextContent('Express Guide');
    expect(screen.getByTestId('react-result')).not.toHaveTextContent('A proposed title');
  });
});


