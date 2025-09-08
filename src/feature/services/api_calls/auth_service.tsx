import {
  IAuthenticationLoginDataRequestBody,
  IAuthenticationLoginDataResponseBody,
  IAuthenticationLogoutDataResponseBody,
} from '@/feature/redux_models/auth_model';
import { AxiosResponse } from 'axios';
import { requests } from '../api';
import Config from 'react-native-config';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ErrorFlash } from '@/utils/FlashMessage';
import {
  getMessaging,
  AuthorizationStatus as FirebaseAuthorizationStatus,
  getToken,
  requestPermission,
} from '@react-native-firebase/messaging';

const messaging = getMessaging();
// Auth Login Service ----
export function requestAuthenticateLoginDataService(
  requestBody: IAuthenticationLoginDataRequestBody,
): Promise<AxiosResponse<IAuthenticationLoginDataResponseBody>> {
  return requests.post(`/api/pos/login`, requestBody);
}

export async function requestRegisterDevice() {
  const authStatus = await requestPermission(messaging);
  const enabled =
    authStatus === FirebaseAuthorizationStatus.AUTHORIZED ||
    authStatus === FirebaseAuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus != AuthorizationStatus.DENIED) {
      const fcmToken = await getToken(messaging);
      const body = {
        device_token: fcmToken,
        device_type: Platform.OS,
        device_name: (await DeviceInfo.getDevice()).toString(),
        app_version: DeviceInfo.getVersion(),
        os_version: DeviceInfo.getSystemVersion(),
      };
      await requests
        .post('/api/pos/devices/register', body)
        .then(res => {
          console.log('fcm,', fcmToken);
        })
        .catch(error => {
          let errorMessage = '';
          console.log('error', error);
          if (error.status == 422) {
            let alertDescription = '';
            const errors = error?.errors;
            if (errors) {
              for (const key in errors) {
                const errorMessagesArray = errors[key];
                errorMessagesArray.forEach((message: string) => {
                  alertDescription += `${message}\n`;
                });
              }
            }
            errorMessage = alertDescription.trim();
          } else {
            errorMessage = error?.message;
          }
          ErrorFlash(errorMessage || 'Something went wrong!');
        });
    }
  }
}
// Auth Logout Service ----
export function requestAuthenticateLogoutDataService(): Promise<
  AxiosResponse<IAuthenticationLogoutDataResponseBody>
> {
  return requests.post(`/api/pos/logout`);
}
