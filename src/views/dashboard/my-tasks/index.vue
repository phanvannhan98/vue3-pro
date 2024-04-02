<script setup lang="ts">
  import AttachmentTask from './components/attachment-task/index.vue';
  import CreateTask from './components/create-task/index.vue';
  import TaskAssign from './components/task-assignee/index.vue';
  import TaskCreate from './components/task-create/index.vue';
</script>

<template>
  <div class="flex h-full w-full gap-1 overflow-auto p-1 font-poppins">
    <create-task />

    <div class="flex min-w-[360px] flex-1 flex-col gap-1">
      <div class="flex flex-wrap gap-1">
        <task-create />
        <task-assign />
      </div>

      <attachment-task />
    </div>
  </div>
</template>
