<template>
  <ClientOnly>
    <NuxtLayout name="blank">
      <component :is="params.component" :class="[params.containerClass]" />
    </NuxtLayout>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const params = useUrlSearchParams();
</script>
