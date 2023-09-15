// react library
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// component
import ProductCard from '../../component/product-card/product-card.component';
// style
import { CategoryContainer, CategoryTitle } from './category.styles';
// store
import { selectCategoriesMap } from '../../store/categories/categories.select';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    categoriesMap && setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
