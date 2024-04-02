<script lang="ts" setup>
import SButton from './s-button.vue';
import SCheckbox from './s-checkbox.vue';
import SGrid from './s-grid.vue';
import SRadio from './s-radio.vue';
import SSection from './s-section.vue';
import STextCombobox from './s-text-combobox.vue';
const x = ref(1);
const y = ref([1]);

const options = [
  { code: '', name: '' },
  { code: '1', name: '外国株' },
  { code: '2', name: '付注' },
  { code: '3', name: '等買付' },
  { code: '4', name: '等買付' },
  { code: '5', name: '等買付' },
  { code: '6', name: '等買付' },
  { code: '7', name: '等買付' },
  { code: '8', name: '等買付' },
];

const c = ref('1');

watch(
  () => x.value,
  () => {
    c.value = x.value.toString();
  },
);
</script>

<template>
  <div class="s-window">
    <div class="window-header">
      <p>CW81000010 外国株式等買付注文</p>
      <g-icon class="w-[10.5px]" icon="c-close" />
    </div>

    <div class="window-main">
      <s-section>
        <div class="flex gap-2.5">
          <s-radio v-model="x" disabled label="外国株" name="x" :value="1" />
          <s-radio v-model="x" label="買付" name="x" :value="2" />
          <s-radio v-model="x" label="注文" name="x" :value="3" />
        </div>
      </s-section>
      <s-section>
        <div class="flex items-center gap-2">
          <label>買付</label>
          <s-text-combobox v-model="c" max-length="2" :options="options" />
        </div>
      </s-section>

      <s-section is-full>
        <s-grid>
          <div>test</div>
        </s-grid>
      </s-section>
      {{ y }}
      <s-section>
        <s-checkbox v-model="y" label="買付" name="x" :value="1" />
        <s-checkbox v-model="y" label="買付" name="y" :value="2" />
        <s-checkbox v-model="y" label="買付" name="z" :value="3" />
      </s-section>
    </div>

    <div class="window-footer">
      <s-button>買付</s-button>
      <div class="flex gap-2.5">
        <s-button disabled>買付</s-button>
        <s-button>外国株</s-button>
        <s-button>株式等</s-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.s-window {
  box-shadow: 2px 2px 4px 0 #9a9a9b;
  background: linear-gradient(#fff, #ccc);
  @apply flex w-[800px] flex-col rounded-[7px] border border-[#616161] bg-red-100 text-xs text-cdark-2;
}

.window-header {
  background: linear-gradient(180deg, #ffffff, #b7b7c4);
  border-radius: 7px 7px 0 0;
  @apply flex h-7 items-center justify-between px-2.5 font-bold;
}

.window-main {
  @apply min-h-[200px];
}

.window-footer {
  @apply my-[3px] flex justify-between px-[5px];
}
</style>
