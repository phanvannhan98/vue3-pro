<script setup lang="ts">
  import type { IProps, IOverlayStyle, IEmits } from './index';

  const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    appendToApp: false,
    clickOutside: true,
    placement: 'bottom-left',
  });
  const emit = defineEmits<IEmits>();

  const visibleOverlay = ref(props.visible);
  const defaultSlotLoading = ref<HTMLDivElement>();
  const dropdownRef = ref<HTMLDivElement>();
  const overlayStyle = ref<IOverlayStyle>({});
  const overlayId = new Date().getTime().toString();

  const excludeClickOutsideId = computed(() => (props.clickOutside ? overlayId : 'app'));

  const close = () => {
    visibleOverlay.value = false;
  };

  watchEffect(() => {
    if (defaultSlotLoading.value || !visibleOverlay.value || !dropdownRef.value) return;

    const [plVertical, plHorizontal] = props.placement.split('-');

    const style: IOverlayStyle = {};

    if (!props.appendToApp) {
      style.left = plHorizontal === 'left' ? '0' : 'unset';
      style.right = plHorizontal === 'right' ? '0' : 'unset';

      style.top = plVertical === 'bottom' ? '100%' : 'unset';
      style.bottom = plVertical === 'top' ? '100%' : 'unset';

      style.minWidth = '100%';
    } else {
      const { x, y, height, width } = dropdownRef.value.getBoundingClientRect();

      style.left = plHorizontal === 'left' ? x + 'px' : 'unset';
      style.right = plHorizontal === 'right' ? window.innerWidth - x - width + 'px' : 'unset';

      style.top = plVertical === 'bottom' ? y + height + 'px' : 'unset';
      style.bottom = plVertical === 'top' ? window.innerHeight - y + 'px' : 'unset';

      style.minWidth = width + 'px';
    }

    overlayStyle.value = style;
  });

  watch(
    () => props.visible,
    (value) => {
      if (visibleOverlay.value !== value) visibleOverlay.value = value;
    },
  );

  watch(visibleOverlay, (value) => {
    if (props.visible !== value) emit('update:visible', value);
  });

  provide('close-dropdown', close);
</script>

<template>
  <button
    ref="dropdownRef"
    v-click-outside:[excludeClickOutsideId]="close"
    class="g-dropdown relative"
    :disabled="props.disabled"
  >
    <!-- dropdown button -->
    <div @click="visibleOverlay = !visibleOverlay">
      <suspense>
        <slot></slot>
        <template #fallback>
          <div ref="defaultSlotLoading"></div>
        </template>
      </suspense>
    </div>
    <!-- overlay -->
    <teleport to="#app" :disabled="!appendToApp">
      <transition name="fade-scale">
        <div v-show="visibleOverlay" :id="overlayId" class="absolute z-50" :style="overlayStyle">
          <slot name="overlay"></slot>
        </div>
      </transition>
    </teleport>
  </button>
</template>

<style lang="scss" scoped>
  .g-dropdown:disabled {
    @apply cursor-not-allowed;

    > * {
      @apply pointer-events-none;
    }
  }
</style>
