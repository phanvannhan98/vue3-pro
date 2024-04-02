<script lang="ts" setup>
import SInput from './s-input.vue';

type TOption = { code: string; name: string };

type Props = {
  options: TOption[];
  hideInput?: boolean;
  maxLength?: string | number;
};

const props = defineProps<Props>();
const modelValue = defineModel<string>({ default: '' });

const initOption = { code: '', name: '' };

const optionsElement = ref<HTMLDivElement>();
const selectWidth = ref<string | number>('unset');
const isShowOptions = ref(false);
const isInvisibleOptions = ref(true);

const inputValue = ref(modelValue.value);
const selectedValue = ref<TOption>(initOption);

const setSelectValueWidth = () => {
  const { clientWidth } = optionsElement.value!;

  if (clientWidth) {
    selectWidth.value = clientWidth + 'px';
  }

  nextTick(() => (isInvisibleOptions.value = false));
};

const handleClose = () => {
  isShowOptions.value = false;
};

const handleSelectOption = (option: TOption) => {
  selectedValue.value = option;
  inputValue.value = option.code;
  modelValue.value = option.code;
  handleClose();
};

const handleChangeInput = () => {
  const option = props.options.find(({ code }) => inputValue.value.toString() === code.toString());

  selectedValue.value = option || { ...initOption };
  modelValue.value = option?.code || '';
};

const handleInput = () => {
  inputValue.value = inputValue.value.replace(/[^0-9\.]/g, '');
};

const handleBlurInput = () => {
  if (inputValue.value && !selectedValue.value.code) {
    inputValue.value = '';
  }
};

watch(
  () => modelValue.value,
  () => {
    if (!selectedValue.value.name && inputValue.value) return;

    inputValue.value = modelValue.value;
  },
);

watchEffect(handleChangeInput);

onMounted(() => {
  setSelectValueWidth();
});
</script>

<template>
  <div id="test" class="s-text-combobox">
    <s-input
      v-show="!hideInput"
      v-model="inputValue"
      type="tel"
      :maxlength="maxLength"
      @blur="handleBlurInput"
      @input="handleInput"
    />

    <div v-click-outside="handleClose" class="select">
      <!-- select value -->
      <div
        class="select-value"
        :style="{ width: selectWidth }"
        @click="isShowOptions = !isShowOptions"
      >
        <span class="flex items-center">{{ selectedValue.name }}</span>
        <div class="absolute bottom-[0.5px] right-1">></div>
      </div>

      <!-- option -->
      <div class="relative">
        <v-fade-transition :disabled="!isShowOptions">
          <ul
            v-show="isShowOptions || isInvisibleOptions"
            ref="optionsElement"
            class="options !duration-100"
            :class="{ invisible: isInvisibleOptions }"
          >
            <li
              v-for="option in options"
              :key="option.code"
              class="option-item"
              :class="{ '-selected': option.code === selectedValue.code }"
              @click="handleSelectOption(option)"
            >
              {{ option.name }}
            </li>
          </ul>
        </v-fade-transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.s-text-combobox {
  @apply relative z-[1] flex h-[22px] select-none gap-px;

  .select {
    @apply flex h-full flex-col;

    .select-value {
      background: linear-gradient(#fafafa, #e4e4e4);
      @apply relative flex h-full min-w-[72px] rounded border border-[#a8aaaa] pl-0.5 pr-5 leading-[22px];

      &:hover {
        @apply border-[#006ec8];
      }

      &:after {
        content: '';
        @apply absolute right-[18px] top-[3px] h-3.5 w-px bg-[#a8aaaa];
      }
    }

    .options {
      @apply absolute -top-px max-h-[110px] min-w-[72px] overflow-auto rounded-sm border border-[#89888a] bg-white;

      .option-item {
        @apply h-[22px] whitespace-nowrap px-0.5 leading-[22px];

        &:hover {
          @apply bg-[#aadeff];
        }

        &.-selected {
          @apply bg-[#7fcdfe];
        }
      }
    }
  }
}
</style>
