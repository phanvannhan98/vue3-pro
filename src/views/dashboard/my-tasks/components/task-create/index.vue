<script setup lang="ts">
  import { TTask, TaskService } from '@/services/tasks';

  import ListTask from '../list-task/index.vue';

  const tasksCreatorLatest = ref<TTask[]>([]);

  const getLatestTaskCreator = async () => {
    const { data } = await TaskService.getLatest('creator_id');

    tasksCreatorLatest.value = data;
  };

  getLatestTaskCreator();
</script>

<template>
  <list-task :list-task="tasksCreatorLatest" />
</template>

<style lang="scss" scoped></style>
