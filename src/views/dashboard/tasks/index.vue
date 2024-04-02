<script setup lang="ts">
  import { cloneDeep, keyBy, union } from 'lodash-es';
  import { VueDraggableNext } from 'vue-draggable-next';

  import { TTaskStatus, TaskStatusService } from '@/services/task-status';
  import { TTask, TaskService, TOrderBy } from '@/services/tasks';

  import TaskBox from './components/task-box.vue';

  type TState = {
    taskStatuses: TTaskStatus[];
    oldTaskStatuses: TTaskStatus[];
    isOrderByType: boolean;
  };

  const state = reactive<TState>({
    taskStatuses: [],
    oldTaskStatuses: [],
    isOrderByType: false,
  });

  const orderOptions = reactive<IOptions<TOrderBy>>([
    {
      id: 'CREATED',
      label: 'Order by created date',
    },
    {
      id: 'UPDATED',
      label: 'Order by updated date',
    },
  ]);

  const dragOptions = reactive({
    animation: 200,
    ghostClass: 'opacity-30',
    group: 'tasks',
  });

  const fetchTaskStatuses = async () => {
    try {
      const { data } = await TaskStatusService.getList();

      const sortedStatuses = cloneDeep(data).map((taskStatus) => {
        const { tasks } = taskStatus;

        if (tasks.length === 0) return taskStatus;

        const objTasks = keyBy(tasks, 'id');

        const firstTask = tasks.find(({ before_task_id }) => !before_task_id)!;
        const sortTasks: TTask[] = [];

        tasks.forEach(() => {
          let lastSortTask = firstTask;
          const sortTasksLength = sortTasks.length;

          if (sortTasksLength > 0) {
            lastSortTask = objTasks[sortTasks[sortTasksLength - 1]?.after_task_id];
          }

          sortTasks.push(lastSortTask);
        });

        return { ...taskStatus, tasks: sortTasks };
      });

      state.taskStatuses = cloneDeep(sortedStatuses);
      state.oldTaskStatuses = cloneDeep(sortedStatuses);
    } catch (e) {
      console.log(e);
    }
  };

  const orderDragDropTask = async (tasks: TTask[]) => {
    try {
      await TaskService.order(tasks);

      fetchTaskStatuses();
    } catch {}
  };

  const orderTaskByType = async (index: number) => {
    try {
      const oldType = state.oldTaskStatuses[index].sort_task_by;
      const { id: status_id, sort_task_direction, sort_task_by: type } = state.taskStatuses[index];

      let direction: typeof sort_task_direction = undefined;

      if (type === oldType) {
        direction = sort_task_direction === 'ASC' ? 'DESC' : 'ASC';
      }

      await TaskService.orderBy({ type: type!, status_id, direction });

      state.isOrderByType = true;

      fetchTaskStatuses();
    } finally {
      setTimeout(() => (state.isOrderByType = false), 300);
    }
  };

  const changeStatus = async ({ id, status_id }: TTask) => {
    try {
      await TaskService.changeStatus({ id, status_id });
    } catch {}
  };

  const setTaskOrder = (task: TTask | null, beforeTask: TTask, afterTask: TTask) => {
    if (!task) {
      beforeTask && (beforeTask.after_task_id = afterTask?.id);
      afterTask && (afterTask.before_task_id = beforeTask?.id);

      return;
    }

    task.before_task_id = beforeTask?.id;
    task.after_task_id = afterTask?.id;

    beforeTask && (beforeTask.after_task_id = task?.id);
    afterTask && (afterTask.before_task_id = task?.id);
  };

  const onDragEnd = ({ oldIndex, newIndex, from, to }) => {
    if (oldIndex === newIndex && from.id === to.id) return;

    const oldTasks = state.oldTaskStatuses[from.id].tasks;
    const newTasks = state.taskStatuses[to.id].tasks;

    const oldBeforeTask = oldTasks[oldIndex - 1];
    const oldAfterTask = oldTasks[oldIndex + 1];

    const movedTask = newTasks[newIndex];

    if (from.id !== to.id) {
      movedTask.status_id = state.taskStatuses[to.id].id;
      changeStatus(movedTask);
    }

    let newBeforeTask = newTasks[newIndex - 1];
    let newAfterTask = newTasks[newIndex + 1];

    newBeforeTask = newBeforeTask?.id === oldAfterTask?.id ? oldAfterTask : newBeforeTask;
    newAfterTask = newAfterTask?.id === oldBeforeTask?.id ? oldBeforeTask : newAfterTask;

    setTaskOrder(null, oldBeforeTask, oldAfterTask);
    setTaskOrder(movedTask, newBeforeTask, newAfterTask);

    const orderedTasks = union(
      [movedTask, newBeforeTask, newAfterTask, oldBeforeTask, oldAfterTask].filter(Boolean),
    );

    orderDragDropTask(orderedTasks);
  };

  fetchTaskStatuses();
</script>

<template>
  <div class="flex h-full w-full px-0.5 py-1">
    <div
      v-for="(taskStatus, taskStatusIndex) in state.taskStatuses"
      :key="taskStatus.id"
      class="flex h-full min-w-[210px] flex-1 flex-col gap-1 px-0.5"
    >
      <div class="flex h-14 w-full items-center justify-between rounded bg-white p-4 shadow-md">
        <span class="font-medium text-black/80">{{ taskStatus.name }}</span>
        <div class="flex items-center">
          <g-dropdown :placement="taskStatus.id === 1 ? 'bottom-left' : 'bottom-right'">
            <g-icon class="w-4 py-1 text-cgray-5" icon="three-dot-vertical" />
            <template #overlay>
              <g-menu
                v-model:value="taskStatus.sort_task_by"
                :options="orderOptions"
                @change="orderTaskByType(taskStatusIndex)"
              >
                <g-menu-item
                  v-for="orderOption in orderOptions"
                  :key="orderOption.id"
                  :option="orderOption"
                >
                  <span>{{ orderOption.label }}</span>
                  <g-icon
                    v-if="taskStatus.sort_task_by"
                    icon="sort-asc"
                    :class="['w-4', { '-scale-y-100': taskStatus.sort_task_direction === 'DESC' }]"
                  />
                </g-menu-item>
              </g-menu>
            </template>
          </g-dropdown>
          <div class="ml-3.5 w-6 cursor-pointer rounded bg-cpurple-5/10 p-[7px]">
            <g-icon class="text-cpurple-5" icon="plus" />
          </div>
        </div>
      </div>

      <vue-draggable-next
        v-bind="{ ...dragOptions }"
        :id="taskStatusIndex"
        class="min-h-0 flex-1 overflow-y-auto rounded"
        :list="taskStatus.tasks"
        @end="onDragEnd"
      >
        <transition-group :name="state.isOrderByType ? 'fade' : ''">
          <task-box v-for="task in taskStatus.tasks" :key="task?.id" :task="task" />
        </transition-group>
      </vue-draggable-next>
    </div>
  </div>
</template>
