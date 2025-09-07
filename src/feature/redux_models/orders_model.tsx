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
  orderAcceptLoadingIds: string[];

  // Order Mark Ready
  orderMarkReadyStatus: string | undefined;
  orderMarkReadyData: IOrderMarkReadyResponseBody | undefined;

  // Order Mark Preparing
  orderMarkPreparingStatus: string | undefined;
  orderMarkPreparingData: IOrderMarkPreparingResponseBody | undefined;

  // Order Start Delivery
  orderStartDeliveryStatus: string | undefined;
  orderStartDeliveryData: IOrderStartDeliveryResponseBody | undefined;

  // Order Mark Delivered
  orderMarkDeliveredStatus: string | undefined;
  orderMarkDeliveredData: IOrderMarkDeliveredResponseBody | undefined;

  // Order Reject
  orderRejectStatus: string | undefined;
  orderRejectData: IOrderRejectResponseBody | undefined;
  orderRejectLoadingIds: string[];

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
  data: {
    order: {
      id: number;
      unique_id: string;
      status: string;
      total: string;
      subtotal: string;
      base_subtotal: string;
      panel_subtotal: string;
      delivery_fee: string;
      platform_fee: string;
      panel_fee: string;
      discount: string;
      promo_discount_amount: string;
      promo_code_name: string | null;
      delivery_type: string;
      delivery_option: string;
      delivery_instructions: string;
      preparation_instructions: string;
      payment_method: string | null;
      payment_status: string | null;
      created_at: string;
      updated_at: string;
      accepted_at: string | null;
      preparing_at: string | null;
      ready_for_pickup_at: string | null;
      out_for_delivery_at: string | null;
      delivered_at: string | null;
      cancelled_at: string | null;
      estimated_delivery_time: string | null;
      customer: {
        id: number;
        name: string;
        phone: string;
        email: string | null;
      };
      delivery_address: {
        id: number;
        address: string | null;
        city: string;
        state: string;
        country: string;
        postal_code: string;
        latitude: string;
        longitude: string;
      };
      driver: any | null;
      items: Array<{
        id: number;
        item_name: string;
        item_description: string;
        quantity: number | null;
        unit_price: number | null;
        total_price: number;
        special_instructions: string | null;
        variants: Array<{
          variant_name: string;
          variant_value: string | null;
          variant_price: number;
        }>;
        add_ons: any[];
      }>;
      fee_breakdown: {
        base_subtotal: string;
        panel_subtotal: string;
        subtotal: string;
        delivery_fee: string;
        platform_fee: string;
        panel_fee: string;
        discount: string;
        promo_discount_amount: string;
        total: string;
        commission: {
          panel_earning: string;
          platform_earning: string;
          driver_earning: string;
          currency: string;
        };
      };
      cancel_reason: string | null;
      order_summary: {
        total_items: number;
        total_quantity: number;
      };
      currency_symbol: string;
    };
    timezone: string;
  };
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

export interface IOrderMarkPreparingResponseBody {
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
