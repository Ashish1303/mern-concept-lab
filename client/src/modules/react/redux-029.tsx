import { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { taskApi } from './redux-api';
import { Result } from './LabWidgets';
import { ApiLab, TaskDetail } from './redux-api-widgets';

function TaskPicker({ workspace }: { workspace: string }) {
  const [id, setId] = useState<number>();
  const query = taskApi.useTaskQuery(id ? { workspace, id } : skipToken);
  return <><button onClick={() => setId(3)}>Select task 3</button>
    <Result value={query.currentData?.title ?? query.status} />
  </>;
}

export function Example01() {
  return <ApiLab>{workspace => <TaskPicker workspace={workspace} />}</ApiLab>;
}

export function Example02() {
  const [id, setId] = useState(1);
  return <ApiLab>{workspace => <><button onClick={() => setId(2)}>Open task 2</button><TaskDetail workspace={workspace} id={id} /></>}</ApiLab>;
}
