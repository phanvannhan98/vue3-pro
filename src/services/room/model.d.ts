import { TUser } from '../auth/model';
import { TMessage } from '../message/model';
import { TRoomMember } from '../room-member/model';

/**
 * Request type bellow
 */

/**
 * Response type bellow
 */

export type TRoom = {
  id: number;
  custom_name: string;
  custom_avatar: string;
  last_message: string;
  last_message_at: string;
  last_message_type: number;
  created_at: string;
  updated_at: string;
  type: number;
  members: TRoomMember[];
  messages: TMessage[];
};

export type TLatestRoom = TUser;
