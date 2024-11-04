// store.js
import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './src/components/studentSlice';

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;
