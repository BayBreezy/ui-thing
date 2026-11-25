<template>
  <DrawerProvider>
    <slot />
  </DrawerProvider>
</template>

<script lang="ts" setup>
  import { DrawerProvider } from "reka-ui";
</script>
