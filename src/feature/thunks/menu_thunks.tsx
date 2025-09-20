import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IMenuCategoriesRequestParams,
  IMenuSubcategoriesRequestParams,
  IMenuItemsRequestParams,
  IMenuError,
} from '../redux_models/menu_model';
import {
  requestMenuCategoriesService,
  requestMenuSubcategoriesService,
  requestMenuItemsService,
} from '../services/api_calls/menu_service';
import { AxiosError } from 'axios';

// Menu Categories Thunks -----
export const requestMenuCategories = createAsyncThunk(
  '@/menu/pos/categories',
  async (params: IMenuCategoriesRequestParams, { rejectWithValue }) => {
    try {
      const response = await requestMenuCategoriesService(params);
      return response?.data;
    } catch (err: any) {
      const error: AxiosError<IMenuError> = err;
      if (!error) {
        throw err;
      }
      return rejectWithValue(error);
    }
  },
);

// Menu Subcategories Thunks -----
export const requestMenuSubcategories = createAsyncThunk(
  '@/menu/pos/categories/subcategories',
  async (params: IMenuSubcategoriesRequestParams, { rejectWithValue }) => {
    try {
      const response = await requestMenuSubcategoriesService(params);
      return response?.data;
    } catch (err: any) {
      const error: AxiosError<IMenuError> = err;
      if (!error) {
        throw err;
      }
      return rejectWithValue(error);
    }
  },
);

// Menu Items Thunks -----
export const requestMenuItems = createAsyncThunk(
  '@/menu/pos/menu-items',
  async (params: IMenuItemsRequestParams, { rejectWithValue }) => {
    try {
      const response = await requestMenuItemsService(params);
      return response?.data;
    } catch (err: any) {
      const error: AxiosError<IMenuError> = err;
      if (!error) {
        throw err;
      }
      return rejectWithValue(error);
    }
  },
);

// End Menu Categories Thunks -----
