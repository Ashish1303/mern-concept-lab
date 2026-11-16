import { useEffect, useRef, useState } from 'react';
import { Result } from '../react/LabWidgets';
import { useLab } from '../react/lab-context';
import { MernAuth } from './MernAuth';
import { MernItems } from './MernItems';
import { MernQueryDemo } from './MernQueryDemo';
import { base, call, message } from './mern-client';

type Kind =
  | 'form' | 'persist' | 'crud' | 'search' | 'sort' | 'page' | 'validation' | 'error' | 'loading' | 'api-test' | 'react-test'
  | 'register' | 'login' | 'hash' | 'jwt' | 'refresh' | 'protected' | 'roles'
  | 'query' | 'optimistic' | 'upload' | 'environment' | 'production';

function UtilityDemo({ path, mode, initial }: { path: string; mode: 'upload' | 'environment' | 'production'; initial: string }) {
  const { request } = useLab();
  const [text, setText] = useState(initial);
  const [value, setValue] = useState<unknown>('Ready');
  const [busy, setBusy] = useState(false);
  function run() {
    setBusy(true);
    const boundary = 'mern-lab-' + crypto.randomUUID().replaceAll('-', '');
    const body = '--' + boundary + '\r\nContent-Disposition: form-data; name="file"; filename="fixture.txt"\r\nContent-Type: text/plain\r\n\r\n' + text + '\r\n--' + boundary + '--\r\n';
    const task = mode === 'upload'
      ? call(request, path + '/upload', { method: 'POST', headers: { 'content-type': 'multipart/form-data; boundary=' + boundary }, body })
      : call(request, path + '/environment');
    void task.then(setValue, error => setValue(message(error))).finally(() => setBusy(false));
  }
  return <>
    {mode === 'upload' && <label>Generated file text <input maxLength={120} value={text} onChange={event => setText(event.target.value)} /></label>}
    {mode === 'production' && <ol>
      <li>Run <code>npm run build</code> to compile the frontend, server, and snippet preview.</li>
      <li>Start the local database lab, set <code>MONGO_LAB_PORT</code>, then run <code>npm start</code>.</li>
      <li>Open this lesson from the server port and check the runtime mode and database readiness.</li>
    </ol>}
    <button disabled={busy} onClick={run}>{mode === 'upload' ? 'Upload generated text file' : 'Check running server'}</button>
    <Result value={value} />
  </>;
}

function Scenario({ path, mode, initial }: { path: string; mode: Kind; initial: string }) {
  switch (mode) {
    case 'register': case 'login': case 'hash': case 'jwt': case 'refresh': case 'protected': case 'roles':
      return <MernAuth path={path} initial={initial} mode={mode} />;
    case 'query': case 'optimistic':
      return <MernQueryDemo path={path} initial={initial} optimistic={mode === 'optimistic'} />;
    case 'upload': case 'environment': case 'production':
      return <UtilityDemo path={path} initial={initial} mode={mode} />;
    default:
      return <MernItems path={path} initial={initial} mode={mode} />;
  }
}

export function MernWorkspace({ mode, initial }: { mode: Kind; initial: string }) {
  const { request } = useLab();
  const [path, setPath] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const lifecycle = useRef({ disposed: false, path: '' });
  useEffect(() => {
    const scope = lifecycle.current;
    scope.disposed = false;
    return () => {
      scope.disposed = true;
      if (scope.path) void request(scope.path, { method: 'DELETE' }).catch(() => {});
    };
  }, [request]);

  async function start() {
    setBusy(true);
    setError('');
    try {
      const { id } = await call<{ id: string }>(request, base, { method: 'POST' });
      const next = base + '/' + id;
      if (lifecycle.current.disposed) {
        await request(next, { method: 'DELETE' });
        return;
      }
      lifecycle.current.path = next;
      setPath(next);
    } catch (failure) { if (!lifecycle.current.disposed) setError(message(failure)); }
    finally { if (!lifecycle.current.disposed) setBusy(false); }
  }

  return path
    ? <Scenario path={path} mode={mode} initial={initial} />
    : <><button disabled={busy} onClick={() => void start()}>{busy ? 'Opening workspace…' : 'Start workspace'}</button>
      {error && <p role="alert">{error}</p>}
    </>;
}
