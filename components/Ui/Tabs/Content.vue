<template>
  <TabsContent v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
  </TabsContent>
</template>

<script lang="ts" setup>
  import { TabsContent } from "radix-vue";
  import type { TabsContentProps } from "radix-vue";

  const props = defineProps<
    TabsContentProps & {
      /** Custom class(es) to add to parent element */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  });
</script>
