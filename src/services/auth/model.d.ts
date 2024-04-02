/**
 * Request type bellow
 */

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  avatar: string;
  created_at: string;
  updated_at: string;
};

/**
 * Response type bellow
 */

export type TLoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  user_info: TUser;
};

export interface IRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
  user_info: TUser;
}
