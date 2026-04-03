<template>
  <DropdownMenuItemIndicator
    data-slot="dropdown-menu-item-indicator"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" class="size-4" />
    </slot>
  </DropdownMenuItemIndicator>
</template>

<script lang="ts" setup>
  import { DropdownMenuItemIndicator } from "reka-ui";
  import type { DropdownMenuItemIndicatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DropdownMenuItemIndicatorProps & {
      /** The icon to display */
      icon?: string;
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon");

  const styles = tv({
    base: "flex items-center justify-center",
  });
</script>
