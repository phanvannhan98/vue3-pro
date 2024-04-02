import { TTag } from '@/services/tags/model';
import { TUserSearch } from '@/services/users/model';

export type TCreateTaskRule = TRules<Omit<TTaskCreate, 'tag_ids' | 'id'>>;

export type TState = {
  optionsTag: TTag[];
  optionsUser: TUserSearch[];
  assignee: TUserSearch | undefined;
  tags: TTag[];
  title: string;
  description: string;
};
