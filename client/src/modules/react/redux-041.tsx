import { useState } from 'react';
import { ApiLab, QueryOutput } from './redux-api-widgets';

export function Example01() {
  const [show, setShow] = useState(false);
  return <ApiLab>{workspace => <><button onClick={() => setShow(true)}>Mount matching readers</button>
    {show && <><QueryOutput workspace={workspace} /><QueryOutput workspace={workspace} /></>}
  </>}</ApiLab>;
}

export function Example02() {
  const [show, setShow] = useState(false);
  return <ApiLab>{workspace => <><button onClick={() => setShow(true)}>Mount different readers</button>
    {show && <><QueryOutput workspace={workspace} page={1} /><QueryOutput workspace={workspace} page={2} /></>}
  </>}</ApiLab>;
}
