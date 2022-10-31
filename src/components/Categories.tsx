import React from 'react';

type CategoriesProps = {
  activeIndex:number;
  onClickCategory: (i: number) => void;
}
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({activeIndex, onClickCategory}) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li key = {item+i} onClick={() => onClickCategory(i)} className={activeIndex === i ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
