import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { Result } from '../react/LabWidgets';
import { useLab } from '../react/lab-context';
import { createMernStore, mernQuery } from './mern-query';

function QueryView({ path, optimistic, initial }: { path: string; optimistic: boolean; initial: string }) {
  const query = mernQuery.useItemsQuery(path);
  const [create, createState] = mernQuery.useCreateMutation();
  const [rename, renameState] = mernQuery.useRenameMutation();
  const [title, setTitle] = useState(initial);
  const [notice, setNotice] = useState('Ready');
  const pending = createState.isLoading || renameState.isLoading || query.isFetching;
  const first = query.data?.rows[0];

  async function update(reject: boolean) {
    if (!first) return;
    setNotice('Saving…');
    try {
      await rename({ path, id: first._id, title, reject }).unwrap();
      setNotice('Saved in MongoDB');
    } catch { setNotice('Write rejected. Restoring the previous cached title.'); }
  }

  return <>
    <label>Item title <input value={title} maxLength={60} onChange={event => setTitle(event.target.value)} /></label>
    {optimistic ? <>
      <button disabled={pending || !first} onClick={() => void update(true)}>Rename with forced rollback</button>
      <button disabled={pending || !first} onClick={() => void update(false)}>Save optimistic edit</button>
    </> : <button disabled={pending} onClick={() => {
      setNotice('Saving…');
      void create({ path, title }).unwrap().then(() => setNotice('Saved. The list tag was invalidated.'), () => setNotice('The create request failed.'));
    }}>Create and invalidate list</button>}
    <Result value={{ status: query.status, rows: query.data?.rows.map(row => row.title), total: query.data?.total, notice }} />
  </>;
}

export function MernQueryDemo({ path, initial, optimistic }: { path: string; initial: string; optimistic: boolean }) {
  const { request } = useLab();
  const [store] = useState(() => createMernStore(request));
  const lifecycle = useRef({ revision: 0 });
  useEffect(() => {
    const owner = lifecycle.current;
    const revision = ++owner.revision;
    return () => queueMicrotask(() => {
      if (owner.revision !== revision) return;
      for (const query of store.dispatch(mernQuery.util.getRunningQueriesThunk())) query.abort();
      for (const mutation of store.dispatch(mernQuery.util.getRunningMutationsThunk())) mutation.abort();
      store.dispatch(mernQuery.util.resetApiState());
    });
  }, [store]);
  return <Provider store={store}><QueryView path={path} initial={initial} optimistic={optimistic} /></Provider>;
}
