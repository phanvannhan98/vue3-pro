<script setup lang="ts">
  import { cloneDeep, isEmpty } from 'lodash-es';

  interface IProps {
    model?: any;
    rules?: TRules<any>;
    layout?: 'horizontal' | 'vertical';
    errors?: any;
  }

  const { model, rules, layout = 'vertical', errors } = defineProps<IProps>();

  const oldModel = { ...model };

  const emit = defineEmits(['finish']);

  const initError = Object.keys(rules || {}).reduce(
    (result, rule) => ({ ...result, [rule]: {} }),
    {},
  );

  const _errors = ref(cloneDeep(initError));

  watch(
    () => errors,
    () => {
      _errors.value = cloneDeep(errors);
    },
  );

  provide('form-context', {
    errors: _errors,
    layout,
  });

  const { t } = useI18n();

  function getErrorMessage<T>(field: string, rule: keyof TRule, value: TRuleValue<T>) {
    const params = [field, value];

    const errorObj = {
      required: { code: 'E0040', params },
      min: { code: 'E0034', params },
      max: { code: 'E0049', params },
      numeric: { code: 'E0037', params },
      required_if: { code: 'E0041', params },
      string: { code: 'E0044', params },
      email: { code: 'E0022', params },
      maxLength: { code: 'E0052', params },
      minLength: { code: 'E0051', params },
      pattern: { code: 'E0053', params },
      type: { code: 'E0054', params },
    };

    if (typeof value === 'object' && !(value instanceof RegExp)) {
      return (value as any).message;
    }

    return t('message.' + errorObj[rule].code, params);
  }

  const validate = () => {
    if (!rules) return true;

    function getRuleValue<T>(val: TRuleValue<T>) {
      if (typeof val === 'object' && 'value' in val!) {
        return val.value;
      }

      return val;
    }

    for (let field in rules) {
      const { required, max, min, maxLength, minLength, pattern, type } = rules[field];

      const fieldValue = model[field];

      if (required && !fieldValue) {
        _errors.value[field].required = getErrorMessage(field, 'required', required);
        continue;
      }

      if (max && Number(fieldValue) > getRuleValue(max)) {
        _errors.value[field].max = getErrorMessage(field, 'max', max);
        continue;
      }

      if (min && Number(fieldValue) < getRuleValue(min)) {
        _errors.value[field].min = getErrorMessage(field, 'min', min);
        continue;
      }

      if (maxLength && fieldValue.toString().length > getRuleValue(maxLength)) {
        _errors.value[field].maxLength = getErrorMessage(field, 'maxLength', maxLength);
        continue;
      }

      if (minLength && fieldValue.toString().length < getRuleValue(minLength)) {
        _errors.value[field].minLength = getErrorMessage(field, 'minLength', minLength);
        continue;
      }

      if (pattern && !getRuleValue(pattern).test(fieldValue.toString())) {
        _errors.value[field].pattern = getErrorMessage(field, 'pattern', pattern);
        continue;
      }

      if (type && typeof fieldValue !== getRuleValue(type)) {
        _errors.value[field].type = getErrorMessage(field, 'type', type);
        continue;
      }
    }

    return Object.keys(_errors.value).every((field) => isEmpty(_errors.value[field]));
  };

  const onSubmit = () => {
    _errors.value = cloneDeep(initError);

    if (validate()) emit('finish', oldModel);
  };

  const onReset = () => {
    return { ...oldModel };
  };

  defineExpose({ onReset });
</script>

<template>
  <form action="" @reset="onReset" @submit.prevent="onSubmit">
    <slot></slot>
  </form>
</template>

<style lang="scss" scoped></style>
