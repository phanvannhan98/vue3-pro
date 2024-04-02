export interface IProps {
  value: IOptions<string | number>[number]['id'] | undefined;
  options: IOptions<string | number>;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  appendToApp?: boolean;
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

export interface IEmits {
  (event: 'change', id?: IProps['value'], option?: IProps['options'][number]): number;
}

export interface IOptionsStyle {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  minWidth?: string;
}
