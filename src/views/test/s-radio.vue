<script setup lang="ts">
type Props = {
  name: string;
  value: string | number | boolean;
  label: string;
  radioClass?: string;
  labelClass?: string;
  disabled?: boolean;
};

type Emits = {
  change: [Props['value']];
};

withDefaults(defineProps<Props>(), {
  radioClass: '',
  labelClass: '',
});

const modelValue = defineModel<Props['value']>();

const emit = defineEmits<Emits>();
</script>

<template>
  <label class="flex cursor-pointer items-center gap-1">
    <input
      v-model="modelValue"
      class="radio cursor-pointer"
      type="radio"
      :class="radioClass"
      :disabled="disabled"
      :name="name"
      :value="value"
      @change="emit('change', value)"
    />
    <slot>
      <p class="radio-label font-medium" :class="labelClass">
        {{ label }}
      </p>
    </slot>
  </label>
</template>

<style lang="scss" scoped>
.radio {
  @apply h-[14px] w-[14px] appearance-none rounded-full border border-solid border-[#887b7b] bg-white bg-clip-content p-1 transition duration-150 ease-in;

  &:checked {
    @apply bg-[#2b333c];
  }

  &:disabled {
    @apply border-[#c5c5c5];

    &:checked {
      @apply bg-[#999];
    }

    & + .radio-label {
      @apply text-[#9dadb1];
    }
  }
}
</style>
