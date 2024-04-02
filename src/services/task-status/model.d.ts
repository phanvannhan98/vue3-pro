import { TOrderBy, TOrderDirection, TTask } from '../tasks/model';

/**
 * Request type bellow
 */

export type TTaskStatus = {
  id: number;
  name: string;
  sort_task_by: TOrderBy | undefined;
  sort_task_direction: TOrderDirection | undefined;
  created_at: string;
  updated_at: string;
  tasks: TTask[];
};

/**
 * Response type bellow
 */
