import { useDispatch } from 'react-redux';
import { taskApi } from './redux-api';
import { ApiLab, QueryOutput, TaskDetail, TaskEditor } from './redux-api-widgets';

function Target({ workspace }: { workspace: string }) {
  const dispatch = useDispatch();
  return <><button onClick={() => dispatch(taskApi.util.invalidateTags([{ type: 'Task', id: workspace + ':3' }]))}>Invalidate task 3</button>
    <p>First page excludes task 3. The second page provides its tag.</p>
    <QueryOutput workspace={workspace} page={1} /><QueryOutput workspace={workspace} page={2} />
  </>;
}

export function Example01() {
  return <ApiLab>{workspace => <Target workspace={workspace} />}</ApiLab>;
}

export function Example02() {
  return <ApiLab>{workspace => <><TaskEditor workspace={workspace} mode="rename" /><TaskDetail workspace={workspace} id={1} /></>}</ApiLab>;
}
