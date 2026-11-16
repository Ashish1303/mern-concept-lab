import { useState } from 'react';
import { ApiLab, QueryOutput } from './redux-api-widgets';

export function Example01() {
  return <ApiLab>{workspace => <QueryOutput workspace={workspace} manualRefresh />}</ApiLab>;
}

export function Example02() {
  const [second, setSecond] = useState(false);
  return <ApiLab>{workspace => <><button onClick={() => setSecond(true)}>Open fresh reader</button><QueryOutput workspace={workspace} />
    {second && <QueryOutput workspace={workspace} refresh />}
  </>}</ApiLab>;
}

