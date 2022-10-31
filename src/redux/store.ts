import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartSlice from './cart/slice';

import filterReducer from './filter/slice';
import pizzas from './pizza/slice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartSlice,
    pizzas,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
