import { TUser } from '../auth';

export type TRoomMember = {
  id: number;
  member_id: number;
  count_unseen: number;
  room_id: number;
  user: TUser;
  created_at: string;
  updated_at: string;
};

export type TDataSearch = {
  owner_id: number;
  guest_id: number;
  type: number;
};
