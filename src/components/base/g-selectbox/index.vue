<script setup lang="ts">
  import { IProps, IEmits } from './index';

  const {
    placeholder = 'Select...',
    allowClear = false,
    disabled = false,
    appendToApp = false,
    placement = 'bottom-left',
    options,
  } = defineProps<IProps>();

  const emit = defineEmits<IEmits>();

  const selectedValue = defineModel<IOptions<string | number>[number]['id'] | undefined>('value');

  const selectedOption = computed(() => options.find(({ id }) => id === selectedValue.value));

  const isShowCloseButton = computed(() => allowClear && selectedValue.value);

  const visible = ref(false);

  const selectOption = (id?: number | string) => {
    selectedValue.value = id;
    close();

    nextTick(() => emit('change', id, selectedOption.value));
  };

  const close = () => {
    visible.value = false;
  };
</script>

<template>
  <g-dropdown
    v-model:visible="visible"
    class="g-selectbox"
    v-bind="{
      disabled,
      placement,
      appendToApp,
    }"
  >
    <button class="g-selectbox__selector">
      <span>{{ selectedOption?.label || placeholder }}</span>
      <!-- suffix icon -->
      <div class="flex h-full w-4 items-center justify-center">
        <g-icon class="w-4 duration-150" icon="arrow-down" :class="{ '-rotate-180': visible }" />
        <div
          v-if="isShowCloseButton"
          class="close-button absolute bg-white p-1"
          @click.stop="selectOption()"
        >
          <g-icon class="w-3" icon="close" />
        </div>
      </div>
    </button>
    <!-- list options -->
    <template #overlay>
      <g-menu
        v-model:value="selectedValue"
        class="my-2"
        :options="options"
        @change="selectOption($event)"
      />
    </template>
  </g-dropdown>
</template>

<style lang="scss" scoped src="./styles.scss" />
