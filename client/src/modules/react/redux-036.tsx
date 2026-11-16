import { ApiLab, TaskDetail, TaskEditor } from './redux-api-widgets';

export function Example01() {
  return <ApiLab>{workspace => <TaskEditor workspace={workspace} mode="optimistic" />}</ApiLab>;
}

export function Example02() {
  return <ApiLab>{workspace => <><TaskEditor workspace={workspace} mode="optimistic" /><TaskDetail workspace={workspace} id={1} /></>}</ApiLab>;
}
