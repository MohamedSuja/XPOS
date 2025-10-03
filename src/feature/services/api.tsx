/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import Config from 'react-native-config';

const BASE_URL = Config.BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 60,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,
  },
});

const responseBody = (response: AxiosResponse) => response;

const createConfig = (body: any): AxiosRequestConfig => ({
  headers:
    body instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
});

export const requests = {
  get: (url: string, params?: any) =>
    instance.get(url, { params }).then(responseBody),
  post: (url: string, body?: any) =>
    instance.post(url, body, createConfig(body)).then(responseBody),
  patch: (url: string, body: any) =>
    instance.patch(url, body, createConfig(body)).then(responseBody),
  put: (url: string, body: any) =>
    instance.put(url, body, createConfig(body)).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

instance.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: any) => {
    if (response.data.code < 0) {
      return Promise.reject(response.data.result);
    }

    return response;
  },
  (error: any) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalConfig = error.config;
    const errorMsg = error.response.data;

    if (!error.response) {
      console.log('No response from server - possible network issue.');
      Alert.alert('Network Error!');
    }

    if (error.response.status === 500 && !originalConfig._retry)
      [Alert.alert('Server Error!')];

    console.error('ERROR => ', errorMsg);

    return Promise.reject(errorMsg);
  },
);

export function setAccessToken(token: string) {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Remove the access token from axios headers
export function removeAccessToken() {
  delete instance.defaults.headers.common.Authorization;
}

export default instance;
