import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { LabRequest } from '../react/lab-context';
import { ApiError, call, json, message } from './mern-client';
import type { Item, ItemList } from './mern-client';

type RequestArgs = { path: string; init?: RequestInit };
type QueryError = { status: number; message: string };

const baseQuery: BaseQueryFn<RequestArgs, unknown, QueryError> = async ({ path, init }, api) => {
  try {
    const request = api.extra as LabRequest;
    return { data: await call(request, path, { ...init, signal: api.signal }) };
  } catch (error) {
    return { error: { status: error instanceof ApiError ? error.status : 0, message: message(error) } };
  }
};

export const mernQuery = createApi({
  reducerPath: 'mernApi',
  baseQuery,
  tagTypes: ['Items'],
  endpoints: builder => ({
    items: builder.query<ItemList, string>({
      query: path => ({ path: path + '/items' }),
      providesTags: ['Items']
    }),
    create: builder.mutation<Item, { path: string; title: string }>({
      query: ({ path, title }) => ({ path: path + '/items', init: json('POST', { title }) }),
      invalidatesTags: (_result, error) => error ? [] : ['Items']
    }),
    rename: builder.mutation<Item, { path: string; id: string; title: string; reject: boolean }>({
      query: ({ path, id, title, reject }) => ({ path: path + '/items/' + id, init: json('PATCH', { title, reject }) }),
      invalidatesTags: (_result, error) => error ? [] : ['Items'],
      async onQueryStarted({ path, id, title }, { dispatch, queryFulfilled }) {
        const patch = dispatch(mernQuery.util.updateQueryData('items', path, draft => {
          const item = draft.rows.find(row => row._id === id);
          if (item) item.title = title;
        }));
        try { await queryFulfilled; }
        catch { patch.undo(); }
      }
    })
  })
});

export function createMernStore(request: LabRequest) {
  return configureStore({
    reducer: { [mernQuery.reducerPath]: mernQuery.reducer },
    middleware: defaults => defaults({ thunk: { extraArgument: request } }).concat(mernQuery.middleware)
  });
}
