import { useState } from 'react';
import { ApiLab, QueryOutput, TaskDetail } from './redux-api-widgets';

export function Example01() {
  const [fail, setFail] = useState(true);
  return <ApiLab>{workspace => <><button onClick={() => setFail(false)}>Try healthy endpoint</button><QueryOutput workspace={workspace} fail={fail} /></>}</ApiLab>;
}

export function Example02() {
  const [show, setShow] = useState(false);
  return <ApiLab>{workspace => <><button onClick={() => setShow(true)}>Request missing task</button>
    {show && <TaskDetail workspace={workspace} id={999} />}
  </>}</ApiLab>;
}
