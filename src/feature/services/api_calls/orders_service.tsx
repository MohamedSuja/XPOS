import { AxiosResponse } from 'axios';
import { requests } from '../api';
import Config from 'react-native-config';
import {
  IOrderAcceptResponseBody,
  IOrderDetailsResponseBody,
  IOrderMarkDeliveredResponseBody,
  IOrderMarkReadyResponseBody,
  IOrderRejectResponseBody,
  IOrderStartDeliveryResponseBody,
  IOrderSummaryParams,
  IOrderSummaryResponseBody,
  IOrdersListParams,
  IOrdersListResponseBody,
} from '@/feature/redux_models/orders_model';

const BASE_URL = Config.BASE_URL;

export function requestOrdersListService(
  params: IOrdersListParams,
): Promise<AxiosResponse<IOrdersListResponseBody>> {
  const queryParams = new URLSearchParams();

  // Mandatory parameters
  queryParams.append('request', params?.request);
  queryParams.append('per_page', params?.per_page.toString());
  queryParams.append('page', params?.page.toString());

  // Optional parameters
  if (params.search && params.search !== '') {
    queryParams.append('search', params.search);
  }
  if (params.start_date) {
    queryParams.append('start_date', params.start_date);
  }
  if (params.end_date) {
    queryParams.append('end_date', params.end_date);
  }
  if (params.delivery_type) {
    queryParams.append('delivery_type', params.delivery_type);
  }

  const url = `${BASE_URL}/api/pos/orders?${queryParams.toString()}`;
  return requests.get(url);
}

export function requestOrderDetailsService(
  orderId: string,
): Promise<AxiosResponse<IOrderDetailsResponseBody>> {
  const url = `${BASE_URL}/api/pos/orders/${orderId}`;
  return requests.get(url);
}

export function requestOrderAcceptService(
  orderId: string,
): Promise<AxiosResponse<IOrderAcceptResponseBody>> {
  const url = `${BASE_URL}/api/pos/orders/${orderId}/accept`;
  return requests.put(url, {});
}

export function requestOrderMarkReadyService(
  orderId: string,
): Promise<AxiosResponse<IOrderMarkReadyResponseBody>> {
  const url = `${BASE_URL}/api/pos/orders/${orderId}/mark-ready`;
  return requests.put(url, {});
}

export function requestOrderStartDeliveryService(
  orderId: string,
): Promise<AxiosResponse<IOrderStartDeliveryResponseBody>> {
  const url = `${BASE_URL}/api/pos/orders/${orderId}/start-delivery`;
  return requests.put(url, {});
}

export function requestOrderMarkDeliveredService(
  orderId: string,
): Promise<AxiosResponse<IOrderMarkDeliveredResponseBody>> {
  const url = `${BASE_URL}/api/pos/orders/${orderId}/mark-delivered`;
  return requests.put(url, {});
}

export function requestOrderRejectService(
  orderId: string,
): Promise<AxiosResponse<IOrderRejectResponseBody>> {
  const url = `${BASE_URL}/api/pos/orders/${orderId}/reject`;
  return requests.put(url, {});
}

export function requestOrderSummaryService(
  params: IOrderSummaryParams,
): Promise<AxiosResponse<IOrderSummaryResponseBody>> {
  const queryParams = new URLSearchParams();

  if (params.start_date) {
    queryParams.append('start_date', params.start_date);
  }
  if (params.end_date) {
    queryParams.append('end_date', params.end_date);
  }

  const url = `${BASE_URL}/api/pos/orders/summary?${queryParams.toString()}`;
  return requests.get(url);
}
