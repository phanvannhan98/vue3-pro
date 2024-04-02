<script setup lang="ts">
  import { useToast } from 'vue-toastification';

  import { TagService } from '@/services/tags';
  import { TaskService } from '@/services/tasks';
  import { TTaskCreate } from '@/services/tasks/model';
  import { UserService } from '@/services/users';

  import { TCreateTaskRule, TState } from '.';
  import DropdownSearch from '../dropdown-search/index.vue';

  const { t } = useI18n();
  const toast = useToast();

  const isShowDropdownTag = ref(false);
  const isShowDropdownAssignee = ref(false);

  const showDropdownSearch = (type: 'assigner' | 'tag') => {
    isShowDropdownTag.value = type === 'tag';
    isShowDropdownAssignee.value = type === 'assigner';

    visible.value = true;
  };

  const rules: TCreateTaskRule = {
    title: { required: { value: true } },
    description: { required: { value: true } },
    assignee_id: { required: { value: true } },
  };

  const formErrors = ref<TFormError>({});

  const state = reactive<TState>({
    optionsTag: [],
    optionsUser: [],
    assignee: undefined,
    tags: [],
    title: '',
    description: '',
  });

  const visible = ref(true);

  const formData = computed<TTaskCreate>(() => ({
    title: state.title,
    description: state.description,
    assignee_id: state.assignee?.id,
    tag_ids: state.tags.map(({ id }) => id),
  }));

  const resetForm = () => {
    state.assignee = undefined;
    state.tags = [];
    state.title = '';
    state.description = '';
  };

  const fetchDataDropdonw = async () => {
    try {
      const [tagRes, userRes] = await Promise.all([TagService.getList(), UserService.search()]);

      isShowDropdownTag.value = true;
      visible.value = true;

      state.optionsTag = tagRes.data;
      state.optionsUser = userRes.data;
    } catch {}
  };

  const onSubmit = async () => {
    try {
      await TaskService.create(formData.value);

      toast.success(t('message.create-success'));
      resetForm();
    } catch {}
  };

  fetchDataDropdonw();
</script>

<i18n lang="json">
{
  "vi": {
    "message": {
      "create-success": "Công việc đã được tạo!"
    }
  },
  "en": {
    "message": {
      "create-success": "Successfully created!"
    }
  }
}
</i18n>

<template>
  <div class="flex flex-col">
    <div class="relative w-[412px] rounded bg-white">
      <div class="absolute right-3 mt-4 cursor-pointer text-right">
        <g-icon class="w-3" icon="close" />
      </div>
      <g-form
        ref="formRef"
        class="flex flex-col p-7"
        :errors="formErrors"
        :model="formData"
        :rules="rules"
        @finish="onSubmit"
      >
        <h5 class="mb-4 text-smd font-medium tracking-wide text-cdark-1">Create New Task</h5>
        <g-form-item class="mb-4" name="title">
          <input
            v-model="state.title"
            class="w-full border-b py-2 text-xsm tracking-wide text-cdark-1 outline-0"
            name="title"
            placeholder="Task title"
          />
        </g-form-item>
        <g-form-item class="mb-6" name="description">
          <textarea
            v-model="state.description"
            class="w-full rounded-lg border-2 border-cpurple-3 p-4 text-xsm tracking-wide text-cdark-1 shadow-lg shadow-cpurple-5/20 outline-2 outline-cpurple-4"
            cols="30"
            name="description"
            placeholder="What is the task"
            rows="4"
          ></textarea>
        </g-form-item>

        <div
          class="flex min-h-[44px] cursor-pointer items-center pb-4"
          @click="showDropdownSearch('tag')"
        >
          <g-icon class="mr-9 w-5" icon="tag" />

          <div class="flex min-w-0 flex-1 items-center">
            <div class="flex flex-wrap items-center gap-1">
              <div
                v-for="tag in state.tags"
                :key="tag.id"
                class="flex h-7 items-center rounded-2xl px-6 text-xs text-white"
                :class="[tag.bg_color]"
              >
                {{ tag.title }}
              </div>
            </div>
          </div>
          <div class="ml-3 mr-1.5 flex justify-center">
            <div class="w-6">
              <g-icon class="text-cgray-5" icon="add-dashed" />
            </div>
          </div>
        </div>
        <div class="h-[1px] w-[292px] bg-cgray-3"></div>
        <g-form-item name="assignee_id" @click="showDropdownSearch('assigner')">
          <div class="flex h-[68px] cursor-pointer items-center justify-between py-4">
            <div class="mr-9 h-4 w-6">
              <g-icon class="form-item-custom text-cgray-4" icon="user-plus" />
            </div>
            <div v-if="state.assignee" class="flex flex-1 items-center">
              <div class="flex flex-wrap items-center gap-3">
                <img alt="" class="has-border avatar-circle" :src="state.assignee.avatar" />
                <div class="text-xsm text-cgray-6">{{ state.assignee.name }}</div>
              </div>
            </div>
            <div class="ml-3 mr-1.5 flex justify-center">
              <div class="w-6">
                <g-icon class="form-item-custom text-cgray-5" icon="add-dashed" />
              </div>
            </div>
          </div>
        </g-form-item>

        <button class="w-full rounded-lg bg-cpurple-5 py-3 text-center text-white" type="submit">
          Done
        </button>
      </g-form>
    </div>
    <dropdown-search
      v-if="isShowDropdownTag"
      v-model:value="state.tags"
      v-model:visible="visible"
      title="Add tags"
      type="tag"
      :options="state.optionsTag"
    />

    <dropdown-search
      v-else-if="isShowDropdownAssignee"
      v-model:value="state.assignee"
      v-model:visible="visible"
      title="Assign to user"
      type="assigner"
      :options="state.optionsUser"
    />
  </div>
</template>

<style lang="scss" scoped>
  .avatar-circle {
    @apply flex h-9 w-9 cursor-pointer overflow-hidden rounded-full bg-cgray-3;

    .has-border {
      @apply border-4;
    }
  }
</style>
