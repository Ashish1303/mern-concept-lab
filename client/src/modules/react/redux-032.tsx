import { useDispatch } from 'react-redux';
import { taskApi } from './redux-api';
import { ApiLab, QueryOutput, TaskDetail, TaskEditor } from './redux-api-widgets';

function RefreshCache({ workspace }: { workspace: string }) {
  const dispatch = useDispatch();
  return <><button onClick={() => dispatch(taskApi.util.invalidateTags([{ type: 'Task', id: workspace + ':LIST' }]))}>Invalidate list tag</button>
    <QueryOutput workspace={workspace} />
  </>;
}

export function Example01() {
  return <ApiLab>{workspace => <RefreshCache workspace={workspace} />}</ApiLab>;
}

export function Example02() {
  return <ApiLab>{workspace => <TaskEditor workspace={workspace} mode="add" />}</ApiLab>;
}

export function Example03() {
  return <ApiLab>{workspace => <><TaskEditor workspace={workspace} mode="rename" /><TaskDetail workspace={workspace} id={1} /></>}</ApiLab>;
}

