import { InternalAxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';

import { AuthService, TLoginResponse } from '@/services/auth';

type TAuthKey = 'access-token' | 'refresh-token' | 'expires-in';

export function localStorageGet(key: TAuthKey) {
  return localStorage.getItem(key) || '';
}

export function localStorageSet(key: TAuthKey, value: string) {
  localStorage.setItem(key, value);
}

export function removeToken(key: TAuthKey) {
  localStorage.setItem(key, '');
}

export function setAuthToLocalStorage({ access_token, refresh_token, expires_in }: TLoginResponse) {
  localStorageSet('access-token', access_token);
  localStorageSet('refresh-token', refresh_token);
  localStorageSet('expires-in', expires_in);
}

let isRefreshing = false;
let promiseQueue: { resolve: Fn }[] = [];

const processQueue = (token = '') => {
  promiseQueue.forEach((promise) => {
    promise.resolve(token);
  });

  promiseQueue = [];
};

const setBearerToken = (config: InternalAxiosRequestConfig, token: string) => {
  config.headers.setAuthorization('Bearer ' + token);

  return config;
};

export const checkExpiredToken = async (config: InternalAxiosRequestConfig) => {
  const expiresIn = localStorageGet('expires-in');
  const refreshToken = localStorageGet('refresh-token');

  if (dayjs(expiresIn) >= dayjs()) return config;
  if (!expiresIn || !refreshToken) throw { response: { status: 403 } };

  if (isRefreshing) {
    const newToken = await new Promise<string>((resolve) => {
      promiseQueue.push({ resolve });
    });

    return setBearerToken(config, newToken);
  }

  try {
    isRefreshing = true;

    const newToken = await AuthService.refreshToken().finally(() => (isRefreshing = false));

    processQueue(newToken);

    return setBearerToken(config, newToken);
  } catch {
    throw { response: { status: 403 } };
  }
};
