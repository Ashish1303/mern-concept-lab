import { useState } from 'react';
import { Result } from '../react/LabWidgets';
import { useOwnedRequests } from '../react/lab-context';
import { requestBackend } from './request-backend';

export function BackendDemo({ id, initial }: { id: string; initial: string }) {
  const request = useOwnedRequests();
  const [input, setInput] = useState(initial);
  const [result, setResult] = useState<unknown>('Ready');
  const [busy, setBusy] = useState(false);
  async function run() {
    setBusy(true);
    setResult('Waiting for the backend…');
    try { setResult(await requestBackend(request, id, input)); }
    catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setResult(String(error)); }
    finally { setBusy(false); }
  }
  return <><label>Demo input <input value={input} maxLength={120} onChange={event => setInput(event.target.value)} /></label>
    <button disabled={busy} onClick={() => void run()}>{id.startsWith('mongodb-') ? 'Run database demo' : id.startsWith('express-') ? 'Run API demo' : 'Run backend demo'}</button><Result value={result} />
  </>;
}
