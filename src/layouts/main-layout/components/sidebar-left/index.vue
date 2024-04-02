<script setup lang="ts">
  import { useAuthStore } from '@/store/modules/auth';

  const icons: { icon: TIcon; to: string }[] = [
    {
      icon: 'dashboard',
      to: 'dashboard',
    },
    {
      icon: 'timeline',
      to: 'timelines',
    },
    {
      icon: 'calendar',
      to: 'calendars',
    },
    {
      icon: 'chat',
      to: 'chats',
    },
    {
      icon: 'user',
      to: 'users',
    },
    {
      icon: 'setting',
      to: 'settings',
    },
    {
      icon: 'notification',
      to: 'notifications',
    },
  ];

  const { logout } = useAuthStore();
</script>

<template>
  <div class="flex h-full bg-white">
    <div class="mt-[66px] flex w-24 flex-1 flex-col gap-10 pt-28 shadow-md">
      <div class="h-full max-h-[calc(100vh-200px)] w-full overflow-y-auto">
        <router-link v-for="{ icon, to } in icons" :key="to" class="icon" :to="{ name: to }">
          <g-icon class="w-5" :icon="icon" />
        </router-link>
      </div>
      <div class="p-2">
        <div class="icon rounded-md bg-cgray-2 !p-2" @click="logout">
          <g-icon class="mx-auto w-6" icon="logout" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .icon {
    @apply relative mb-1 flex w-full cursor-pointer items-center justify-center p-6 text-cgray-6
    transition-all duration-300 hover:bg-cpurple-1;

    &.router-link-active {
      @apply bg-cpurple-1;

      &:before {
        content: '';
        width: 5px;
        height: 29px;
        @apply absolute left-0 rounded-r bg-cpurple-6;
      }
    }
  }
</style>
