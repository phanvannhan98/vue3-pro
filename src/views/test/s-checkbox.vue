<script setup lang="ts">
type TValue = string | number | boolean;

type Props = {
  name: string;
  value: TValue;
  label: string;
  checkboxClass?: string;
  labelClass?: string;
  disabled?: boolean;
};

type Emits = {
  change: [Props['value']];
};

withDefaults(defineProps<Props>(), {
  checkboxClass: '',
  labelClass: '',
});

const modelValue = defineModel<TValue | TValue[]>();

const emit = defineEmits<Emits>();
</script>

<template>
  <label class="flex cursor-pointer items-center gap-1">
    <input
      v-model="modelValue"
      class="checkbox cursor-pointer"
      type="checkbox"
      :class="checkboxClass"
      :disabled="disabled"
      :name="name"
      :value="value"
      @change="emit('change', value)"
    />
    <slot>
      <p v-if="label" class="checkbox-label font-medium" :class="labelClass">
        {{ label }}
      </p>
    </slot>
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  @apply relative h-[14px] w-[14px] appearance-none border border-solid border-[#887b7b] bg-white transition duration-150 ease-in;

  &:after {
    content: '';
    transform: rotate(45deg) scaleY(0);
    transform-origin: center;
    transition: transform 0.15s ease-in 0.05s;

    @apply absolute left-1 top-px h-2 w-1 border border-l-0 border-t-0 border-[#fff];
  }

  &:checked {
    &:after {
      transform: rotate(45deg) scaleY(1);
      @apply border-cdark-2;
    }
  }

  &:disabled {
    border-image: linear-gradient(to bottom, #d7d9da 0%, #acadae 100%);
    border-image-slice: 1;

    &:checked {
      @apply bg-[#fefefe];

      &:after {
        @apply border-[#c0c4cc];
      }
    }

    & + .checkbox-label {
      @apply text-[#9dadb1];
    }
  }
}
</style>
