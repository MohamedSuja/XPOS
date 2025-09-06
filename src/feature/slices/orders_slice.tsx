import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '@/feature/services/status_constants';
import { RootState } from '@/feature/rootReducer';
import {
  IOrdersState,
  IOrdersListResponseBody,
  IOrdersListParams,
} from '@/feature/redux_models/orders_model';
import {
  requestOrderAcceptData,
  requestOrderDetailsData,
  requestOrderMarkDeliveredData,
  requestOrderMarkReadyData,
  requestOrderRejectData,
  requestOrderStartDeliveryData,
  requestOrderSummaryData,
  requestOrdersListData,
} from '@/feature/thunks/orders_thunks';

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

  orderDetailsStatus: undefined,
  orderDetailsData: undefined,

  // Order Accept
  orderAcceptStatus: undefined,
  orderAcceptData: undefined,

  // Order Mark Ready
  orderMarkReadyStatus: undefined,
  orderMarkReadyData: undefined,

  // Order Start Delivery
  orderStartDeliveryStatus: undefined,
  orderStartDeliveryData: undefined,

  // Order Mark Delivered
  orderMarkDeliveredStatus: undefined,
  orderMarkDeliveredData: undefined,

  // Order Reject
  orderRejectStatus: undefined,
  orderRejectData: undefined,

  // Order Summary
  orderSummaryStatus: undefined,
  orderSummaryData: undefined,

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
    ) => {
      // Reset only the relevant orders list status and data based on the payload type
      if (action.payload && action.payload.request) {
        switch (action.payload.request) {
          case 'request':
            state.ordersRequestListStatus = undefined;
            state.ordersRequestListData = undefined;
            break;
          case 'ongoing':
            state.ordersOngoingListStatus = undefined;
            state.ordersOngoingListData = undefined;
            break;
          case 'scheduled':
            state.ordersScheduledListStatus = undefined;
            state.ordersScheduledListData = undefined;
            break;
          case 'completed':
            state.ordersCompletedListStatus = undefined;
            state.ordersCompletedListData = undefined;
            break;
          case 'cancelled':
            state.ordersCanceledListStatus = undefined;
            state.ordersCanceledListData = undefined;
            break;
          default:
            break;
        }
      } else {
        // If no payload, reset all lists
        state.ordersRequestListStatus = undefined;
        state.ordersRequestListData = undefined;
        state.ordersOngoingListStatus = undefined;
        state.ordersOngoingListData = undefined;
        state.ordersScheduledListStatus = undefined;
        state.ordersScheduledListData = undefined;
        state.ordersCompletedListStatus = undefined;
        state.ordersCompletedListData = undefined;
        state.ordersCanceledListStatus = undefined;
        state.ordersCanceledListData = undefined;
      }
    },

    resetOrderAccept: (state: IOrdersState) => {
      state.orderAcceptStatus = undefined;
      state.orderAcceptData = undefined;
    },

    resetOrderMarkReady: (state: IOrdersState) => {
      state.orderMarkReadyStatus = undefined;
      state.orderMarkReadyData = undefined;
    },

    resetOrderStartDelivery: (state: IOrdersState) => {
      state.orderStartDeliveryStatus = undefined;
      state.orderStartDeliveryData = undefined;
    },

    resetOrderMarkDelivered: (state: IOrdersState) => {
      state.orderMarkDeliveredStatus = undefined;
      state.orderMarkDeliveredData = undefined;
    },

    resetOrderReject: (state: IOrdersState) => {
      state.orderRejectStatus = undefined;
      state.orderRejectData = undefined;
    },

    resetOrderSummary: (state: IOrdersState) => {
      state.orderSummaryStatus = undefined;
      state.orderSummaryData = undefined;
    },
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

    // Order Details Start
    builder.addCase(requestOrderDetailsData.pending, state => {
      state.ordersSliceStatus = STATUS.LOADING;
      state.orderDetailsStatus = STATUS.LOADING;
    });

    builder.addCase(requestOrderDetailsData.fulfilled, (state, action) => {
      state.ordersSliceStatus = STATUS.SUCCEEDED;
      state.orderDetailsStatus = STATUS.SUCCEEDED;
      state.orderDetailsData = action.payload;
    });

    builder.addCase(requestOrderDetailsData.rejected, (state, action) => {
      state.ordersSliceStatus = STATUS.FAILED;
      state.orderDetailsStatus = STATUS.FAILED;
      state.ordersError = action.payload;
    });

    // Order Details End

    // Order Accept Start
    builder.addCase(requestOrderAcceptData.pending, state => {
      state.ordersSliceStatus = STATUS.LOADING;
      state.orderAcceptStatus = STATUS.LOADING;
    });

    builder.addCase(requestOrderAcceptData.fulfilled, (state, action) => {
      state.ordersSliceStatus = STATUS.SUCCEEDED;
      state.orderAcceptStatus = STATUS.SUCCEEDED;
      state.orderAcceptData = action.payload;
    });

    builder.addCase(requestOrderAcceptData.rejected, (state, action) => {
      state.ordersSliceStatus = STATUS.FAILED;
      state.orderAcceptStatus = STATUS.FAILED;
      state.ordersError = action.payload;
    });
    // Order Accept End

    // Order Mark Ready Start
    builder.addCase(requestOrderMarkReadyData.pending, state => {
      state.ordersSliceStatus = STATUS.LOADING;
      state.orderMarkReadyStatus = STATUS.LOADING;
    });

    builder.addCase(requestOrderMarkReadyData.fulfilled, (state, action) => {
      state.ordersSliceStatus = STATUS.SUCCEEDED;
      state.orderMarkReadyStatus = STATUS.SUCCEEDED;
      state.orderMarkReadyData = action.payload;
    });

    builder.addCase(requestOrderMarkReadyData.rejected, (state, action) => {
      state.ordersSliceStatus = STATUS.FAILED;
      state.orderMarkReadyStatus = STATUS.FAILED;
      state.ordersError = action.payload;
    });
    // Order Mark Ready End

    // Order Start Delivery Start
    builder.addCase(requestOrderStartDeliveryData.pending, state => {
      state.ordersSliceStatus = STATUS.LOADING;
      state.orderStartDeliveryStatus = STATUS.LOADING;
    });

    builder.addCase(
      requestOrderStartDeliveryData.fulfilled,
      (state, action) => {
        state.ordersSliceStatus = STATUS.SUCCEEDED;
        state.orderStartDeliveryStatus = STATUS.SUCCEEDED;
        state.orderStartDeliveryData = action.payload;
      },
    );

    builder.addCase(requestOrderStartDeliveryData.rejected, (state, action) => {
      state.ordersSliceStatus = STATUS.FAILED;
      state.orderStartDeliveryStatus = STATUS.FAILED;
      state.ordersError = action.payload;
    });
    // Order Start Delivery End

    // Order Mark Delivered Start
    builder.addCase(requestOrderMarkDeliveredData.pending, state => {
      state.ordersSliceStatus = STATUS.LOADING;
      state.orderMarkDeliveredStatus = STATUS.LOADING;
    });

    builder.addCase(
      requestOrderMarkDeliveredData.fulfilled,
      (state, action) => {
        state.ordersSliceStatus = STATUS.SUCCEEDED;
        state.orderMarkDeliveredStatus = STATUS.SUCCEEDED;
        state.orderMarkDeliveredData = action.payload;
      },
    );

    builder.addCase(requestOrderMarkDeliveredData.rejected, (state, action) => {
      state.ordersSliceStatus = STATUS.FAILED;
      state.orderMarkDeliveredStatus = STATUS.FAILED;
      state.ordersError = action.payload;
    });
    // Order Mark Delivered End

    // Order Reject Start
    builder.addCase(requestOrderRejectData.pending, state => {
      state.ordersSliceStatus = STATUS.LOADING;
      state.orderRejectStatus = STATUS.LOADING;
    });

    builder.addCase(requestOrderRejectData.fulfilled, (state, action) => {
      state.ordersSliceStatus = STATUS.SUCCEEDED;
      state.orderRejectStatus = STATUS.SUCCEEDED;
      state.orderRejectData = action.payload;
    });

    builder.addCase(requestOrderRejectData.rejected, (state, action) => {
      state.ordersSliceStatus = STATUS.FAILED;
      state.orderRejectStatus = STATUS.FAILED;
      state.ordersError = action.payload;
    });
    // Order Reject End

    // Order Summary Start
    builder.addCase(requestOrderSummaryData.pending, state => {
      state.ordersSliceStatus = STATUS.LOADING;
      state.orderSummaryStatus = STATUS.LOADING;
    });

    builder.addCase(requestOrderSummaryData.fulfilled, (state, action) => {
      state.ordersSliceStatus = STATUS.SUCCEEDED;
      state.orderSummaryStatus = STATUS.SUCCEEDED;
      state.orderSummaryData = action.payload;
    });

    builder.addCase(requestOrderSummaryData.rejected, (state, action) => {
      state.ordersSliceStatus = STATUS.FAILED;
      state.orderSummaryStatus = STATUS.FAILED;
      state.ordersError = action.payload;
    });
    // Order Summary End
  },
});

