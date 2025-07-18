import { combineReducers } from '@reduxjs/toolkit';
import auth_slice from './slices/auth_slice';

const rootReducer = combineReducers({
  auth: auth_slice.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
