import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
const counter = createSlice({ name: 'typeFixture', initialState: { count: 0 }, reducers: { add(state, action: PayloadAction<number>) { state.count += action.payload; } } });
export const store = configureStore({ reducer: { counter: counter.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
store.dispatch(counter.actions.add(2));
// @ts-expect-error -- The real action creator requires a numeric payload.
store.dispatch(counter.actions.add('2'));
