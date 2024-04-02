import { BaseService } from '@/services/base.service';

import { TDataSearch, TRoomMember } from './model';
import { TRoom } from '../room/model';

type TResponse = { TList: TRoomMember[]; TDetail: TRoomMember };

class ServiceClass extends BaseService<any, TResponse> {
  static _instance = new ServiceClass();

  get enity() {
    return '/room-members';
  }

  async getRoomMemberByType(params: TDataSearch) {
    return await this.request.get<TRoom>({ url: `${this.enity}/get-room`, params });
  }
}

export type { TRoomMember, TDataSearch };
export const RoomMemberService = ServiceClass._instance;
