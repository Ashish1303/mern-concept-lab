import { lazy, Suspense, useState, useTransition } from 'react';
import { Result } from './LabWidgets';

function pendingPanel() {
  let finish!: () => void;
  const ready = new Promise<{ default: typeof Panel }>(resolve => {
    finish = () => resolve({ default: Panel });
  });
  function Panel() { return <Result value="New panel ready" />; }
  return { Panel: lazy(() => ready), finish };
}

export function Example01() {
  const [panel, setPanel] = useState<ReturnType<typeof pendingPanel>>();
  return <><button onClick={() => setPanel(pendingPanel())}>Load panel</button>
    <button disabled={!panel} onClick={() => panel?.finish()}>Finish loading</button>
    <Suspense fallback={<Result value="Loading fallback" />}>{panel && <panel.Panel />}</Suspense>
  </>;
}
export function Example02() {
  const [panel, setPanel] = useState<ReturnType<typeof pendingPanel>>();
  const [finish, setFinish] = useState<() => void>();
  const [pending, startTransition] = useTransition();
  function load() {
    const next = pendingPanel();
    setFinish(() => next.finish);
    startTransition(() => setPanel(next));
  }
  return <><button onClick={load}>Start transition</button><button disabled={!finish} onClick={finish}>Finish loading</button>
    {pending && <p role="status">Transition pending</p>}
    <Suspense fallback={<Result value="Loading fallback" />}>{panel ? <panel.Panel /> : <Result value="Previous panel stays visible" />}</Suspense>
  </>;
}
