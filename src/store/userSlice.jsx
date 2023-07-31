import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
const baseURL = import.meta.env.VITE_REACT_APP_API_URI;

const initialState = {
  data: {
    id: '',
    username: '',
    email: '',
    roles: [],
  },
  isLogged: false,
  status: 'idle', // idle, loading, succeeded and failed
  error: null
}

export const login = createAsyncThunk('fetch/User', async (userData) => {
  const response = await axiosInstance.post(baseURL + '/api/login', userData, { withCredentials: true });
  if (response.data.error) throw response.data.error
  return {
    accessToken: response.data.accessToken,
    user: response.data.user
  }
})

export const getUserData = createAsyncThunk('set/User', async () => {
  const response = await axiosInstance.post(baseURL + '/api/user', {}, { withCredentials: true });
  if (response.data.error) throw response.data.error
  return {
    accessToken: response.data.accessToken,
    user: response.data.data
  }
})

export const logout = createAsyncThunk('clear/User', async () => {
  await axiosInstance.post(baseURL + '/api/logout', {}, { withCredentials: true });
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: null,
  extraReducers: builder => {
    builder
    
      // LOGIN
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.isLogged = true;
        state.data = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // GETUSERDATA
      .addCase(getUserData.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.isLogged = true;
        state.data = action.payload.user
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogged = false;
        state.error = null;
      })
      
      // LOGOUT
      .addCase(logout.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
        state.isLogged = false;
        state.data = initialState.data
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogged = true;
        state.error = action.error.message;
      })
    }
})

export default userSlice.reducer;