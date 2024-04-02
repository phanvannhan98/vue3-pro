<script setup lang="ts">
  import { IProps } from '.';

  const props = defineProps<IProps<'tag'> | IProps<'assigner'>>();

  const visible = defineModel<boolean>('visible', { required: true });
  const selectedOptions = defineModel<(typeof props)['value']>('value', { required: true });

  const selectOption = (option) => {
    if (props.type === 'assigner') {
      selectedOptions.value = option;
      return;
    }

    if (props.value.includes(option)) {
      selectedOptions.value = props.value.filter((tag) => tag !== option);
    } else {
      selectedOptions.value = [...props.value, option];
    }
  };
</script>

<template>
  <g-dropdown v-model:visible="visible" class="dropdown-search mt-1" :click-outside="false">
    <div class="flex items-center gap-5 rounded-md bg-white px-7 py-5">
      <g-icon class="w-6 text-cgray-4" icon="user-plus" />
      <div class="flex-1 text-left text-xsm text-cgray-6">{{ props.title }}</div>
      <g-icon
        class="w-4 text-cgray-5 duration-150"
        icon="arrow-down"
        :class="{ '-rotate-180': visible }"
      />
    </div>

    <template #overlay>
      <div class="mt-1 w-full rounded-lg bg-white">
        <div class="p-6 pb-4">
          <label class="flex w-full items-center overflow-hidden rounded-2xl bg-cgray-2 pl-[34px]">
            <g-icon class="top-10 z-10 mr-7 w-3" icon="search" />
            <input
              class="h-9 w-full bg-cgray-2 text-xs text-cdark-1 outline-none"
              placeholder="Search"
            />
          </label>
        </div>

        <ul class="mx-1 max-h-64 overflow-auto bg-white pb-4">
          <template v-if="props.type === 'tag'">
            <li
              v-for="option in props.options"
              :key="option.id"
              class="dropdown-search__item mb-0.5"
              :class="{ active: props.value.includes(option) }"
              @click="selectOption(option)"
            >
              <p class="font-medium text-cgray-6">{{ option.title }}</p>
              <div class="h-1.5 flex-1 rounded-full" :class="option.bg_color"></div>
            </li>
            <div class="mt-4 px-6 text-center">
              <button class="w-full rounded-lg bg-cpurple-5 py-3 text-white">Add new</button>
            </div>
          </template>

          <template v-else>
            <li
              v-for="option in props.options"
              :key="option.id"
              class="dropdown-search__item"
              :class="{ active: props.value === option }"
              @click="selectOption(option)"
            >
              <div class="flex items-center">
                <img alt="" class="avatar-circle mr-4" :src="option.avatar" />
                <h5 class="font-medium text-cgray-6">{{ option.name }}</h5>
              </div>
              <p class="text-xs text-cgray-5">{{ option.tasks_count }} task on progress</p>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </g-dropdown>
</template>

<style lang="scss" scoped src="./index.scss" />
