import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IOrdersListParams } from '@/feature/redux_models/orders_model';
import { requestOrdersListService } from '@/feature/services/api_calls/orders_service';

export interface IOrdersError {
  status?: number;
  message?: string;
  errors?: any;
}

export const requestOrdersListData = createAsyncThunk(
  '@/orders/list',
  async (params: IOrdersListParams, { rejectWithValue }) => {
    try {
      const response = await requestOrdersListService(params);
      return response?.data;
    } catch (err: any) {
      const error: AxiosError<IOrdersError> = err;
      if (!error) {
        throw err;
      }
      return rejectWithValue(error);
    }
  },
);
