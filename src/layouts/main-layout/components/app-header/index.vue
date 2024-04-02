<script setup lang="ts">
  import { MENUS } from './constant';

  const { matched } = toRefs(useRoute());

  const menus = computed(() => MENUS[matched.value[1].name!]);
</script>

<template>
  <div class="z-10 flex h-[66px] items-center justify-between gap-1 bg-white px-6 shadow">
    <div class="-ml-1.5 flex h-full min-w-0 flex-1 gap-1 overflow-x-auto">
      <router-link
        v-for="({ title, to }, index) in menus"
        :key="index"
        class="menu-item"
        :data-title="title"
        :to="{ name: to }"
      >
        {{ title }}
      </router-link>
    </div>
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2">
        <div class="flex h-full items-center border-r border-cgray-3 px-2 py-1">
          <div class="avatar-circle">
            <img alt="" src="https://ca.slack-edge.com/T052QKM2AHY-U052MM66X8D-50887b625fe0-512" />
          </div>
          <div class="avatar-circle">
            <img alt="" src="https://ca.slack-edge.com/T052QKM2AHY-U052MM66X8D-50887b625fe0-512" />
          </div>
          <div class="avatar-circle">
            <img alt="" src="https://ca.slack-edge.com/T052QKM2AHY-U052J24U7GE-g3083afc34f1-512" />
          </div>
          <div class="avatar-circle">
            <span class="avatar-circle__text text-cblue-5">R</span>
          </div>
        </div>
        <div class="avatar-circle !ml-0">
          <span class="avatar-circle__text">+</span>
        </div>
      </div>
      <label class="flex h-10 cursor-text items-center gap-6 rounded-lg bg-cgray-2 px-[34px]">
        <span><g-icon class="w-3" icon="search" /></span>
        <input
          id="search"
          class="w-32 bg-transparent text-xs text-cdark-1 outline-none placeholder:text-cgray-5"
          placeholder="Search everything"
        />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
