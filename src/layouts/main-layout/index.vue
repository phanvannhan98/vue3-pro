<script setup lang="ts">
import AppHeader from './components/app-header/index.vue';
import SidebarLeft from './components/sidebar-left/index.vue';
// import SidebarRight from './components/sidebar-right/index.vue';
</script>

<template>
  <div class="flex h-screen w-screen bg-cgray-2">
    <sidebar-left class="z-20" />
    <div class="flex min-w-0 flex-1">
      <div class="flex w-full flex-col">
        <app-header />

        <div class="min-h-0 min-w-0 flex-1 overflow-auto">
          <router-view />
        </div>
      </div>
    </div>
    <!-- <div class="z-20 w-96 bg-white">
      <sidebar-right />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.basic-layout-wrap {
  height: 100vh;
  overflow: hidden;

  .basic-layout-content {
    height: calc(100vh - 80px);
    overflow-y: auto;
    margin: 0;
  }
}
</style>
