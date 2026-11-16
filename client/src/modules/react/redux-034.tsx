import { useEffect, useState } from 'react';
import { ApiLab, QueryOutput } from './redux-api-widgets';

function Polling({ workspace, interval }: { workspace: string; interval: number }) {
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setRunning(false), 2500);
    return () => clearTimeout(timer);
  }, [running]);
  return <><button onClick={() => setRunning(value => !value)}>{running ? 'Stop polling' : 'Start polling'}</button>
    <QueryOutput workspace={workspace} pollingInterval={running ? interval : 0} />
  </>;
}

export function Example01() {
  return <ApiLab>{workspace => <Polling workspace={workspace} interval={600} />}</ApiLab>;
}

export function Example02() {
  return <ApiLab>{workspace => <Polling workspace={workspace} interval={450} />}</ApiLab>;
}
