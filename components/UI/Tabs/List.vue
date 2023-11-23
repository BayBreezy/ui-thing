<template>
  <TabsList :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot></slot>
  </TabsList>
</template>

<script lang="ts" setup>
  import { TabsList } from "radix-vue";
  import type { TabsListProps } from "radix-vue";

  const props = defineProps<
    TabsListProps & {
      /** Custom class(es) to add to parent element */
      class?: any;
    }
  >();

  const styles = tv({
    base: "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
  });
</script>
