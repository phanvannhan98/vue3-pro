export type TMessage = {
  id: number | undefined;
  body: string;
  room_id: number;
  type: number;
  send_at: string;
  seen_at: string | undefined;
  creator_id: number;
  created_at: string;
  updated_at: string;
  time_send_at: string;
};
