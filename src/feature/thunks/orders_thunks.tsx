import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  IOrdersListParams,
  IOrderSummaryParams,
} from '@/feature/redux_models/orders_model';
import {
  requestOrderAcceptService,
  requestOrderDetailsService,
  requestOrderMarkDeliveredService,
  requestOrderMarkPreparingService,
  requestOrderMarkReadyService,
  requestOrderRejectService,
  requestOrderStartDeliveryService,
  requestOrderSummaryService,
  requestOrdersListService,
} from '@/feature/services/api_calls/orders_service';

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
      console.log(response?.data);
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

export const requestOrderDetailsData = createAsyncThunk(
  '@/orders/details',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await requestOrderDetailsService(orderId);
      console.log(response?.data);
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

export const requestOrderAcceptData = createAsyncThunk(
  '@/orders/accept',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await requestOrderAcceptService(orderId);
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

export const requestOrderMarkReadyData = createAsyncThunk(
  '@/orders/mark-ready',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await requestOrderMarkReadyService(orderId);
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

export const requestOrderMarkPreparingData = createAsyncThunk(
  '@/orders/mark-preparing',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await requestOrderMarkPreparingService(orderId);
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

export const requestOrderStartDeliveryData = createAsyncThunk(
  '@/orders/start-delivery',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await requestOrderStartDeliveryService(orderId);
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

export const requestOrderMarkDeliveredData = createAsyncThunk(
  '@/orders/mark-delivered',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await requestOrderMarkDeliveredService(orderId);
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

export const requestOrderRejectData = createAsyncThunk(
  '@/orders/reject',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await requestOrderRejectService(orderId);
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

export const requestOrderSummaryData = createAsyncThunk(
  '@/orders/summary',
  async (params: IOrderSummaryParams, { rejectWithValue }) => {
    try {
      const response = await requestOrderSummaryService(params);
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
