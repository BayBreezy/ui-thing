<template>
  <MenubarTrigger :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </MenubarTrigger>
</template>

<script lang="ts" setup>
  import { type MenubarTriggerProps } from "radix-vue";
  const props = defineProps<{
    asChild?: MenubarTriggerProps["asChild"];
    class?: any;
  }>();

  const styles = tv({
    base: "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground",
  });
</script>
