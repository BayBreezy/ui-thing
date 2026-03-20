<template>
  <AccordionContent
    data-slot="accordion-content"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <div class="pt-0 pb-4">
      <slot>{{ content }}</slot>
    </div>
  </AccordionContent>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
</script>

<script lang="ts" setup>
  import { AccordionContent } from "reka-ui";
  import type { AccordionContentProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    AccordionContentProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** The content of the accordion */
      content?: any;
    }
  >();

  const forwarded = reactiveOmit(props, "class", "content");

  const styles = tv({
    base: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  });
</script>
