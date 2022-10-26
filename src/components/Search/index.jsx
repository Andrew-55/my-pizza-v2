import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search_icon.svg';
import { SearchContext } from '../../App';

export const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickclear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const debounceUpdatesearchValue = React.useMemo (
    () => debounce((str) => {
      setSearchValue(str);
    }, 500),
    [setSearchValue]
  )

  const updateSearchValue = React.useCallback(
    (str) => {
      debounceUpdatesearchValue(str);
    }, 
    [debounceUpdatesearchValue],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="icon" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={() => onClickclear()}
          className={styles.clearIcon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
