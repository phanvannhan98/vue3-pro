<script lang="ts" setup>
type TMenuItemInfo = {
  applicationId: string;
  applicationName: string;
  children?: TMenuItemInfo[];
};

defineProps<{ menuItemInfo: TMenuItemInfo; isBaseMenu?: true }>();
</script>

<template>
  <v-menu
    v-if="menuItemInfo.children?.length! > 0"
    attach="header"
    transition="scale-transition"
    :location="isBaseMenu ? 'bottom' : 'right'"
    :offset="isBaseMenu ? '4px' : 0"
  >
    <template #activator="{ props }">
      <v-list-item class="flex" v-bind="props">
        <v-list-item-title>{{ menuItemInfo.applicationName }}</v-list-item-title>
        <template v-if="!isBaseMenu" #append><span class="ml-3 text-xs">></span></template>
      </v-list-item>
    </template>

    <v-list class="!p-0">
      <template v-for="item in menuItemInfo.children" :key="item.applicationId">
        <menu-item :menu-item-info="item" />
      </template>
    </v-list>
  </v-menu>
  <v-list-item v-else>
    <v-list-item-title>{{ menuItemInfo.applicationName }}</v-list-item-title>
  </v-list-item>
</template>
