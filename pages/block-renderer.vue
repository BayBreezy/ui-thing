<template>
  <NuxtLayout name="blank">
    <component :is="params.component" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
  const params = useUrlSearchParams();
</script>
