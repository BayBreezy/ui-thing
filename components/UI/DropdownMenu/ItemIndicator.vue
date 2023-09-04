<template>
  <DropdownMenuItemIndicator :as-child="asChild" :forceMount="forceMount">
    <slot>
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
    </slot>
  </DropdownMenuItemIndicator>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    forceMount?: boolean;
    icon?: string;
  }>();
</script>
