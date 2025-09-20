/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// configure store with middlewear and reducers
let middleware: any = [];

middleware = [logger];

// Persist only auth slice
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['auth'], // Only persist auth slice
};

const persistedRootReducer = persistReducer(authPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([...middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const persistor = persistStore(store);

// Clear cache if isRemember is false
