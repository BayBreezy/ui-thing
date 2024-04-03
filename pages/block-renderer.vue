<template>
  <NuxtLayout name="blank" :class="[$colorMode.value]">
    <component :is="params.component" :class="params.containerClass" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
  const params = useUrlSearchParams();
</script>
