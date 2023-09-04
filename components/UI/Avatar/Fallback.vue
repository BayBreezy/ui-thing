<template>
  <AvatarFallback :delay-ms="delayMs" :as-child="asChild" :class="styles({ class: props.class })">
    <slot>
      {{ fallback }}
    </slot>
  </AvatarFallback>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    fallback?: string;
    asChild?: boolean;
    class?: any;
    delayMs?: number;
  }>();

  const styles = tv({
    base: "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium",
  });
</script>
