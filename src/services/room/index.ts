import { BaseService } from '@/services/base.service';

import { TLatestRoom, TRoom } from './model';
import { TDataSearch } from '../room-member';

type TResponse = { TList: TRoom[]; TDetail: TRoom };

class ServiceClass extends BaseService<any, TResponse> {
  static _instance = new ServiceClass();

  get enity() {
    return '/rooms';
  }

  async getLatest() {
    return await this.request.get<TLatestRoom[]>({ url: `${this.enity}/latest` });
  }

  async getRoomByType(params: TDataSearch) {
    return await this.request.get<TRoom>({ url: `${this.enity}/type`, params });
  }
}

export type { TRoom, TLatestRoom };
export const RoomService = ServiceClass._instance;
