import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Result } from './LabWidgets';
import { taskApi } from './redux-api';
import type { ApiStore } from './redux-api';
import { ApiLab, QueryOutput } from './redux-api-widgets';

function CacheProbe({ workspace }: { workspace: string }) {
  const [visible, setVisible] = useState(true);
  const cache = useSelector((state: ReturnType<ApiStore['getState']>) => taskApi.endpoints.tasks.select({ workspace })(state).status);
  return <><button onClick={() => setVisible(value => !value)}>{visible ? 'Unmount query' : 'Remount query'}</button>
    {visible && <QueryOutput workspace={workspace} />}
    <Result value={cache} label="Cache entry status" />
  </>;
}

export function Example01() {
  return <ApiLab>{workspace => <CacheProbe workspace={workspace} />}</ApiLab>;
}

export function Example02() {
  const [second, setSecond] = useState(false);
  return <ApiLab>{workspace => <><button onClick={() => setSecond(true)}>Mount second reader</button><QueryOutput workspace={workspace} />
    {second && <QueryOutput workspace={workspace} />}
  </>}</ApiLab>;
}
