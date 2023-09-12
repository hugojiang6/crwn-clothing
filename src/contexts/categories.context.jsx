import { createContext, useState, useEffect } from 'react';

import {
  // addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils.js';

// import SHOP_DATA from '../shop-data.js';

// createContext Initialization
export const CategoriesContext = createContext({
  categoriesMap: {},
});
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<< provider >>>>>>>>>>>>>>>>>>>>>>>
export const CategoriesProvider = ({ children }) => {
  // 產品物件狀態
  const [categoriesMap, setCategoriesMap] = useState({});

  // useEffect(()=> {
  //   const getCategoriesMap = async () => {
  //     const categoryMap = await getCategoriesAndDocuments()
  //     console.log(categoryMap);
  //   }
  //   getCategoriesMap()
  // },[])

  // 抓取Firestore
  useEffect(() => {
    getCategoriesAndDocuments()
      .then((getcategoriesMap) => {
        setCategoriesMap(getcategoriesMap);
      })
      .catch((err) => console.log(err));
  }, []);

  // JSON資料寫入Firestore
  // useEffect(()=>{
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // },[])

  return (
    <CategoriesContext.Provider value={{ categoriesMap, setCategoriesMap }}>{children}</CategoriesContext.Provider>
  );
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
