<script setup lang="ts">
  const iconPaths = import.meta.glob<any>('@/assets/icons/*.svg');

  const components = shallowRef<{ [k: string]: ReturnType<typeof defineAsyncComponent> }>({});
  Object.keys(iconPaths).forEach((path) => {
    const componentName = path.replace(/.*\/(.*)\.svg/, '$1');

    components.value[componentName] = defineAsyncComponent(iconPaths[path]);
  });

  const props = defineProps<{ icon: TIcon }>();
</script>

<template>
  <component :is="components[props.icon]" />
</template>
