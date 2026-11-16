import { useState } from 'react';
import { ApiLab, QueryOutput, TaskDetail, TaskEditor } from './redux-api-widgets';
import { taskApi } from './redux-api';
import { ActionLab } from './redux-local';

export function Example01() {
  const [load, setLoad] = useState(false);
  return <><button onClick={() => setLoad(true)}>Load task list</button>
    {load && <ApiLab>{workspace => <QueryOutput workspace={workspace} />}</ApiLab>}
  </>;
}

export function Example02() {
  const [load, setLoad] = useState(false);
  return <><button onClick={() => setLoad(true)}>Load task detail</button>
    {load && <ApiLab>{workspace => <TaskDetail workspace={workspace} id={2} />}</ApiLab>}
  </>;
}

export function Example03() {
  return <ActionLab label="Inspect API slice" run={() => ({ path: taskApi.reducerPath, endpoints: Object.keys(taskApi.endpoints) })} />;
}

export function Example04() {
  return <ApiLab>{workspace => <TaskEditor workspace={workspace} mode="add" />}</ApiLab>;
}

export function Example05() {
  const [show, setShow] = useState(false);
  return <><button onClick={() => setShow(true)}>Open second workspace</button>
    <ApiLab>{workspace => <QueryOutput workspace={workspace} />}</ApiLab>
    {show && <ApiLab>{workspace => <QueryOutput workspace={workspace} />}</ApiLab>}
  </>;
}

export function Example06() {
  return <ApiLab>{workspace => <TaskEditor workspace={workspace} mode="crud" />}</ApiLab>;
}
