<template>
  <MenubarTrigger
    data-slot="menubar-trigger"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </MenubarTrigger>
</template>

<script lang="ts" setup>
  import { MenubarTrigger } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarTriggerProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    MenubarTriggerProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
  });
</script>
