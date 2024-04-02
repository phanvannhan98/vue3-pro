<script setup lang="ts">
  import { Ref } from 'vue';

  const { label, name } = defineProps<{ name: string; label?: string }>();

  const formContext = inject<{ errors: Ref<TFormError>; layout: Ref<string> }>('form-context');
  const { errors, layout } = formContext!;

  const errorMessages = computed(() =>
    errors.value[name] ? Object.values(errors.value[name]) : '',
  );

  const styleLabel = computed(() => {
    const styleObject = {
      horizontal: 'flex flex-row',
      vertical: 'flex flex-col',
    };

    return styleObject[layout.value] || '';
  });
</script>

<template>
  <div
    class="g-form-item flex w-full flex-col text-left"
    :class="{ 'has-error': errorMessages.length > 0 }"
  >
    <label :class="styleLabel">
      <slot name="label" :label="label">
        <span v-if="label" class="mb-3 w-32">{{ label }}</span>
      </slot>
      <div class="w-full">
        <slot></slot>
      </div>
    </label>
    <p v-if="errorMessages.length" class="text-sm text-cred-5">{{ errorMessages[0] }}</p>
  </div>
</template>

<style lang="scss">
  .g-form-item.has-error {
    input,
    textarea {
      @apply border-cred-5 text-cred-5 outline-cred-5 duration-100;

      &::placeholder {
        @apply text-cred-5;
      }
    }

    .form-item-custom {
      @apply text-cred-5;
    }
  }
</style>
