<script lang="ts" setup>
defineProps<{ isFull?: boolean }>();
</script>

<template>
  <section class="section">
    <div class="wrapper" :class="{ 'w-full': isFull }">
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  @apply my-0.5 px-[5px];

  .wrapper {
    @apply inline-block rounded-[5px] border border-[#c1c1c1] px-0.5 py-[1px];
  }
}
</style>
