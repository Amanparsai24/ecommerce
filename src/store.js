import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import homeReducer from './slices/home';
import adminReducer from './slices/admin';
export default configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    admin:adminReducer,

  },
})