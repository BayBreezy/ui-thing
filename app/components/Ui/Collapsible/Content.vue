<template>
  <CollapsibleContent
    data-slot="collapsible-content"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </CollapsibleContent>
</template>

<script lang="ts" setup>
  import { CollapsibleContent } from "reka-ui";
  import type { CollapsibleContentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    CollapsibleContentProps & {
      /** Customer class(es) to add to the element */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "overflow-hidden transition duration-200 will-change-auto data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
  });
</script>
