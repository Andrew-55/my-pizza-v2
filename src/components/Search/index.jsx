import React from 'react';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search_icon.svg';

export const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="icon" />
      <input value={searchValue} onChange={(even) => setSearchValue(even.target.value)} className={styles.input} placeholder="Поиск пиццы..." />
      {searchValue && <svg onClick={() => setSearchValue("")} className={styles.clearIcon} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>}
    </div>
  );
};

export default Search;
