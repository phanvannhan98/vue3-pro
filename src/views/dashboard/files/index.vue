<script setup lang="ts">
  const value = ref();
  const options = [
    {
      id: 1,
      label: 'Education',
    },
    {
      id: 2,
      label: 'Art',
    },
    {
      id: 3,
      label: 'Sport',
    },
    {
      id: 4,
      label: 'Games 1',
    },
    {
      id: 5,
      label: 'Games 2',
    },
    {
      id: 6,
      label: 'Games 3',
    },
    {
      id: 7,
      label: 'Games 4',
    },
    {
      id: 8,
      label: 'Games 5',
    },
  ];
  const change = (...e) => {
    console.log(e);

    console.log(value);
  };
</script>

<template>
  <div class="flex h-full overflow-auto p-2">
    <div class="flex h-full w-full items-start justify-start gap-2 overflow-auto bg-white p-2">
      <g-selectbox v-model:value="value" disabled :options="options" @change="change" />
      <g-selectbox v-model:value="value" :options="options" @change="change" />
      <!-- <g-selectbox v-model:value="value" allow-clear :options="options" @change="change" /> -->

      <g-dropdown append-to-app class="mt-10" placement="bottom-right">
        <g-icon class="w-5" icon="three-dot-vertical" />
        <template #overlay>
          <g-menu class="w-52" :options="options">
            <g-menu-item :option="{ id: 1, label: 'xxx' }" @click="change" />
            <g-menu-item :option="{ id: 2, label: 'yyy' }" />
          </g-menu>
        </template>
      </g-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
