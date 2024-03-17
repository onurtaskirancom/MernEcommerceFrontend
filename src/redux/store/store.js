import { configureStore } from '@reduxjs/toolkit';
import brandsReducer from '../slices/categories/brandsSlice';
import categoryReducer from '../slices/categories/categoriesSlice';
import colorsReducer from '../slices/categories/colorsSlice';
import productReducer from '../slices/products/productSlices';
import usersReducer from '../slices/users/usersSlice';

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    colors: colorsReducer,
  },
});

export default store;
