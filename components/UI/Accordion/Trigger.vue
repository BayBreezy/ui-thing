<template>
  <AccordionTrigger v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      {{ title }}
    </slot>
    <slot name="icon">
      <Icon v-if="icon" :name="icon" class="h-4 w-4 shrink-0 transition-transform duration-200" />
    </slot>
  </AccordionTrigger>
</template>

<script lang="ts" setup>
  import { AccordionTrigger, useForwardProps } from "radix-vue";
  import type { AccordionTriggerProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      AccordionTriggerProps & {
        class?: any;
        title?: string;
        icon?: string;
      }
    >(),
    {
      icon: "lucide:chevron-down",
    }
  );
  const forwarded = useForwardProps(useOmit(props, ["class", "title", "icon"]));

  const styles = tv({
    base: "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&[data-state=open]>svg]:rotate-180",
  });
</script>
