/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOrdersState {
  ordersSliceStatus: string | undefined;

  ordersListStatus: string | undefined;
  ordersListData: IOrdersListResponseBody | undefined;

  ordersRequestListStatus: string | undefined;
  ordersRequestListData: IOrdersListResponseBody | undefined;

  ordersOngoingListStatus: string | undefined;
  ordersOngoingListData: IOrdersListResponseBody | undefined;

  ordersScheduledListStatus: string | undefined;
  ordersScheduledListData: IOrdersListResponseBody | undefined;

  ordersCompletedListStatus: string | undefined;
  ordersCompletedListData: IOrdersListResponseBody | undefined;

  ordersCanceledListStatus: string | undefined;
  ordersCanceledListData: IOrdersListResponseBody | undefined;

  orderDetailsStatus: string | undefined;
  orderDetailsData: IOrderDetailsResponseBody | undefined;

  // Order Accept
  orderAcceptStatus: string | undefined;
  orderAcceptData: IOrderAcceptResponseBody | undefined;

  // Order Mark Ready
  orderMarkReadyStatus: string | undefined;
  orderMarkReadyData: IOrderMarkReadyResponseBody | undefined;

  // Order Start Delivery
  orderStartDeliveryStatus: string | undefined;
  orderStartDeliveryData: IOrderStartDeliveryResponseBody | undefined;

  // Order Mark Delivered
  orderMarkDeliveredStatus: string | undefined;
  orderMarkDeliveredData: IOrderMarkDeliveredResponseBody | undefined;

  // Order Reject
  orderRejectStatus: string | undefined;
  orderRejectData: IOrderRejectResponseBody | undefined;

  // Order Summary
  orderSummaryStatus: string | undefined;
  orderSummaryData: IOrderSummaryResponseBody | undefined;

  ordersError: any;
}

export interface IOrdersListParams {
  request: 'request' | 'ongoing' | 'scheduled' | 'completed' | 'cancelled';
  per_page: number;
  page: number;
  search?: string;
  start_date?: string;
  end_date?: string;
  delivery_type?: string;
}

export interface IOrdersListResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}

export interface IOrderDetailsResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}

export interface IOrderAcceptResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}

export interface IOrderMarkReadyResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}

export interface IOrderStartDeliveryResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}

export interface IOrderMarkDeliveredResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}

export interface IOrderRejectResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}

export interface IOrderSummaryParams {
  start_date?: string;
  end_date?: string;
}

export interface IOrderSummaryResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}
