// react library
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// component
import ProductCard from '../../component/product-card/product-card.component';
import Spinner from '../../component/spinner/spinner.component';
// style
import { CategoryContainer, CategoryTitle } from './category.styles';
// store
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/categories.select';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    categoriesMap && setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
