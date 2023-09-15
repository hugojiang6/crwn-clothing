// react library
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// component
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
// utils
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
// store
import { setCategories } from '../../store/categories/categories.action';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoriesArray));
    };

    getCategoriesMap();
  }, [dispatch]);

  // useEffect(() => {
  //   getCategoriesAndDocuments()
  //     .then((categoriesArray) => {
  //       dispatch(setCategories(categoriesArray));
  //     })
  //     .catch((err) => console.log(err));
  // }, [dispatch]
  // );

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
