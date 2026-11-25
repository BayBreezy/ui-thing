<template>
  <DrawerIndentBackground
    data-slot="drawer-indent-background"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </DrawerIndentBackground>
</template>

<script lang="ts" setup>
  import { DrawerIndentBackground } from "reka-ui";
  import type { DrawerIndentBackgroundProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DrawerIndentBackgroundProps & {
      /** Custom class(es) to add to the parent. */
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({
    base: "bg-muted absolute inset-0",
  });
</script>
