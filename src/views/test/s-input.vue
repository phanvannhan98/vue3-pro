<script lang="ts" setup>
const props = defineProps<{ type?: string | number }>();

const modelValue = defineModel<string | number>({ default: '' });

const handleInput = () => {
  if (props.type === 'number')
    modelValue.value = modelValue.value.toString().replace(/[^0-9\.]/g, '');
};
</script>

<template>
  <input v-model="modelValue" class="input" type="tel" @input="handleInput" />
</template>

<style lang="scss" scoped>
.input {
  @apply h-full min-h-[22px] w-[50px] rounded-sm border border-solid border-[#c3c5c6] bg-white px-0.5 outline-none;
}
</style>
