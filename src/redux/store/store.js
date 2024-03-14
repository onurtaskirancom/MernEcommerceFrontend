import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../slices/categories/categoriesSlice';
import productReducer from '../slices/products/productSlices';
import usersReducer from '../slices/users/usersSlice';

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;
