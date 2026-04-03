<template>
  <DropdownMenuSeparator
    data-slot="dropdown-menu-separator"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  />
</template>

<script lang="ts" setup>
  import { DropdownMenuSeparator } from "reka-ui";
  import type { DropdownMenuSeparatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DropdownMenuSeparatorProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "-mx-1 my-1 h-px bg-border",
  });
</script>
