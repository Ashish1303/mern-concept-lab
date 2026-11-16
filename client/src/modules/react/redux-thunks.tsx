import { useEffect, useRef, useState } from 'react';
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
import type { LabRequest } from './lab-context';

type User = { id: number; name: string };
const loadUsers = createAsyncThunk<User[], boolean, { extra: LabRequest; rejectValue: string }>(
  'users/load', async (fail, { extra: request, signal, rejectWithValue }) => {
    const response = await request(fail ? '/api/v1/lab/items?fail=1&delay=250' : '/api/v1/lab/redux/users', { signal });
    if (!response.ok) return rejectWithValue('HTTP ' + response.status);
    const body = await response.json() as { data: User[] };
    return body.data;
  }
);

const users = createSlice({
  name: 'users',
  initialState: { status: 'idle', names: [] as string[], error: '', requestId: '' },
  reducers: {},
  extraReducers: builder => builder
    .addCase(loadUsers.pending, (state, action) => {
      state.status = 'pending';
      state.requestId = action.meta.requestId;
      state.error = '';
    })
    .addCase(loadUsers.fulfilled, (state, action) => {
      if (state.requestId !== action.meta.requestId) return;
      state.status = 'fulfilled';
      state.names = action.payload.map(user => user.name);
    })
    .addCase(loadUsers.rejected, (state, action) => {
      if (state.requestId !== action.meta.requestId) return;
      state.status = action.meta.aborted ? 'cancelled' : 'rejected';
      state.error = action.payload ?? action.error.message ?? 'Request failed';
    })
});

function createUsersStore(request: LabRequest) {
  return configureStore({
    reducer: { users: users.reducer },
    middleware: defaults => defaults({ thunk: { extraArgument: request } })
  });
}
type Store = ReturnType<typeof createUsersStore>;
const useUserDispatch = useDispatch.withTypes<Store['dispatch']>();

function Controls({ mode }: { mode: 'load' | 'cancel' | 'failure' | 'unwrap' }) {
  const dispatch = useUserDispatch();
  const { status, names, error } = useSelector((state: ReturnType<Store['getState']>) => state.users);
  const current = useRef<ReturnType<ReturnType<typeof loadUsers>> | null>(null);
  const [notice, setNotice] = useState('');
  useEffect(() => () => current.current?.abort(), []);
  function run(fail: boolean) {
    setNotice('');
    current.current?.abort();
    const task = dispatch(loadUsers(fail));
    current.current = task;
    if (mode === 'unwrap') void task.unwrap().catch((failure: unknown) => setNotice('Caught: ' + String(failure)));
  }
  return <>{mode === 'load' && <button disabled={status === 'pending'} onClick={() => run(false)}>Fetch users</button>}
    {mode !== 'load' && <button disabled={status === 'pending'} onClick={() => run(true)}>Fetch failing users</button>}
    {mode === 'cancel' && <button disabled={status !== 'pending'} onClick={() => current.current?.abort()}>Cancel request</button>}
    <Result value={{ status, names, error, notice }} />
  </>;
}

export function UsersLab({ mode }: { mode: 'load' | 'cancel' | 'failure' | 'unwrap' }) {
  const { request } = useLab();
  const [store] = useState(() => createUsersStore(request));
  return <Provider store={store}><Controls mode={mode} /></Provider>;
}
