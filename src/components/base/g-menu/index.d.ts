export interface IProps {
  value?: IOptions<number | string>[number]['id'];
  options?: IOptions<number | string>;
  disabled?: boolean;
}

export interface IEmits {
  (event: 'update:value', id?: IProps['value']): void;
  (event: 'change', id?: IProps['value'], option?: IProps['options'][number]): void;
}
