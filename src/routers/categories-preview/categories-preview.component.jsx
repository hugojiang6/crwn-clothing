// react library
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
// component
import CategoryPreview from '../../component/category-preview/category-preview.component';
import { selectCategoriesMap } from '../../store/categories/categories.select';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {categoriesMap && Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];

        return <CategoryPreview key={title} title={title} products={products} />;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
