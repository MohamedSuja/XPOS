import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '@/feature/services/status_constants';
import { RootState } from '@/feature/rootReducer';
import {
  IOrdersState,
  IOrdersListResponseBody,
  IOrdersListParams,
} from '@/feature/redux_models/orders_model';
import { requestOrdersListData } from '@/feature/thunks/orders_thunks';

const DEFAULT_STATE: IOrdersState = {
  ordersSliceStatus: undefined,

  ordersListStatus: undefined,
  ordersListData: undefined,

  ordersRequestListStatus: undefined,
  ordersRequestListData: undefined,

  ordersOngoingListStatus: undefined,
  ordersOngoingListData: undefined,

  ordersScheduledListStatus: undefined,
  ordersScheduledListData: undefined,

  ordersCompletedListStatus: undefined,
  ordersCompletedListData: undefined,

  ordersCanceledListStatus: undefined,
  ordersCanceledListData: undefined,

  ordersError: undefined,
};

const INITIAL_STATE: IOrdersState = {
  ...DEFAULT_STATE,
};

const orders_slice = createSlice({
  name: 'orders',
  initialState: INITIAL_STATE,
  reducers: {
    resetOrders: () => DEFAULT_STATE,

    resetOrdersList: (
      state: IOrdersState,
      action: { payload?: IOrdersListParams },
    ) => {},
  },

  extraReducers: builder => {
    builder.addCase(requestOrdersListData.pending, (state, action) => {
      state.ordersSliceStatus = STATUS.LOADING;

      // Set loading status based on the request type
      const requestType = action.meta.arg.request;
      switch (requestType) {
        case 'request':
          state.ordersRequestListStatus = STATUS.LOADING;
          break;
        case 'ongoing':
          state.ordersOngoingListStatus = STATUS.LOADING;
          break;
        case 'scheduled':
          state.ordersScheduledListStatus = STATUS.LOADING;
          break;
        case 'completed':
          state.ordersCompletedListStatus = STATUS.LOADING;
          break;
        case 'cancelled':
          state.ordersCanceledListStatus = STATUS.LOADING;
          break;
        default:
          state.ordersListStatus = STATUS.LOADING;
      }
    });

    builder.addCase(
      requestOrdersListData.fulfilled,
      (
        state,
        action: {
          payload: IOrdersListResponseBody;
          meta: { arg: IOrdersListParams };
        },
      ) => {
        state.ordersSliceStatus = STATUS.SUCCEEDED;

        // Store data based on the request type
        const requestType = action.meta.arg.request;
        switch (requestType) {
          case 'request':
            state.ordersRequestListStatus = STATUS.SUCCEEDED;
            state.ordersRequestListData = action.payload;
            break;
          case 'ongoing':
            state.ordersOngoingListStatus = STATUS.SUCCEEDED;
            state.ordersOngoingListData = action.payload;
            break;
          case 'scheduled':
            state.ordersScheduledListStatus = STATUS.SUCCEEDED;
            state.ordersScheduledListData = action.payload;
            break;
          case 'completed':
            state.ordersCompletedListStatus = STATUS.SUCCEEDED;
            state.ordersCompletedListData = action.payload;
            break;
          case 'cancelled':
            state.ordersCanceledListStatus = STATUS.SUCCEEDED;
            state.ordersCanceledListData = action.payload;
            break;
          default:
            state.ordersListStatus = STATUS.SUCCEEDED;
            state.ordersListData = action.payload;
        }
      },
    );

    builder.addCase(requestOrdersListData.rejected, (state, action) => {
      state.ordersSliceStatus = STATUS.FAILED;

      // Set failed status based on the request type
      const requestType = action.meta.arg.request;
      switch (requestType) {
        case 'request':
          state.ordersRequestListStatus = STATUS.FAILED;
          break;
        case 'ongoing':
          state.ordersOngoingListStatus = STATUS.FAILED;
          break;
        case 'scheduled':
          state.ordersScheduledListStatus = STATUS.FAILED;
          break;
        case 'completed':
          state.ordersCompletedListStatus = STATUS.FAILED;
          break;
        case 'cancelled':
          state.ordersCanceledListStatus = STATUS.FAILED;
          break;
        default:
          state.ordersListStatus = STATUS.FAILED;
      }

      state.ordersError = action.payload;
    });
  },
});

export const { resetOrders } = orders_slice.actions;

export const selectOrdersSliceStatus = (state: RootState) =>
  state.orders.ordersSliceStatus;

export const selectOrdersListStatus = (state: RootState) =>
  state.orders.ordersListStatus;
export const selectOrdersListData = (state: RootState) =>
  state.orders.ordersListData;

export const selectOrdersRequestListStatus = (state: RootState) =>
  state.orders.ordersRequestListStatus;
export const selectOrdersRequestListData = (state: RootState) =>
  state.orders.ordersRequestListData;

export const selectOrdersOngoingListStatus = (state: RootState) =>
  state.orders.ordersOngoingListStatus;
export const selectOrdersOngoingListData = (state: RootState) =>
  state.orders.ordersOngoingListData;

export const selectOrdersScheduledListStatus = (state: RootState) =>
  state.orders.ordersScheduledListStatus;
export const selectOrdersScheduledListData = (state: RootState) =>
  state.orders.ordersScheduledListData;

export const selectOrdersCompletedListStatus = (state: RootState) =>
  state.orders.ordersCompletedListStatus;
export const selectOrdersCompletedListData = (state: RootState) =>
  state.orders.ordersCompletedListData;

export const selectOrdersCanceledListStatus = (state: RootState) =>
  state.orders.ordersCanceledListStatus;
export const selectOrdersCanceledListData = (state: RootState) =>
  state.orders.ordersCanceledListData;

export const selectOrdersError = (state: RootState) => state.orders.ordersError;

export default orders_slice;
