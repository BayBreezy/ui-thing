<template>
  <ClientOnly>
    <DropdownMenuTrigger v-bind="$attrs" :as-child="asChild">
      <slot></slot>
    </DropdownMenuTrigger>
  </ClientOnly>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
