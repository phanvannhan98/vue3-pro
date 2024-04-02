import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isString } from 'lodash-es';

import { getLanguage } from '@/hooks/useLanguage';

import { checkExpiredToken, localStorageGet } from './auth';

declare module 'axios' {
  export interface AxiosRequestConfig {
    notShowNotiPopup?: boolean;
    notAuthRequest?: boolean;
  }
}

enum MethodEnums {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

instance.interceptors.request.use(
  async (config) => {
    const { notAuthRequest } = config;

    config.headers.setAuthorization('Bearer ' + localStorageGet('access-token'));
    config.headers.set('X-LANGUAGE', getLanguage());

    return notAuthRequest ? config : checkExpiredToken(config);
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (!isString(response.data)) return response.data;

    // const successMessage = t(`message.${response.data}`);
    // createNotification('success', successMessage);
  },
  (error) => {
    // if ([401, 403].includes(error.response.status)) {
    //   localStorageSet('access-token', '');
    //   // router.push({ name: 'login', query: { path: router.currentRoute.value.fullPath } });
    // }

    // if (!error.config.notShowNotiPopup && error.response.data) {
    //   const { errorID, params } = error.response.data;
    //   const errorMessage = t(`message.${errorID}`, params);

    //   createNotification('error', errorMessage);
    // }

    return Promise.reject(error);
  },
);

const request = <T, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) => {
  type BaseResponse<D> = {
    data: D;
    code: number;
    message: string;
  };

  return instance.request<T, BaseResponse<R>>({ ...config, ...options });
};

export function get<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  console.log('zo ne');
  return request<T, R>({ ...config, method: MethodEnums.GET }, options);
}

export function post<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return request<T, R>({ ...config, method: MethodEnums.POST }, options);
}

export function patch<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return request<T, R>({ ...config, method: MethodEnums.PATCH }, options);
}

export function put<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return request<T, R>({ ...config, method: MethodEnums.PUT }, options);
}

export function remove<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return request<T, R>({ ...config, method: MethodEnums.DELETE }, options);
}

export default request;
export type { AxiosInstance, AxiosResponse };
