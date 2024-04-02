import { TTag } from '@/services/tags/model';
import { TUserSearch } from '@/services/users/model';

export interface IProps<T> {
  title: string;
  options: T extends 'tag' ? TTag[] : TUserSearch[];
  type: T;
  visible: boolean;
  value: T extends 'tag' ? TTag[] : TUserSearch | undefined;
}
