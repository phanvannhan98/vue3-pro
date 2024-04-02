/**
 * Request type bellow
 */

import { TTag } from '../tags';
import { TUser } from '../users';
export type TOrderBy = 'CREATED' | 'UPDATED';

export type TOrderDirection = 'ASC' | 'DESC';

export type TTag = {
  id: number;
  title: string;
  bg_color:
    | 'bg-cgray-5'
    | 'bg-cblue-5'
    | 'bg-cred-5'
    | 'bg-cyellow-5'
    | 'bg-cgreen-5'
    | 'bg-cpink-5'
    | 'bg-cpurple-5';
  text_color: string;
  is_master: boolean;
  created_at: string;
  updated_at: string;
};

export type TTask = {
  id: number;
  title: string;
  description: string;
  status_id: number;
  creator_id: number;
  parent_id: string | undefined;
  assignee_id: string | undefined;
  priority: string;
  estimate: string;
  type: string;
  deadline: string;
  created_at: string;
  updated_at: string;
  before_task_id: number;
  after_task_id: number;
  comments_count: number;
  attachments_count: number;
  tags: TTag[];
  sub_tasks: TTask[];
  list_avatar: string[];
  after_task_id: TTask['id'];
  before_task_id: TTask['id'];
  process_percent: number;
  creator: TUser;
  sub_tasks: TTask[];
};

export type TTaskCreate = {
  id?: number;
  title: string;
  description: string;
  assignee_id: TUser['id'] | undefined;
  tag_ids: TTag[] | any;
};

/**
 * Response type bellow
 */
