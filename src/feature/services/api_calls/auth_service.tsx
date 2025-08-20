import {
  IAuthenticationLoginDataRequestBody,
  IAuthenticationLoginDataResponseBody,
  IAuthenticationLogoutDataResponseBody,
} from '@/feature/redux_models/auth_model';
import { AxiosResponse } from 'axios';
import { requests } from '../api';
import Config from 'react-native-config';

const BASE_URL = Config.BASE_URL;
// Auth Login Service ----
export function requestAuthenticateLoginDataService(
  requestBody: IAuthenticationLoginDataRequestBody,
): Promise<AxiosResponse<IAuthenticationLoginDataResponseBody>> {
  return requests.post(`${BASE_URL}/api/pos/login`, requestBody);
}

// Auth Logout Service ----
export function requestAuthenticateLogoutDataService(
  requestBody: IAuthenticationLoginDataRequestBody,
): Promise<AxiosResponse<IAuthenticationLogoutDataResponseBody>> {
  return requests.post(`${BASE_URL}/api/pos/logout`, requestBody);
}
