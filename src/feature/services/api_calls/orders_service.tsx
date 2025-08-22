import { AxiosResponse } from 'axios';
import { requests } from '../api';
import Config from 'react-native-config';
import {
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
  if (params.search) {
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
