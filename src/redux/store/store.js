import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slices/products/productSlices';
import usersReducer from '../slices/users/usersSlice';

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
  },
});

export default store;
