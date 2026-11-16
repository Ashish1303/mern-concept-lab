import { useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router';
import { Result } from '../react/LabWidgets';
import { RouterLab } from '../react/RouterLab';
import { useLab } from '../react/lab-context';
import type { LabRequest } from '../react/lab-context';
import { ApiError, call, json, message, samplePassword, withAccess } from './mern-client';
import type { Session } from './mern-client';

type Mode = 'register' | 'login' | 'hash' | 'jwt' | 'refresh' | 'protected' | 'roles';
type Profile = { username: string; role: string; signed: boolean };

function ProtectedView({ session, request, path }: { session?: Session; request: LabRequest; path: string }) {
  const [profile, setProfile] = useState<unknown>('The route is authorized. Load the server profile.');
  return <><button onClick={() => {
    if (session) void call<Profile>(request, path + '/profile', withAccess(session.access)).then(setProfile, error => setProfile(message(error)));
  }}>Load protected profile</button><Result value={profile} /></>;
}

export function MernAuth({ path, initial, mode }: { path: string; initial: string; mode: Mode }) {
  const { request } = useLab();
  const [username, setUsername] = useState(initial);
  const [result, setResult] = useState<unknown>('Ready');
  const [current, setCurrent] = useState<Session>();
  const [previousRefresh, setPreviousRefresh] = useState('');
  const [busy, setBusy] = useState(false);
  function run(action: () => Promise<unknown>) {
    setBusy(true);
    void action().then(setResult, error => setResult(message(error))).finally(() => setBusy(false));
  }
  const register = () => call<{ username: string; role: string; saltedHashStored: boolean }>(
    request, path + '/register', json('POST', { username, password: samplePassword }));
  async function login(asEditor = false) {
    const credential = asEditor ? { username: 'lab-editor', password: 'lab-editor-sample' } : { username, password: samplePassword };
    const answer = await call<Session>(request, path + '/login', json('POST', credential));
    setCurrent(answer);
    setPreviousRefresh('');
    return { authenticated: true, role: answer.role };
  }
  async function createForDemo() {
    try { await register(); }
    catch (error) { if (!(error instanceof ApiError) || error.status !== 409) throw error; }
    return login();
  }
  return <>
    <p>The exercise uses a sample password. Choose a synthetic teaching username.</p>
    <label>Teaching username <input value={username} maxLength={24} onChange={event => setUsername(event.target.value)} /></label>
    {(mode === 'register' || mode === 'hash' || mode === 'login') && <button disabled={busy} onClick={() => run(register)}>Register sample account</button>}
    {mode === 'login' && <button disabled={busy} onClick={() => run(() => login())}>Sign in</button>}
    {mode === 'hash' && <button disabled={busy} onClick={() => run(async () => {
      const answer = await login();
      return { ...answer, passwordVerified: true };
    })}>Verify against the stored hash</button>}
    {['jwt', 'refresh', 'protected', 'roles'].includes(mode) && <button disabled={busy} onClick={() => run(createForDemo)}>Prepare reader session</button>}
    {mode === 'jwt' && <div className="button-row">
      <button disabled={busy} onClick={() => run(() => call(request, path + '/profile'))}>Request without a token</button>
      <button disabled={busy || !current} onClick={() => run(async () => ({
        profile: await call<Profile>(request, path + '/profile', withAccess(current!.access)),
        tokenSegments: current!.access.split('.').length
      }))}>Verify signed access token</button>
    </div>}
    {mode === 'refresh' && <div className="button-row">
      <button disabled={busy || !current} onClick={() => run(async () => {
        const refreshed = await call<Session>(request, path + '/refresh', json('POST', { refresh: current!.refresh }));
        setPreviousRefresh(current!.refresh);
        setCurrent(refreshed);
        return { rotated: refreshed.refresh !== current!.refresh,
          profile: await call<Profile>(request, path + '/profile', withAccess(refreshed.access)) };
      })}>Rotate refresh value</button>
      <button disabled={busy || !previousRefresh} onClick={() => run(() => call(request, path + '/refresh', json('POST', { refresh: previousRefresh })))}>Retry the previous value</button>
    </div>}
    {mode === 'protected' && <RouterLab><Link to="/private">Open the private route</Link><Routes>
      <Route path="/" element={<p>Open the route to check the client guard.</p>} />
      <Route path="/private" element={current ? <ProtectedView session={current} request={request} path={path} /> : <Navigate to="/signin" replace />} />
      <Route path="/signin" element={<p role="status">Redirected to sign-in. Prepare a reader session and try again.</p>} />
    </Routes></RouterLab>}
    {mode === 'roles' && <div className="button-row">
      <button disabled={busy} onClick={() => run(() => login(true))}>Use the editor fixture</button>
      <button disabled={busy || !current} onClick={() => run(() => call(request, path + '/editor', withAccess(current!.access)))}>Request editor resource</button>
    </div>}
    <Result value={result} />
  </>;
}
