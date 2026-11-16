import { useState } from 'react';
import { itemsResponse } from '../helpers';
import { Result } from './LabWidgets';
import { useOwnedRequests } from './lab-context';

function ApiCheck({ failure }: { failure: boolean }) {
  const request = useOwnedRequests();
  const [result, setResult] = useState('Ready');
  const [pending, setPending] = useState(false);
  async function run() {
    setPending(true);
    setResult('Checking API');
    try {
      const names = await itemsResponse(request, failure ? '/api/v1/lab/items?fail=1' : '/api/v1/lab/items?q=grace');
      setResult(!failure && names.length === 1 && names[0] === 'Grace' ? 'PASS: filtered API response' : 'FAIL: unexpected API response');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setResult(failure && error instanceof Error && error.message === 'HTTP 503' ? 'PASS: API failure handled' : 'FAIL: ' + String(error));
    } finally {
      setPending(false);
    }
  }
  return <><button disabled={pending} onClick={() => void run()}>Run integration check</button><Result value={result} /></>;
}
export function Example01() { return <ApiCheck failure={false} />; }
export function Example02() { return <ApiCheck failure />; }
