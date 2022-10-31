import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { list as sortList } from '../components/Sort';
import { selectorSort } from '../redux/filter/selectors';
import { selectorPizzas } from '../redux/pizza/selectors';
import { FetchPizzasArgs } from '../redux/pizza/types';
import { fetchPizzas } from '../redux/pizza/slice';

const Home: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sortType, ascdesc, currentPage, searchValue } = useSelector(selectorSort);
  const { items, status } = useSelector(selectorPizzas);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const search = searchValue ? `&search=${searchValue}` : '';

  const onchangeCategory = React.useCallback(
    (i: number) => {
      dispatch(setCategoryId(i));
    },
    [dispatch],
  );

  const onChagePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const axiosPizzas = React.useCallback(async () => {
    dispatch(
      // @ts-ignore
      fetchPizzas({ categoryId, sortType, ascdesc, currentPage, search }),
    );
  }, [categoryId, sortType, ascdesc, currentPage, search, dispatch]);

  React.useEffect(() => {
    if (isMounted.current) {
      const querystring = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        ascdesc: ascdesc ? 'asc' : 'desc',
        currentPage,
      });
      navigator(`?${querystring}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, ascdesc, currentPage, navigator]);

  React.useEffect(() => {
    if (!isSearch.current) {
      axiosPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [axiosPizzas]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FetchPizzasArgs;
      const sortType = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      if (sortType) {
        params.sortType = sortType;
      }

      dispatch(setFilters({ ...params }));
      isSearch.current = true;
    }
  }, [dispatch]);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={categoryId} onClickCategory={onchangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Что-то пошло не так 😕</h2>
          <p>Попробуйте повторить позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChagePage} />
    </div>
  );
};

export default Home;
