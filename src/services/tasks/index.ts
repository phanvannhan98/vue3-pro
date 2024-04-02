import { BaseService } from '@/services/base.service';

import { TTask, TOrderBy, TOrderDirection } from './model';
import { TTaskStatus } from '../task-status/model';

type TUserSearch = 'creator_id' | 'assignee_id';
type TResponse = { TList: TTask[] };

class ServiceClass extends BaseService<any, TResponse> {
  static _instance = new ServiceClass();

  get enity() {
    return '/tasks';
  }

  async getLatest(field: TUserSearch) {
    return await this.request.get<TTask[]>({ url: `${this.enity}/latest`, params: { field } });
  }

  async order(data: TTask[]) {
    return await this.request.put({ url: `${this.enity}/order`, data });
  }

  async orderBy(data: {
    type: TOrderBy;
    status_id: TTaskStatus['id'];
    direction?: TOrderDirection;
  }) {
    return await this.request.put({ url: `${this.enity}/order-by`, data });
  }

  async changeStatus(data: Pick<TTask, 'id' | 'status_id'>) {
    return await this.request.put({ url: `${this.enity}/status`, data });
  }
}

export type { TTask, TOrderBy, TOrderDirection };
export const TaskService = ServiceClass._instance;
