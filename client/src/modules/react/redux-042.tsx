import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Result } from './LabWidgets';
import { taskApi } from './redux-api';
import type { ApiStore } from './redux-api';
import { ApiLab } from './redux-api-widgets';

function QueryCheck({ workspace, failure }: { workspace: string; failure: boolean }) {
  const dispatch = useDispatch.withTypes<ApiStore['dispatch']>()();
  const [result, setResult] = useState('Ready');
  const [busy, setBusy] = useState(false);
  async function run() {
    setBusy(true);
    const task = dispatch(taskApi.endpoints.tasks.initiate({ workspace, ...(failure ? { fail: true } : {}) }));
    try {
      const data = await task.unwrap();
      setResult(!failure && data.data.some(row => row.title === 'Read Redux') ? 'PASS: fulfilled API data' : 'FAIL: unexpected data');
    } catch (error) {
      setResult(failure && error && typeof error === 'object' && 'status' in error && error.status === 503 ? 'PASS: rejected API data' : 'FAIL: unexpected error');
    } finally {
      task.unsubscribe();
      setBusy(false);
    }
  }
  return <><button disabled={busy} onClick={() => void run()}>Run query assertion</button><Result value={result} /></>;
}

export function Example01() {
  return <ApiLab>{workspace => <QueryCheck workspace={workspace} failure={false} />}</ApiLab>;
}

export function Example02() {
  return <ApiLab>{workspace => <QueryCheck workspace={workspace} failure />}</ApiLab>;
}
