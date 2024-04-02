<script setup lang="ts">
  import { IProps } from './index';

  type X = {
    a: string;
    b: string;
  };

  const z: X = {
    a: '1',
    b: '2',
  };

  Object.keys(z).map((x) => {
    console.log(x);
  });

  console.log(z);

  const { option } = defineProps<IProps>();
  const { id, label } = option;

  const selectOption = inject<Fn<IProps['option']['id']>>('selectOption')!;
  const closeDropdown = inject<Fn>('close-dropdown');
  const selectedValue = inject<IOptions[number]['id']>('selectedValue')!;

  const handleClickItem = () => {
    selectOption(id);
    closeDropdown?.();
  };
</script>

<template>
  <li
    :key="id"
    class="g-menu-item"
    :class="{ active: selectedValue === id }"
    @click="handleClickItem"
  >
    <slot :active="selectedValue === id" :option="option">
      <span>{{ label }}</span>
      <g-icon class="w-4" icon="tick" />
    </slot>
  </li>
</template>

<style lang="scss" scoped>
  .g-menu-item {
    @apply flex h-10 cursor-pointer items-center justify-between gap-4 whitespace-nowrap rounded-lg py-2
      pl-4 pr-5 text-cgray-6 duration-150;

    :deep(svg) {
      @apply opacity-0 duration-150;
    }

    &.active,
    &:hover {
      @apply bg-cblue-1 text-cpurple-5;
    }

    &.active :deep(svg) {
      @apply opacity-100;
    }
  }
</style>
