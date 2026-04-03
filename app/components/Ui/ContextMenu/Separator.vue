<template>
  <ContextMenuSeparator
    data-slot="context-menu-separator"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="props"
  />
</template>

<script lang="ts" setup>
  import { ContextMenuSeparator } from "reka-ui";
  import type { ContextMenuSeparatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ContextMenuSeparatorProps & {
      /**Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({
    base: "-mx-1 my-1 h-px bg-border",
  });
</script>
