import { createSelector } from '@reduxjs/toolkit';

// 方式3. 提取的資料如果每次都相同，使用createSelector避免重複運算，
// 同時避免第一次遍例上下文時，發生資料無法運算的問題。
const selectCategoryReducer = (state) => {
  // console.log('1')
  // console.log('state.categories: ', state.categories);
  return state.categories;
};

export const selectCategories = createSelector([selectCategoryReducer], (categoriesSlice) => {
  // console.log('2')
  // console.log('categoriesSlice.categories: ', categoriesSlice.categories);
  return categoriesSlice.categories;
});

export const selectCategoriesMap = createSelector([selectCategories], (categories) => {
  // console.log('3')
  // console.log('categories: ', categories);
  return categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    // console.log('categories: ', acc);
    return acc;
  }, {});
});

// 方式1. 提取store內的state
// export const selectCategoriesMap = (state) => state.categories.categories;

// 方式2. 提取store內的state，把firebase.utils.js內的運算式轉移至此處處理數據
// export const selectCategoriesMap = (state) => {
//   console.log('selector fired');
//   return (
    
//     state.categories.categories.reduce((acc, category) => {
//       const { title, items } = category;
//       acc[title.toLowerCase()] = items;
//       return acc;
//     }, {})
//   );
// };
