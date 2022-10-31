import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchPizzasArgs } from '../pizza/types';
import { FilterSliceState, SortPropertyEnum, SortType } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING,
  },
  ascdesc: true,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setAscdesc(state, action: PayloadAction<boolean>) {
      state.ascdesc = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FetchPizzasArgs>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
      state.ascdesc = action.payload.ascdesc === 'asc' ? true : false;
    },
  },
});

export const { setCategoryId, setSort, setAscdesc, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
