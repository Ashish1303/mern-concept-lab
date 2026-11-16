import { useEffect, useRef, useState } from 'react';
import { fetchHealth } from '../services/health';
import { OutputViewer } from '../components/examples/OutputViewer';

type Result = { state: 'idle' | 'loading' | 'success' | 'error'; text: string };

export function HealthDemo() {
  const [result, setResult] = useState<Result>({ state: 'idle', text: 'No request sent yet.' });
  const activeRequest = useRef<AbortController | null>(null);
  useEffect(() => () => {
    activeRequest.current?.abort();
    activeRequest.current = null;
  }, []);

  async function run(invalidQuery = false) {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    setResult({ state: 'loading', text: 'Requesting the Express API…' });
    try {
      const response = await fetchHealth(controller.signal, invalidQuery);
      if (activeRequest.current === controller && !controller.signal.aborted) setResult({ state: 'success', text: JSON.stringify(response, null, 2) });
    } catch (error) {
      if (activeRequest.current !== controller) return;
      setResult({ state: 'error', text: controller.signal.aborted ? 'Request timed out or was cancelled. Try again.' : error instanceof Error ? error.message : 'Request failed. Check that the Express API is running.' });
    } finally {
      window.clearTimeout(timeout);
      if (activeRequest.current === controller) activeRequest.current = null;
    }
  }

  function reset() {
    activeRequest.current?.abort();
    activeRequest.current = null;
    setResult({ state: 'idle', text: 'No request sent yet.' });
  }

  return <>
    <p>Send a real HTTP request. This check reports whether Express is responding.</p>
    <div className="button-row">
      <button className="primary" disabled={result.state === 'loading'} onClick={() => void run()}>Check API connection</button>
      <button className="secondary" disabled={result.state === 'loading'} onClick={() => void run(true)}>Send invalid query</button>
      <button className="secondary" onClick={reset}>Reset</button>
    </div>
    <OutputViewer error={result.state === 'error'}><pre>{result.text}</pre></OutputViewer>
  </>;
}
