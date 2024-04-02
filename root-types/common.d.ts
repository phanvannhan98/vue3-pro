/* ant select option type */
type IOptions<T = number> = {
  label: string;
  id: T;
}[];

/* type of argument for showConfirmModal */
type TConfirmConfig = {
  title?: string;
  subTitle?: string;
  icon?: TIcon;
  onOK?: Fn;
  onCancel?: Fn;
};

const icons = [
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'calendar',
  'chat',
  'circle-plus',
  'dashboard',
  'message',
  'notification',
  'paper-clip',
  'pdf',
  'phone',
  'search',
  'seen',
  'setting',
  'tag',
  'three-dot',
  'three-dot-vertical',
  'tick',
  'timeline',
  'user-plus',
  'user',
  'xls',
  'user-circle-white',
  'plus',
  'close',
  'add-dashed',
  'sort-asc',
  'shape',
  'logout',
  'avatar-default',
  'c-close',
] as const;

type TIcon = (typeof icons)[number];

type TCutomRuleValue<T> = {
  value: T;
  message?: string;
};

type TRuleValue<T> = T | TCutomRuleValue<T>;

type TRule = {
  required: TRuleValue<boolean>;
  min: TRuleValue<number>;
  minLength: TRuleValue<number>;
  max: TRuleValue<number>;
  maxLength: TRuleValue<number>;
  pattern: TRuleValue<RegExp>;
  type: TRuleValue<'email' | 'text' | 'number'>;
};

type TFormMessageAttr = {
  code: string;
  params: string[];
  message: string;
};

type TRules<T> = Record<keyof T, Partial<TRule>>;

type TFormError = Record<string, Partial<Record<keyof TRule, TFormMessageAttr>>>;
