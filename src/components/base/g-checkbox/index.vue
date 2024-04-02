<script setup lang="ts">
  const { checkboxClassName } = defineProps<{ checkboxClassName?: string }>();

  const checked = defineModel<boolean>('checked');
</script>

<template>
  <label class="flex items-center">
    <label class="g-checkbox" :class="checkboxClassName">
      <g-icon class="text-white" icon="tick" />
      <input :id="($attrs.id as string)" v-model="checked" hidden type="checkbox" />
    </label>
    <slot></slot>
  </label>
</template>

<style lang="scss" scoped>
  .g-checkbox {
    @apply flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border 
    border-cgray-4 bg-cblue-1 transition duration-300 ease-in-out;

    &:has([type='checkbox']:checked) {
      @apply border-cblue-5 bg-cblue-5;

      svg {
        @apply opacity-100;
      }
    }

    svg {
      @apply w-2/3 opacity-0 transition duration-300 ease-in-out;
    }
  }
</style>
