<script setup lang="ts">
  const { avatars } = defineProps<{ avatars: string[] }>();
</script>

<template>
  <div v-if="avatars.length === 0" class="avatar-circle animate-pulse"></div>
  <img v-else-if="avatars.length === 1" class="avatar-circle" :src="avatars[0]" />
  <div v-else class="avatar-group">
    <img class="avatar-circle -ml-1.5" :src="avatars[0]" />
    <img class="avatar-circle -ml-5 mt-3" :src="avatars[1]" />
  </div>
</template>

<style lang="scss" scoped>
  .avatar-circle {
    @apply relative flex h-12 w-12 cursor-pointer overflow-hidden rounded-full 
    border border-white bg-cgray-4 shadow-md;
  }

  .avatar-group {
    @apply flex w-12;

    .avatar-circle {
      @apply h-[38px] min-w-[38px];
    }

    & + .online {
      @apply right-0;
    }
  }
</style>
