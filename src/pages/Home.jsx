import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectorSort, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectorPizzas } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { list as sortList } from '../components/Sort';

const Home = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort: sortType, ascdesc, currentPage, searchValue } = useSelector(selectorSort);
  const {items, status } = useSelector(selectorPizzas);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const search = searchValue ? `&search=${searchValue}` : '';

  const onChagePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const axiosPizzas = React.useCallback(async () => {

    dispatch(fetchPizzas({categoryId, sortType, ascdesc, currentPage, search}));
    
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
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={categoryId} onClickCategory={(i) => dispatch(setCategoryId(i))} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === "error" ? (<div className="content__error-info">
          <h2>Что-то пошло не так 😕</h2>
          <p>Попробуйте повторить позже</p>
        </div>) : (<div className="content__items">{status === "loading" ? skeletons : pizzas}</div>)
      }
      <Pagination currentPage={currentPage} onChangePage={(number) => onChagePage(number)} />
    </div>
  );
};

export default Home;
