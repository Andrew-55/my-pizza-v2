import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasArgs, Pizza } from './types';

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { categoryId, sortType, ascdesc, currentPage, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6353c277e64783fa82783516.mockapi.io/items?page=${currentPage}&limit=4&${
        Number(categoryId) > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=${ascdesc ? 'asc' : 'desc'}${search}`,
    );
    return data;
  },
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
