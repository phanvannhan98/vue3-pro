import { TUser } from '@/services/auth/model';
import { localStorageGet, setAuthToLocalStorage } from '@/utils/auth';
import { get, post } from '@/utils/http';

import { IRefreshTokenResponse, TLoginRequest, TLoginResponse } from './model';

enum URL {
  ME = '/auth/me',
  LOGIN = '/auth/login',
  REFRESH_TOKEN = '/auth/refresh-token',
}

class ServiceClass {
  static _instance = new ServiceClass();

  async login(formData: TLoginRequest) {
    return await post<TLoginResponse>({
      url: URL.LOGIN,
      data: formData,
      notAuthRequest: true,
    }).then((response) => {
      setAuthToLocalStorage(response.data);

      return response;
    });
  }

  async refreshToken() {
    const refresh_token = localStorageGet('refresh-token');

    return await post<IRefreshTokenResponse>(
      { url: URL.REFRESH_TOKEN, notAuthRequest: true },
      { data: { refresh_token } },
    ).then(({ data }) => {
      setAuthToLocalStorage(data);

      return data.access_token;
    });
  }

  async getInfo() {
    return await get<TLoginResponse>({ url: URL.ME });
  }
}

export type { TLoginRequest, TLoginResponse, TUser };
export const AuthService = ServiceClass._instance;
