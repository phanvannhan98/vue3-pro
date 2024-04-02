<script lang="ts" setup>
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { type ColDef, type SizeColumnsToContentStrategy } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';

import SButton from './s-button.vue';
import SInput from './s-input.vue';

const rowData = ref([
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
]);

const x: SizeColumnsToContentStrategy = {
  type: 'fitCellContents',
  colIds: ['make'],
};

const limitNumber = ref(10);

const defaultColDef = ref<ColDef>({
  lockPinned: true,
  minWidth: 0,
  initialWidth: 0,
});

const colDefs = ref<ColDef[]>([
  {
    field: 'make',
    cellRenderer: SButton,
    cellRendererParams: () => ({
      onClick: () => console.log('xx'),
      text: '買付',
    }),
    headerName: '',
    maxWidth: 62,
    minWidth: 62,
  },
  { field: 'model', flex: 1, headerName: '買付' },
  { field: 'price', flex: 1, headerName: '買買付' },
  { field: 'electric', flex: 1, headerName: '付買付', editable: false },
]);

const des = () => {
  if (limitNumber.value === 0) return;

  limitNumber.value--;
};

const inc = () => {
  limitNumber.value++;
};

const test = (e) => {
  console.log(e);
};

watch(
  () => colDefs.value,
  () => {
    console.log(colDefs);
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div class="s-grid">
    <div class="ip-number-wrapper">
      <s-input v-model="limitNumber" class="!w-20 pr-6 text-right" type="number" />
      <div class="absolute right-0 top-0 flex h-full w-[22px] flex-col">
        <div class="ip-arrow rounded-tr-sm !border-b-[0.5px]" @click="inc"></div>
        <div class="ip-arrow rounded-br-sm !border-t-[0.5px]" @click="des"></div>
      </div>
    </div>

    <ag-grid-vue
      suppress-drag-leave-hides-columns
      class="ag-theme-quartz h-[264px]"
      header-height="22"
      row-height="24"
      :auto-size-strategy="x"
      :column-defs="colDefs"
      :default-col-def="defaultColDef"
      :row-data="rowData"
      @column-moved="test"
    >
      <template #model>xx</template>
    </ag-grid-vue>
  </div>
</template>

<style lang="scss">
.s-grid {
  .ip-number-wrapper {
    @apply relative mb-px text-right border-[#b7b7b7];

    .ip-arrow {
      background: linear-gradient(#fefefe, #d7d8d8);
      @apply flex-1 bg-red-50 border border-[#b7b7b7] cursor-pointer hover:border-[#5bc0fe];
    }
  }

  .ag-theme-quartz {
    --ag-font-size: inherit;
    --ag-font-family: inherit;
    --ag-secondary-foreground-color: #0b333c;
    --ag-data-color: #0b333c;
    --ag-header-cell-hover-background-color: #b2e1ff;
    --ag-header-cell-moving-background-color: #b2e1ff;
    --ag-header-column-resize-handle-height: 100%;
    --ag-header-column-resize-handle-width: 1px;
    --ag-cell-horizontal-padding: 5px;
    --ag-odd-row-background-color: #ffffff;
    --ag-border-color: #b7b7b7;
    --ag-cell-horizontal-border: 1px solid #b7b7b7;
    --ag-background-color: #f7f7f7;
    --ag-wrapper-border-radius: 0,
    --ag-icon-font-code-arrows: '';

    .ag-header {
      background: linear-gradient(#ffffff, #e1e1e1);

      &-cell {
        @apply border-r border-[#b7b7b7];

        &-resize {
          @apply w-1 right-[-3px];
        }

        &-label {
          justify-content: center;
        }
      }
    }

    .ag-cell {
      @apply flex items-center;
    }

    .s-button {
      height: 18px;
    }
  }
}
</style>
