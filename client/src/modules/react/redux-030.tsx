import { ApiLab, TaskEditor } from './redux-api-widgets';

export function Example01() {
  return <ApiLab>{workspace => <TaskEditor workspace={workspace} mode="add" />}</ApiLab>;
}

export function Example02() {
  return <ApiLab>{workspace => <TaskEditor workspace={workspace} mode="rename" />}</ApiLab>;
}
