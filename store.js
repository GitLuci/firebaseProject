import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './reducers/currentUserSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});
