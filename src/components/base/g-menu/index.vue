<script setup lang="ts">
  import { IProps, IEmits } from './index';

  const { options = [], value } = defineProps<IProps>();
  const emit = defineEmits<IEmits>();

  const selectedValue = ref<IProps['value']>(value);
  const selectedOption = computed(() => options.find(({ id }) => id === selectedValue.value));

  const selectOption = (id?: IProps['value']) => {
    selectedValue.value = id;

    emit('update:value', id);
    nextTick(() => emit('change', id, selectedOption.value));
  };

  watch(
    () => value,
    (value) => {
      if (selectedValue.value !== value) selectedValue.value = value;
    },
    { immediate: true },
  );

  provide('selectOption', selectOption);
  provide('selectedValue', selectedValue);
</script>

<template>
  <div class="flex w-full rounded-lg border border-cgray-3 bg-white py-1 shadow-lg">
    <ul class="flex max-h-[353px] w-full flex-col gap-y-2 overflow-auto px-3 py-2">
      <slot>
        <g-menu-item v-for="{ id, label } in options" :key="id" :option="{ id, label }" />
      </slot>
    </ul>
  </div>
</template>
