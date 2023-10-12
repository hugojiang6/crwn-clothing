// react library
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
// component
import CategoryPreview from '../../component/category-preview/category-preview.component';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/categories.select';
import Spinner from '../../component/spinner/spinner.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        categoriesMap &&
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];

          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
