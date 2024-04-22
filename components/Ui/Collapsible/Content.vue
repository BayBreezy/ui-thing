<template>
  <CollapsibleContent :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot />
  </CollapsibleContent>
</template>

<script lang="ts" setup>
  import { CollapsibleContent } from "radix-vue";
  import type { CollapsibleContentProps } from "radix-vue";

  const props = defineProps<
    CollapsibleContentProps & {
      /** Customer class(es) to add to the element */
      class?: any;
    }
  >();

  const styles = tv({
    base: "overflow-hidden transition will-change-auto data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
  });
</script>
