<template>
  <MenubarTrigger :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot />
  </MenubarTrigger>
</template>

<script lang="ts" setup>
  import { MenubarTrigger } from "radix-vue";
  import type { MenubarTriggerProps } from "radix-vue";

  const props = defineProps<
    MenubarTriggerProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();

  const styles = tv({
    base: "flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground",
  });
</script>
