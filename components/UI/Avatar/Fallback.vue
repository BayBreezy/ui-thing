<template>
  <AvatarFallback :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>
      {{ fallback }}
    </slot>
  </AvatarFallback>
</template>

<script lang="ts" setup>
  import { AvatarFallback, useForwardProps } from "radix-vue";
  import type { AvatarFallbackProps } from "radix-vue";

  const props = defineProps<
    AvatarFallbackProps & {
      fallback?: string;
      class?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["fallback", "class"]));

  const styles = tv({
    base: "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium",
  });
</script>
