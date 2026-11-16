import { ApiLab, TaskDetail, TaskEditor } from './redux-api-widgets';

export function Example01() {
  return <ApiLab>{workspace => <TaskEditor workspace={workspace} mode="rollback" />}</ApiLab>;
}

export function Example02() {
  return <ApiLab>{workspace => <><TaskEditor workspace={workspace} mode="rollback" /><TaskDetail workspace={workspace} id={1} /></>}</ApiLab>;
}

export function Example03() {
  return <ApiLab>{workspace => <><p>Express rejects the edit after a short delay so you can see the temporary title and the restored title.</p><TaskEditor workspace={workspace} mode="rollback" /></>}</ApiLab>;
}
