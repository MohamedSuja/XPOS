import { combineReducers } from '@reduxjs/toolkit';
import auth_slice from './slices/auth_slice';
import orders_slice from './slices/orders_slice';
import menu_slice from './slices/menu_slice';

const rootReducer = combineReducers({
  auth: auth_slice.reducer,
  orders: orders_slice.reducer,
  menu: menu_slice.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
