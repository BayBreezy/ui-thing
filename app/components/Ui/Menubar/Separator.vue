<template>
  <MenubarSeparator
    data-slot="menubar-separator"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  />
</template>

<script lang="ts" setup>
  import { MenubarSeparator } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarSeparatorProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    MenubarSeparatorProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "-mx-1 my-1 h-px bg-border",
  });
</script>
