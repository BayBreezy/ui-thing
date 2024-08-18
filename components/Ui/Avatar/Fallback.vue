<template>
  <AvatarFallback :class="styles({ class: props.class })" v-bind="forwarded">
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
      /** The text to display inside th eavatar */
      fallback?: string;
      /** Custom class(es) to add to the element */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "fallback");
  const styles = tv({
    base: "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium",
  });
</script>
