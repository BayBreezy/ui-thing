<template>
  <TabsTrigger v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })">
    <slot></slot>
  </TabsTrigger>
</template>

<script lang="ts" setup>
  import { TabsTrigger } from "radix-vue";
  import type { TabsTriggerProps } from "radix-vue";

  const props = defineProps<
    TabsTriggerProps & {
      /** Custom class(es) to add to parent element */
      class?: any;
    }
  >();

  const styles = tv({
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
  });
</script>
