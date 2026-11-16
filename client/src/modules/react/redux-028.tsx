import { useState } from 'react';
import { ApiLab, QueryOutput } from './redux-api-widgets';

export function Example01() {
  const [load, setLoad] = useState(false);
  return <><button onClick={() => setLoad(true)}>Load page two</button>
    {load && <ApiLab>{workspace => <QueryOutput workspace={workspace} page={2} />}</ApiLab>}
  </>;
}

export function Example02() {
  const [fail, setFail] = useState(false);
  return <><button onClick={() => setFail(true)}>Request controlled failure</button>
    {fail && <ApiLab>{workspace => <QueryOutput workspace={workspace} fail />}</ApiLab>}
  </>;
}
