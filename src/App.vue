<script setup lang="ts">
  import { useTitle } from '@/hooks/useTitle';

  useTitle();
</script>

<template>
  <div>
    <router-view />
  </div>
</template>
