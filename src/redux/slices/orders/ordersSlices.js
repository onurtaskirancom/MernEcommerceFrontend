import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import {
  resetErrAction,
  resetSuccessAction,
} from '../globalActions/globalActions';
const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

//initalsState
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
};

//create product action
export const placeOrderAction = createAsyncThunk(
  'order/place-order',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { orderItems, shippingAddress, totalPrice } = payload;
      //token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      //request
      const { data } = await axios.post(
        `${baseURL}/orders`,
        {
          orderItems,
          shippingAddress,
          totalPrice,
        },
        config
      );
      return window.open(data?.url);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch product action
export const fetchOrdersAction = createAsyncThunk(
  'orders/list',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/orders`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetch product action
export const fetchOderAction = createAsyncThunk(
  'orders/details',
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${baseURL}/orders/${productId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(placeOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(placeOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.isAdded = true;
    });

    builder.addCase(placeOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchOrdersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrdersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrdersAction.rejected, (state, action) => {
      state.loading = false;
      state.orders = null;
      state.error = action.payload;
    });
    //fetch single
    builder.addCase(fetchOderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchOderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.error = action.payload;
    });
    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate the reducer
const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