export const {
  resetOrders,
  resetOrderAccept,
  resetOrderMarkReady,
  resetOrderStartDelivery,
  resetOrderMarkDelivered,
  resetOrderReject,
  resetOrderSummary,
} = orders_slice.actions;

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

export const selectOrderDetailsStatus = (state: RootState) =>
  state.orders.orderDetailsStatus;
export const selectOrderDetailsData = (state: RootState) =>
  state.orders.orderDetailsData;

// Order Accept Selectors
export const selectOrderAcceptStatus = (state: RootState) =>
  state.orders.orderAcceptStatus;
export const selectOrderAcceptData = (state: RootState) =>
  state.orders.orderAcceptData;

// Order Mark Ready Selectors
export const selectOrderMarkReadyStatus = (state: RootState) =>
  state.orders.orderMarkReadyStatus;
export const selectOrderMarkReadyData = (state: RootState) =>
  state.orders.orderMarkReadyData;

// Order Start Delivery Selectors
export const selectOrderStartDeliveryStatus = (state: RootState) =>
  state.orders.orderStartDeliveryStatus;
export const selectOrderStartDeliveryData = (state: RootState) =>
  state.orders.orderStartDeliveryData;

// Order Mark Delivered Selectors
export const selectOrderMarkDeliveredStatus = (state: RootState) =>
  state.orders.orderMarkDeliveredStatus;
export const selectOrderMarkDeliveredData = (state: RootState) =>
  state.orders.orderMarkDeliveredData;

// Order Reject Selectors
export const selectOrderRejectStatus = (state: RootState) =>
  state.orders.orderRejectStatus;
export const selectOrderRejectData = (state: RootState) =>
  state.orders.orderRejectData;

// Order Summary Selectors
export const selectOrderSummaryStatus = (state: RootState) =>
  state.orders.orderSummaryStatus;
export const selectOrderSummaryData = (state: RootState) =>
  state.orders.orderSummaryData;

export const selectOrdersError = (state: RootState) => state.orders.ordersError;

export default orders_slice;
