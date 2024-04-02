import { BaseService } from '@/services/base.service';

import { TUser } from './../auth/model.d';
import { TUserSearch } from './model';

type TRequest = {
  TSearch: {};
};

type TResponse = {
  TList: TUserSearch[];
};

class ServiceClass extends BaseService<TRequest, TResponse> {
  static _instance = new ServiceClass();

  get enity() {
    return '/users';
  }

  async search(data?: TUserSearch) {
    return await this.request.get({ url: `${this.enity}/search` }, { data });
  }
}

export type { TUserSearch, TUser };
export const UserService = ServiceClass._instance;
