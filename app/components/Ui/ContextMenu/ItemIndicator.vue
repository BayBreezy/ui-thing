<template>
  <ContextMenuItemIndicator
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" class="size-4" />
    </slot>
  </ContextMenuItemIndicator>
</template>

<script lang="ts" setup>
  import { ContextMenuItemIndicator } from "reka-ui";
  import type { ContextMenuItemIndicatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ContextMenuItemIndicatorProps & {
      /** The icon to display */
      icon?: string;
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "icon");

  const styles = tv({
    base: "flex items-center justify-center",
  });
</script>
