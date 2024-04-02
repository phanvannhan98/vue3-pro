<script setup lang="ts">
  import dayjs from 'dayjs';

  import { TTask } from '@/services/tasks';

  const tasks = defineProps<{ listTask: TTask[] }>();
</script>

<template>
  <div class="min-w-[360px] flex-1 rounded bg-white p-7">
    <h3 class="mb-4 text-smd font-medium tracking-wide text-cdark-1">Tasks</h3>
    <div class="list-task flex flex-col gap-7">
      <div
        v-for="task in tasks.listTask"
        :key="task.id"
        class="flex flex-col justify-between gap-2"
      >
        <div class="flex justify-between">
          <div class="flex">
            <div class="mr-4 h-6 w-6">
              <g-checkbox checkbox-class-name="!border-cblue-4" />
            </div>
            <div class="mt-[1px]">
              <h4 class="text-xsm font-medium text-cdark-1">{{ task.title }}</h4>
              <p class="mt-1 text-xs text-cgray-6/50">
                {{ task.created_at ? dayjs(task.created_at).format('YYYY-MM-DD HH:mm:ss') : '' }}
              </p>
            </div>
          </div>
          <div class="flex h-full">
            <div v-for="(avatar, index) in task.list_avatar" :key="index" class="avatar-circle">
              <img alt="" :src="avatar" />
            </div>
          </div>
        </div>
        <g-progress-bar color="green" :percent="task.process_percent" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .avatar-circle {
    @apply flex h-7 w-7 cursor-pointer overflow-hidden rounded-full;
  }
</style>
