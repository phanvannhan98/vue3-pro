<script lang="ts" setup>
type Props = {
  params?: { onClick?: Fn; text?: string };
};

withDefaults(defineProps<Props>(), {
  params: () => ({
    onClick: () => {},
    text: '',
  }),
});
</script>

<template>
  <button class="s-button" @click="params.onClick">
    <slot>{{ params.text }}</slot>
  </button>
</template>

<style lang="scss">
.s-button {
  background: linear-gradient(#fff, #d3d3d3);
  @apply flex h-[22px] min-w-[50px] items-center rounded border border-solid border-[#818384] px-[11px] text-xs font-bold;

  &:hover {
    @apply border-[#009dff];
  }

  &:disabled {
    @apply border-[#a9a9ab] bg-[#ccc] text-[#aab3b3];
  }
}
</style>
