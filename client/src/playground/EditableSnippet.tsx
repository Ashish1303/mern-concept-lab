import { useEffect, useId, useRef, useState } from 'react';
import type { CompiledSnippet, SnippetDefinition, WorkerResult } from './types';
import { previewOrigin } from './types';

export function EditableSnippet({ definition: supplied }: { definition: SnippetDefinition }) {
  // This component is keyed by the selected example. Search changes preserve drafts.
  const [definition] = useState(supplied);
  const id = useId();
  const [code, setCode] = useState('');
  const [initial, setInitial] = useState('');
  const [activeFile, setActiveFile] = useState(definition.entry);
  const [overrides, setOverrides] = useState<Record<string,string>>({});
  const [input, setInput] = useState(definition.input?.initial ?? '');
  const [status, setStatus] = useState('Loading editable code…');
  const [busy, setBusy] = useState(true);
  const [output, setOutput] = useState('Run the snippet to see its result.');
  const [error, setError] = useState('');
  const [lastRun, setLastRun] = useState<string | null>(null);
  const [session, setSession] = useState<{ channel: string; compiled: CompiledSnippet } | null>(null);
  const worker = useRef<Worker | null>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const deadline = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const requests = useRef(new Map<number, AbortController>());
  const totalRequests = useRef(0);
  const sessionRef = useRef<typeof session>(null);
  const origin = previewOrigin();

  function stopResources() {
    clearTimeout(deadline.current);
    for (const controller of requests.current.values()) controller.abort();
    requests.current.clear();
    sessionRef.current = null;
  }
  function accept(result: WorkerResult) {
    clearTimeout(deadline.current);
    if (result.kind === 'prepared') { setCode(result.prepared.code); setInitial(result.prepared.code); setActiveFile(result.prepared.focusFile ?? definition.entry); setBusy(false); setStatus('Ready to edit.'); }
    if (result.kind === 'error') { setBusy(false); setOutput('No result. See the error below.'); setError(result.error); setStatus('Fix the code, then run again.'); }
    if (result.kind === 'checked') { setBusy(false); setOutput(result.output); setStatus('Type check complete.'); }
    if (result.kind === 'compiled') {
      const next = { channel: crypto.randomUUID(), compiled: result.compiled };
      sessionRef.current = next; setSession(next); setStatus('Starting your edited preview…');
      deadline.current = setTimeout(() => { stopResources(); setSession(null); setBusy(false); setError('The preview did not finish starting. Check that the local preview server is running.'); }, 8000);
    }
  }
  function getWorker() {
    if (!worker.current) {
      const created = new Worker(new URL('./compiler.worker.ts', import.meta.url), { type: 'module' });
      worker.current = created;
      created.onmessage = (event: MessageEvent<WorkerResult>) => { if(worker.current===created)accept(event.data); };
      created.onerror = () => { if(worker.current!==created)return; clearTimeout(deadline.current);created.terminate();worker.current=null;setBusy(false);setError('The local compiler could not load. Reload and try again.'); };
    }
    return worker.current;
  }
  useEffect(() => {
    try { getWorker().postMessage({ action: 'prepare', definition }); }
    catch { setTimeout(() => { setBusy(false); setError('This environment cannot start the browser compiler. Open the application in a browser to edit and run.'); }, 0); }
    return () => { worker.current?.terminate(); worker.current = null; stopResources(); };
    // Initial definition is owned by this keyed instance, not the changing URL search.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [definition]);
  useEffect(() => {
    const owned = requests.current;
    function receive(event: MessageEvent) {
      if (event.source !== iframe.current?.contentWindow || event.origin !== origin || !sessionRef.current) return;
      const data = event.data as { channel?: string; type?: string; value?: unknown };
      if (data.channel !== sessionRef.current.channel) return;
      if (data.type === 'running') { clearTimeout(deadline.current); setBusy(false); setOutput(previous=>previous==='Running…'?'Preview mounted. Use its controls above.':previous); setStatus('Preview running. Change its controls or edit and run again.'); }
      if (data.type === 'result') {
        clearTimeout(deadline.current); setBusy(false);
        const result=data.value && typeof data.value==='object' ? data.value as {output?:unknown;hasPreview?:unknown} : undefined;
        setOutput(String(result ? result.output : data.value).slice(0,16000)); setStatus('Run complete.');
        if(result?.hasPreview===false){stopResources();setSession(null);}
      }
      if (data.type === 'log') setOutput(previous => `${previous === 'Running…' ? '' : previous}\n${String(data.value).slice(0,4000)}`.trim().slice(-16000));
      if (data.type === 'error') { stopResources(); setSession(null); setBusy(false); setOutput('No result. See the error below.'); setError(String(data.value).slice(0,8000)); setStatus('Fix the code, then run again.'); }
      if (data.type === 'abort-request' && typeof data.value === 'number') owned.get(data.value)?.abort();
      if (data.type === 'request') {
        const request = data.value as { id?: unknown; path?: unknown; method?: unknown; body?: unknown; authorization?: unknown; contentType?: unknown } | undefined;
        if (!request || typeof request.id !== 'number') return;
        const target = event.source as Window;
        const channel = data.channel;
        const reply = (value: unknown) => target.postMessage({ channel, type:'response', value }, origin);
        const path = request.path;
        const method = String(request.method);
        const legacy = typeof path === 'string' && /^\/api\/v1\/(?:health|lab\/(?:items|ack))(?:\?[^#]*)?$/.test(path) && ['GET', 'POST'].includes(method);
        const taskPath = typeof path === 'string' && /^\/api\/v1\/lab\/redux\/[a-f0-9-]{36}\/tasks(?:\/([1-9]\d{0,5}))?(?:\?[^#]*)?$/i.exec(path);
        const tasks = taskPath && (taskPath[1] ? ['GET', 'PATCH', 'DELETE'] : ['GET', 'POST']).includes(method);
        const profile = path === '/api/v1/lab/redux/profile' && method === 'GET';
        const node = typeof path === 'string' && /^\/api\/v1\/lab\/node\/node-\d{3}\.e\d{2}$/.test(path) && method === 'POST';
        const express = typeof path === 'string' && /^\/api\/v1\/lab\/express\/express-\d{3}\.e\d{2}$/.test(path) && method === 'POST';
        const mongodb = typeof path === 'string' && /^\/api\/v1\/lab\/mongodb\/mongodb-\d{3}\.e\d{2}$/.test(path) && method === 'POST';
        const mernPath = typeof path === 'string' && /^\/api\/v1\/lab\/mern\/workspaces(?:\/([a-f0-9-]{36})(?:\/(items(?:\/[a-f0-9]{24})?|register|login|refresh|profile|editor|upload|environment))?)?(?:\?[^#]*)?$/.exec(path);
        const route = mernPath && mernPath[2];
        const mern = mernPath && (!mernPath[1] ? method === 'POST' : !route ? method === 'DELETE' :
          route === 'items' ? ['GET', 'POST'].includes(method) : route.startsWith('items/') ? ['PATCH', 'DELETE'].includes(method) :
          ['register', 'login', 'refresh', 'upload'].includes(route) ? method === 'POST' : method === 'GET');
        const users = path === '/api/v1/lab/redux/users' && method === 'GET';
        if (typeof path !== 'string' || path.length > 250 || !(legacy || tasks || profile || users || node || express || mongodb || mern) || typeof request.body === 'string' && request.body.length > 1000 || ++totalRequests.current > 64) {
          reply({ id:request.id, error:'Only the supplied, bounded lab API requests are available.' }); return;
        }
        const controller = new AbortController(); owned.set(request.id,controller);
        const timeout = setTimeout(() => controller.abort(),3000);
        const headers = new Headers();
        if (typeof request.body === 'string') headers.set('content-type', 'application/json');
        if (profile && (request.authorization === 'Bearer redux-lab-demo' || request.authorization === 'Bearer expired-demo')) {
          headers.set('authorization', request.authorization);
        }
        if (mern && (route === 'profile' || route === 'editor') && typeof request.authorization === 'string' &&
            /^Bearer [\w-]+\.[\w-]+\.[\w-]+$/.test(request.authorization) && request.authorization.length <= 520) {
          headers.set('authorization', request.authorization);
        }
        if (mern && route === 'upload' && typeof request.contentType === 'string' &&
            /^multipart\/form-data; boundary=mern-lab-[a-f0-9]{32}$/.test(request.contentType)) {
          headers.set('content-type', request.contentType);
        }
        void fetch(path, { method, headers, ...(typeof request.body === 'string' ? { body: request.body } : {}), signal:controller.signal, credentials:'omit' }).then(async response => {
          const body = await response.text();
          if (body.length > 20000) throw new Error('The API response is too large.');
          reply({ id:request.id, status:response.status, body });
        }).catch((error: unknown) => reply({ id:request.id,error:controller.signal.aborted ? 'Request cancelled.' : error instanceof Error ? error.message : 'Request failed.' })).finally(() => { clearTimeout(timeout); owned.delete(request.id as number); });
      }
    }
    window.addEventListener('message',receive);
    return () => window.removeEventListener('message',receive);
  }, [origin]);
  function stop() { worker.current?.terminate(); worker.current = null; stopResources(); setSession(null); setBusy(false); setStatus('Stopped.'); }
  function reset() { stop(); setCode(initial); setOverrides({}); setInput(definition.input?.initial ?? ''); setOutput('Run the snippet to see its result.'); setError(''); setLastRun(null); setStatus('Original snippet restored.'); }
  function run() {
    stopResources(); setSession(null); setError(''); setOutput('Running…'); setBusy(true); setStatus(definition.mode === 'typecheck' ? 'Checking your edited TypeScript…' : 'Compiling your edited snippet…'); setLastRun(JSON.stringify({code,overrides,input})); totalRequests.current = 0;
    try {
      getWorker().postMessage({ action:'compile', definition:{...definition,files:definition.files.map(file => ({...file,content:overrides[file.name] ?? file.content}))}, code, input });
      deadline.current = setTimeout(() => { stop(); setError('The compiler took too long. Try a smaller snippet.'); },30000);
    } catch (error) { setBusy(false); setError(error instanceof Error ? error.message : 'Compilation could not start.'); }
  }
  const displayedCode = activeFile === definition.entry ? code : overrides[activeFile] ?? definition.files.find(file => file.name===activeFile)?.content ?? '';
  return <section className="editable-snippet" aria-label="Editable code playground">
    <header><h3>Edit the code and run it</h3><p>{definition.mode === 'typecheck' ? 'This fixture includes deliberately invalid statements. Run the real type checker, fix the errors, and try again. Server/database code is not executed.' : 'Change the selected example’s code, then Run. Your edits execute in their own preview; compare them with the original demo below.'}</p></header>
    <div className="snippet-grid"><div>
      <label>Code file<select aria-label="Code file" value={activeFile} onChange={event => setActiveFile(event.target.value)}>{definition.files.filter(file => !file.name.startsWith('server/')).map(file => <option key={file.name} value={file.name}>{file.name===definition.entry ? 'Selected example' : file.name.split('/').at(-1)}</option>)}</select></label>
      <label htmlFor={id}>Editable {activeFile.endsWith('tsx') ? 'TSX' : 'TypeScript'} snippet</label>
      <textarea id={id} aria-label="Editable code" value={displayedCode} onChange={event => { const value=event.target.value; if (activeFile===definition.entry) setCode(value); else setOverrides(previous=>({...previous,[activeFile]:value})); }} spellCheck={false} autoCapitalize="off" autoCorrect="off" wrap="soft" maxLength={30000} rows={Math.min(26,Math.max(12,displayedCode.split('\n').length + 6))} disabled={!initial} />
      {definition.input && <label>Snippet input · {definition.input.label}<input aria-label="Snippet input" value={input} maxLength={1000} onChange={event => setInput(event.target.value)} /></label>}
      <div className="button-row"><button className="primary" aria-label="Run snippet" onClick={run} disabled={busy || !initial}>Run</button><button className="secondary" aria-label="Reset snippet" onClick={reset} disabled={!initial}>Reset</button><button className="secondary" aria-label="Stop snippet" onClick={stop} disabled={!initial || !busy && !session}>Stop</button></div>
      <p className="muted" role="status">{status}{lastRun !== null && JSON.stringify({code,overrides,input}) !== lastRun ? ' Changes have not run yet.' : ''}</p>
    </div><div>
      <h4>{definition.mode === 'typecheck' ? 'Compiler output' : 'Your edited result'}</h4>
      {session && <iframe ref={iframe} key={session.channel} title="Edited snippet preview" src={`${origin}/sandbox`} sandbox="allow-scripts allow-same-origin allow-forms" referrerPolicy="no-referrer" onLoad={() => iframe.current?.contentWindow?.postMessage({ type:'start', channel:session.channel, compiled:session.compiled },origin)} />}
      <pre data-testid="snippet-output" aria-label="Snippet output" aria-live="polite">{output}</pre>
      {error && <div className="snippet-error" role="alert"><strong>Snippet error</strong><pre>{error}</pre></div>}
    </div></div>
    <p className="muted">{definition.mode === 'typecheck' ? 'Type checking uses the installed TypeScript version and the lesson’s real library declarations.' : 'Syntax is compiled locally. The preview uses production React; use the compiler lessons for full type diagnostics. Reset restores code and input. Browser storage policies apply inside the preview.'}</p>
  </section>;
}
