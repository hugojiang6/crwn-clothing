// library
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// component
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
// store
import { fetchCategoriesStartAsync } from '../../store/categories/categories.action';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStartAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
