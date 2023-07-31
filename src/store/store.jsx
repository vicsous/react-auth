import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/userSlice';
import counterSlice from './counterSlice';

export default configureStore({
  reducer: {
    user: userSlice, 
    counter: counterSlice
  }
});
