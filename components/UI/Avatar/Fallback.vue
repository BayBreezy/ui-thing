<template>
  <AvatarFallback :class="styles({ class: props.class })" v-bind="props">
    <slot>
      {{ fallback }}
    </slot>
  </AvatarFallback>
</template>

<script lang="ts" setup>
  import { AvatarFallback } from "radix-vue";
  import type { AvatarFallbackProps } from "radix-vue";

  const props = defineProps<
    AvatarFallbackProps & {
      fallback?: string;
      class?: any;
    }
  >();
  const styles = tv({
    base: "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium",
  });
</script>
