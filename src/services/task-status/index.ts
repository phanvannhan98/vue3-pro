import { BaseService } from '@/services/base.service';

import { TTaskStatus } from './model';

type TResponse = { TList: TTaskStatus[] };

class ServiceClass extends BaseService<any, TResponse> {
  static _instance = new ServiceClass();

  get enity() {
    return '/task-statuses';
  }
}

export type { TTaskStatus };
export const TaskStatusService = ServiceClass._instance;
