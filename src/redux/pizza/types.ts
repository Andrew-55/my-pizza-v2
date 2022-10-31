import { SortType } from '../filter/types';

export type FetchPizzasArgs = {
  categoryId: string;
  sortType: SortType;
  ascdesc: string;
  currentPage: string;
  search: string;
  sortProperty: string;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};
