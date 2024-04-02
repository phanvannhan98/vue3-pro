import { BaseService } from '@/services/base.service';

import { TMessage } from './model.d';

type TResponse = { TList: TMessage[]; TDetail: TMessage };

class ServiceClass extends BaseService<any, TResponse> {
  static _instance = new ServiceClass();

  get enity() {
    return '/messages';
  }
}

export type { TMessage };
export const MessageService = ServiceClass._instance;
