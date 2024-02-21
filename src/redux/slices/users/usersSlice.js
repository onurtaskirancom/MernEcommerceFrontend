import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import baseURL from '../../../utils/baseURL';

//initialState
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
  },
};

//login action
export const loginUserAction = createAsyncThunk(
  'users/login',
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      //make the http request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
