import { AxiosResponse } from 'axios';
import { requests } from '../api';
import {
  IMenuCategoriesRequestParams,
  IMenuCategoriesResponseBody,
  IMenuSubcategoriesRequestParams,
  IMenuSubcategoriesResponseBody,
  IMenuItemsRequestParams,
  IMenuItemsResponseBody,
} from '@/feature/redux_models/menu_model';

// Menu Categories Service ----
export function requestMenuCategoriesService(
  params: IMenuCategoriesRequestParams,
): Promise<AxiosResponse<IMenuCategoriesResponseBody>> {
  const queryParams = new URLSearchParams();

  queryParams.append('per_page', params.per_page.toString());
  queryParams.append('page', params.page.toString());

  if (params.search) queryParams.append('search', params.search);
  if (params.featured !== undefined)
    queryParams.append('featured', params.featured.toString());
  if (params.status) queryParams.append('status', params.status);

  const queryString = queryParams.toString();
  const url = `/api/pos/categories${queryString ? `?${queryString}` : ''}`;

  return requests.get(url);
}

// Menu Subcategories Service ----
export function requestMenuSubcategoriesService(
  params: IMenuSubcategoriesRequestParams,
): Promise<AxiosResponse<IMenuSubcategoriesResponseBody>> {
  const queryParams = new URLSearchParams();

  queryParams.append('per_page', params.per_page.toString());
  queryParams.append('page', params.page.toString());

  if (params.search) queryParams.append('search', params.search);
  if (params.featured !== undefined)
    queryParams.append('featured', params.featured.toString());
  if (params.status) queryParams.append('status', params.status);

  const queryString = queryParams.toString();
  const url = `/api/pos/categories/${params.categoryId}/subcategories${
    queryString ? `?${queryString}` : ''
  }`;

  return requests.get(url);
}

// Menu Items Service ----
export function requestMenuItemsService(
  params: IMenuItemsRequestParams,
): Promise<AxiosResponse<IMenuItemsResponseBody>> {
  const queryParams = new URLSearchParams();

  queryParams.append('per_page', params.per_page.toString());
  queryParams.append('page', params.page.toString());

  if (params.search) queryParams.append('search', params.search);
  if (params.category_id)
    queryParams.append('category_id', params.category_id.toString());
  if (params.subcategory_id)
    queryParams.append('subcategory_id', params.subcategory_id.toString());
  if (params.available !== undefined)
    queryParams.append('available', params.available.toString());
  if (params.status) queryParams.append('status', params.status);

  const queryString = queryParams.toString();
  const url = `/api/pos/menu-items${queryString ? `?${queryString}` : ''}`;

  return requests.get(url);
}
