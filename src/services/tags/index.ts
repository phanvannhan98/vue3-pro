import { BaseService } from '@/services/base.service';

import { TTag } from './model';

type TRequest = {
  TSearch: {};
};

type TResponse = {
  TList: TTag[];
};

class ServiceClass extends BaseService<TRequest, TResponse> {
  static _instance = new ServiceClass();

  get enity() {
    return '/tags';
  }
}

export type { TTag };
export const TagService = ServiceClass._instance;
