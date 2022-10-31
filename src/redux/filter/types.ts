export enum SortPropertyEnum {
    RATING = 'rating',
    TITLE = 'title',
    PRICE = 'price',
  }

export type SortType = {
    name: string;
    sortProperty: SortPropertyEnum.RATING | SortPropertyEnum.TITLE | SortPropertyEnum.PRICE;
  };
  
  export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sortType: SortType;
    ascdesc: boolean | string;
  }