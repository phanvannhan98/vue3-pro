<script setup lang="ts">
  const props = defineProps<{ color: 'pink' | 'green' | 'blue'; percent: number }>();

  const percentClassName = computed(() => {
    const obj = {
      pink: 'bg-cyellow-5',
      green: 'bg-cgreen-5',
      blue: 'bg-cblue-5',
    };

    return obj[props.color] || 'bg-cblue-500';
  });

  const progressBarClassName = computed(() => percentClassName.value + '/10');
</script>

<template>
  <div class="g-progress h-1.5 w-full rounded-md" :class="progressBarClassName">
    <div
      class="h-full rounded-md"
      :class="percentClassName"
      :style="{ width: `${percent}%` }"
    ></div>

    <div class="hidden bg-cyellow-5/10"></div>
    <div class="hidden bg-cblue-5/10"></div>
    <div class="hidden bg-cgreen-5/10"></div>
  </div>
</template>

<style lang="scss" scoped>
  .g-progress {
    @apply h-1.5 rounded-md;

    .percent {
      @apply h-1.5 rounded-md;
    }
  }
</style>
