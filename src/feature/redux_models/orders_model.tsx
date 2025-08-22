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
