import { useState } from 'react';
import { Result } from '../react/LabWidgets';
import { useLab } from '../react/lab-context';
import { call, json, message } from './mern-client';
import type { Item, ItemList } from './mern-client';

type Mode = 'form' | 'persist' | 'crud' | 'search' | 'sort' | 'page' | 'validation' | 'error' | 'loading' | 'api-test' | 'react-test';

export function MernItems({ path, initial, mode }: { path: string; initial: string; mode: Mode }) {
  const { request } = useLab();
  const [title, setTitle] = useState(initial);
  const [result, setResult] = useState<unknown>('Ready');
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<Item>();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(initial === 'desc' ? 'desc' : 'asc');

  function list(options: Record<string, string> = {}) {
    return call<ItemList>(request, path + '/items?' + new URLSearchParams(options));
  }
  function run(action: () => Promise<unknown>) {
    setBusy(true);
    void action().then(setResult, error => setResult(message(error))).finally(() => setBusy(false));
  }
  function submit() {
    if (mode === 'validation' && title.trim().length < 3) {
      setResult('Enter at least three characters before submitting.');
      return;
    }
    run(async () => {
      const created = await call<Item>(request, path + '/items', json('POST', { title }));
      setSelected(created);
      if (mode === 'persist' || mode === 'crud') return { created, readBack: await list({ q: created.title }) };
      return { created };
    });
  }
  const creates = mode === 'form' || mode === 'crud' || mode === 'persist' || mode === 'validation' || mode === 'react-test';
  return <>
    {busy && <p role="status">Loading from Express…</p>}
    {creates && <form onSubmit={event => { event.preventDefault(); submit(); }}>
      <label>Item title <input value={title} maxLength={60} onChange={event => setTitle(event.target.value)} /></label>
      <button disabled={busy}>Save item</button>
    </form>}
    {mode === 'crud' && <div className="button-row">
      <button disabled={busy} onClick={() => run(() => list())}>Read items</button>
      <button disabled={busy || !selected} onClick={() => run(async () => {
        const updated = await call<Item>(request, path + '/items/' + selected!._id, json('PATCH', { title }));
        setSelected(updated);
        return { updated };
      })}>Update saved item</button>
      <button disabled={busy || !selected} onClick={() => run(async () => {
        await call(request, path + '/items/' + selected!._id, { method: 'DELETE' });
        const removed = selected!;
        setSelected(undefined);
        const after = await list({ q: removed.title });
        return { deleted: removed.title, remainingMatches: after.total };
      })}>Delete saved item</button>
    </div>}
    {mode === 'search' && <form onSubmit={event => { event.preventDefault(); run(() => list({ q: title })); }}>
      <label>Search title <input value={title} maxLength={60} onChange={event => setTitle(event.target.value)} /></label>
      <button disabled={busy}>Search saved items</button>
    </form>}
    {mode === 'sort' && <><label>Title order <select value={sort} onChange={event => setSort(event.target.value)}>
      <option value="asc">Ascending</option><option value="desc">Descending</option></select></label>
      <button disabled={busy} onClick={() => run(() => list({ sort }))}>Apply sort</button></>}
    {mode === 'page' && <div className="button-row">
      <button disabled={busy} onClick={() => { setPage(1); run(() => list({ page: '1' })); }}>First page</button>
      <button disabled={busy || page >= 2} onClick={() => { setPage(2); run(() => list({ page: '2' })); }}>Next page</button>
    </div>}
    {mode === 'validation' && <button disabled={busy} onClick={() => run(() => call(request, path + '/items', json('POST', { title: '' })))}>Verify server validation</button>}
    {mode === 'error' && <div className="button-row">
      <button disabled={busy} onClick={() => run(() => list({ fail: '1' }))}>Request controlled failure</button>
      <button disabled={busy} onClick={() => run(() => list())}>Retry healthy request</button>
    </div>}
    {mode === 'loading' && <button disabled={busy} onClick={() => run(() => list({ slow: '1' }))}>Load with a delay</button>}
    {mode === 'api-test' && <button disabled={busy} onClick={() => run(async () => {
      const created = await request(path + '/items', json('POST', { title: initial }));
      const invalid = await request(path + '/items', json('POST', { title: '' }));
      const read = await list({ q: initial });
      return { passed: created.status === 201 && invalid.status === 400 && read.total === 1,
        created: created.status, invalid: invalid.status, storedMatches: read.total };
    })}>Run API assertions</button>}
    {mode === 'react-test' && <p>Submit the form. The integration test exercises the same controls and checks for the stored title in the rendered result.</p>}
    <Result value={result} />
  </>;
}
