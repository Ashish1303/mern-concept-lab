import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { LabRequest } from './lab-context';

type Task = { id: number; title: string };
type Tasks = { data: Task[]; total: number; read: number };
type TasksArg = { workspace: string; page?: number; fail?: boolean };
type Rename = { workspace: string; id: number; title: string; fail?: boolean; optimistic?: boolean };

const session = createSlice({
  name: 'demoSession',
  initialState: { token: '' },
  reducers: { setToken(state, action: PayloadAction<string>) { state.token = action.payload; } }
});
export const { setToken } = session.actions;

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = (args, api, extraOptions) => {
  const request = api.extra as LabRequest;
  return fetchBaseQuery({
    baseUrl: new URL('/api/v1/lab/redux/', location.origin).href,
    prepareHeaders(headers, { endpoint, getState }) {
      const { demoSession } = getState() as { demoSession: { token: string } };
      if (endpoint === 'profile' && demoSession.token) headers.set('authorization', 'Bearer ' + demoSession.token);
      return headers;
    },
    fetchFn: async input => {
      const incoming = input as Request;
      const url = new URL(incoming.url);
      return request(url.pathname + url.search, {
        method: incoming.method,
        headers: incoming.headers,
        signal: incoming.signal,
        ...(incoming.body ? { body: await incoming.text() } : {})
      });
    }
  })(args, api, extraOptions);
};

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery,
  tagTypes: ['Task'],
  keepUnusedDataFor: 1,
  endpoints: builder => ({
    tasks: builder.query<Tasks, TasksArg>({
      query: ({ workspace, page, fail }) => ({ url: workspace + '/tasks', params: { page, fail: fail ? 1 : undefined } }),
      providesTags: (response, _error, { workspace }) => [
        { type: 'Task', id: workspace + ':LIST' },
        ...(response?.data ?? []).map(task => ({ type: 'Task' as const, id: workspace + ':' + task.id }))
      ]
    }),
    task: builder.query<Task, { workspace: string; id: number }>({
      query: ({ workspace, id }) => workspace + '/tasks/' + id,
      transformResponse: (body: { data: Task }) => body.data,
      providesTags: (_data, _error, { workspace, id }) => [{ type: 'Task', id: workspace + ':' + id }]
    }),
    add: builder.mutation<{ data: Task }, { workspace: string; title: string }>({
      query: ({ workspace, title }) => ({ url: workspace + '/tasks', method: 'POST', body: { title } }),
      invalidatesTags: (data, _error, { workspace }) => data ? [{ type: 'Task', id: workspace + ':LIST' }] : []
    }),
    rename: builder.mutation<{ data: Task }, Rename>({
      query: ({ workspace, id, title, fail }) => ({ url: workspace + '/tasks/' + id, method: 'PATCH', body: { title, fail } }),
      invalidatesTags: (data, _error, { workspace, id }) => data ? [{ type: 'Task', id: workspace + ':' + id }] : [],
      async onQueryStarted({ workspace, id, title, optimistic }, { dispatch, queryFulfilled }) {
        if (!optimistic) return;
        const list = dispatch(taskApi.util.updateQueryData('tasks', { workspace }, draft => {
          const task = draft.data.find(task => task.id === id);
          if (task) task.title = title;
        }));
        const detail = dispatch(taskApi.util.updateQueryData('task', { workspace, id }, draft => { draft.title = title; }));
        try { await queryFulfilled; }
        catch { detail.undo(); list.undo(); }
      }
    }),
    remove: builder.mutation<{ data: { id: number } }, { workspace: string; id: number }>({
      query: ({ workspace, id }) => ({ url: workspace + '/tasks/' + id, method: 'DELETE' }),
      invalidatesTags: (data, _error, { workspace, id }) => data ? [
        { type: 'Task', id: workspace + ':LIST' }, { type: 'Task', id: workspace + ':' + id }
      ] : []
    }),
    profile: builder.query<{ data: { name: string; role: string } }, void>({ query: () => 'profile' })
  })
});

export function createApiStore(request: LabRequest, token = '') {
  return configureStore({
    reducer: { [taskApi.reducerPath]: taskApi.reducer, demoSession: session.reducer },
    preloadedState: { demoSession: { token } },
    middleware: defaults => defaults({ thunk: { extraArgument: request } }).concat(taskApi.middleware)
  });
}
export type ApiStore = ReturnType<typeof createApiStore>;
