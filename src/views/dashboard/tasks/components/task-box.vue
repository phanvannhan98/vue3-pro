<script setup lang="ts">
  import dayjs from 'dayjs';

  import { TTask } from '@/services/tasks/model';

  const { task } = defineProps<{ task: TTask }>();

  const {
    title,
    description,
    deadline,
    tags,
    sub_tasks,
    comments_count,
    attachments_count,
    list_avatar,
  } = task;
</script>

<template>
  <div class="mb-1 w-full rounded bg-white shadow-md">
    <div class="p-4">
      <div class="mb-3 flex flex-wrap gap-1">
        <button
          v-for="{ id, title: tagTitle, bg_color } in tags"
          :key="id"
          class="rounded bg-cblue-5 px-2 py-1 text-xs font-medium text-white"
          :class="[bg_color]"
        >
          {{ tagTitle }}
        </button>
      </div>
      <div>
        <h3 class="text-xsm font-medium text-black/80">{{ title }}</h3>
        <p
          v-if="description"
          class="mt-2 line-clamp-3 text-xs font-medium text-cgray-5"
          :title="description"
        >
          {{ description }}
        </p>
        <g-checkbox
          v-for="subtask in sub_tasks"
          :id="subtask.id"
          :key="subtask.id"
          checkbox-class-name="!h-3 !w-3"
          class="mt-2"
        >
          <span class="ml-2 cursor-pointer text-xs font-medium text-cgray-5">
            {{ subtask.title }}
          </span>
        </g-checkbox>
      </div>
    </div>
    <div class="flex flex-wrap justify-between gap-2 border-t border-black/6 p-4">
      <div
        v-if="deadline"
        class="order-1 rounded border border-black/6 px-2 py-1 text-xs text-cdark-1"
      >
        <span>{{ dayjs(deadline).format('MMM DD, YYYY') }}</span>
      </div>
      <div v-else class="flex h-full items-center">
        <template v-if="list_avatar.length > 0">
          <div v-for="avatar in list_avatar" :key="avatar" class="avatar-circle">
            <img alt="avatar" :src="avatar" />
          </div>
        </template>
        <template v-else>
          <div class="avatar-circle">
            <img alt="" src="https://ca.slack-edge.com/T052QKM2AHY-U052MM66X8D-50887b625fe0-512" />
          </div>
          <div class="avatar-circle">
            <img alt="" src="https://ca.slack-edge.com/T052QKM2AHY-U052MM66X8D-50887b625fe0-512" />
          </div>
          <div class="avatar-circle">
            <img alt="" src="https://ca.slack-edge.com/T052QKM2AHY-U052J24U7GE-g3083afc34f1-512" />
          </div>
        </template>
      </div>

      <div class="flex gap-3">
        <div class="flex cursor-pointer items-center gap-1 text-cgray-6">
          <g-icon class="w-3.5" icon="chat" />
          <span class="text-xs font-bold">{{ comments_count }}</span>
        </div>
        <div class="flex cursor-pointer items-center gap-1 text-cgray-6">
          <g-icon class="w-3" icon="paper-clip" />
          <span class="text-xs font-bold">{{ attachments_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .avatar-circle {
    @apply -ml-2 flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden 
    rounded-full border-4 border-white bg-cgray-2 font-bold text-cdark-1/25;

    &:first-child {
      @apply ml-0;
    }

    &__text {
      @apply flex;
    }
  }
</style>
