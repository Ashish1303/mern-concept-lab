import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
import { createApiStore, setToken, taskApi } from './redux-api';
import type { ApiStore } from './redux-api';

const useApiDispatch = useDispatch.withTypes<ApiStore['dispatch']>();

export function ApiLab({ children, token }: { children: (workspace: string) => ReactNode; token?: string }) {
  const { request } = useLab();
  const [workspace] = useState(() => crypto.randomUUID());
  const [store] = useState(() => createApiStore(request, token));
  const lifetime = useRef({ generation: 0 });
  useEffect(() => {
    const ownership = lifetime.current;
    const mounted = ++ownership.generation;
    return () => queueMicrotask(() => {
      if (ownership.generation !== mounted) return;
      for (const task of store.dispatch(taskApi.util.getRunningQueriesThunk())) task.abort();
      for (const task of store.dispatch(taskApi.util.getRunningMutationsThunk())) task.abort();
      store.dispatch(taskApi.util.resetApiState());
    });
  }, [store]);
  return <Provider store={store}>{children(workspace)}</Provider>;
}

export function QueryOutput({ workspace, page, fail, pollingInterval = 0, manualRefresh = false, refresh = false }: {
  workspace: string;
  page?: number;
  fail?: boolean;
  pollingInterval?: number;
  manualRefresh?: boolean;
  refresh?: boolean;
}) {
  const result = taskApi.useTasksQuery({ workspace, ...(page ? { page } : {}), ...(fail ? { fail } : {}) }, { pollingInterval, refetchOnMountOrArgChange: refresh });
  const current = result.currentData;
  return <>{manualRefresh && <button disabled={result.isUninitialized || result.isFetching} onClick={() => void result.refetch()}>Refetch tasks</button>}
    <Result value={{ status: result.status, fetching: result.isFetching, titles: current?.data.map(task => task.title), read: current?.read,
      total: current?.total, error: result.error && 'status' in result.error ? result.error.status : undefined }} />
  </>;
}

export function TaskDetail({ workspace, id }: { workspace: string; id: number }) {
  const result = taskApi.useTaskQuery({ workspace, id });
  return <Result value={result.data?.title ?? (result.isError ? 'Task not found' : 'Loading task')} label="Task detail" />;
}

export function TaskEditor({ workspace, mode }: { workspace: string; mode: 'crud' | 'add' | 'rename' | 'optimistic' | 'rollback' }) {
  const query = taskApi.useTasksQuery({ workspace });
  const [add, adding] = taskApi.useAddMutation();
  const [rename, renaming] = taskApi.useRenameMutation();
  const [remove, removing] = taskApi.useRemoveMutation();
  const [title, setTitle] = useState('Practice selectors');
  const [notice, setNotice] = useState('Ready');
  const first = query.data?.data[0];
  const busy = query.isFetching || adding.isLoading || renaming.isLoading || removing.isLoading;
  const error = (value: unknown) => value && typeof value === 'object' && 'status' in value ? String(value.status) : 'request failed';
  async function save(operation: 'add' | 'rename' | 'remove') {
    setNotice('Saving');
    try {
      if (operation === 'add') await add({ workspace, title }).unwrap();
      else if (first && operation === 'remove') await remove({ workspace, id: first.id }).unwrap();
      else if (first) await rename({ workspace, id: first.id, title, fail: mode === 'rollback', optimistic: mode === 'optimistic' || mode === 'rollback' }).unwrap();
      setNotice(operation === 'remove' ? 'Deleted' : 'Saved');
    } catch (failure) {
      setNotice(mode === 'rollback' && error(failure) === '409' ? 'Rolled back (409)' : 'Save failed: ' + error(failure));
    }
  }
  return <><label>Task title <input value={title} maxLength={60} onChange={event => setTitle(event.target.value)} /></label>
    {(mode === 'crud' || mode === 'add') && <button disabled={busy || !title.trim()} onClick={() => void save('add')}>Add task</button>}
    {mode !== 'add' && <button disabled={busy || !first || !title.trim()} onClick={() => void save('rename')}>Rename first task</button>}
    {mode === 'crud' && <button disabled={busy || !first} onClick={() => void save('remove')}>Delete first task</button>}
    <Result value={{ titles: query.data?.data.map(task => task.title), read: query.data?.read, notice }} />
  </>;
}

export function Profile({ mode }: { mode: 'request' | 'gated' | 'logout' }) {
  const dispatch = useApiDispatch();
  const [requested, setRequested] = useState(false);
  const [signedIn, setSignedIn] = useState(mode === 'logout');
  const skip = mode === 'request' ? !requested : !signedIn;
  const query = taskApi.useProfileQuery(undefined, { skip });
  const profile = skip ? undefined : query.currentData?.data;
  function signIn() {
    dispatch(setToken('redux-lab-demo'));
    setSignedIn(true);
  }
  function signOut() {
    setSignedIn(false);
    dispatch(setToken(''));
    dispatch(taskApi.util.resetApiState());
  }
  return <>{mode === 'request' && <button onClick={() => setRequested(true)}>Request profile</button>}
    {mode === 'gated' && <button onClick={signIn}>Use demo session</button>}
    {mode === 'logout' && <button onClick={signOut}>Clear demo session</button>}
    <Result value={{ status: query.status, name: profile?.name, role: profile?.role,
      http: query.error && 'status' in query.error ? query.error.status : undefined }} />
  </>;
}

