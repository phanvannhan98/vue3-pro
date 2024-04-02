<script setup lang="ts">
  import { TTask, TaskService } from '@/services/tasks';

  import ListTask from '../list-task/index.vue';

  const tasksAssigneeLatest = ref<TTask[]>([]);

  const getLatestTaskAssignee = async () => {
    const { data } = await TaskService.getLatest('assignee_id');

    tasksAssigneeLatest.value = data;
  };

  getLatestTaskAssignee();
</script>

<template>
  <list-task :list-task="tasksAssigneeLatest" />
</template>

<style lang="scss" scoped></style>
