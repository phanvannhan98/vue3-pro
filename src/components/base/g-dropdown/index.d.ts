export interface IProps {
  visible?: boolean;
  disabled?: boolean;
  appendToApp?: boolean;
  clickOutside?: boolean;
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

export interface IEmits {
  (event: 'update:visible', visible: boolean): void;
}

export interface IOverlayStyle {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  minWidth?: string;
}
