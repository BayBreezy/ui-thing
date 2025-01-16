<template>
  <AccordionTrigger v-bind="forwarded" :class="styles({ class: props.class })">
    <slot :props="props">
      {{ title }}
    </slot>
    <slot name="icon" :props="props">
      <Icon
        v-if="icon"
        mode="svg"
        :name="icon"
        class="h-4 w-4 shrink-0 transition-transform duration-200"
      />
    </slot>
  </AccordionTrigger>
</template>

<script lang="ts" setup>
  import { AccordionTrigger } from "radix-vue";
  import type { AccordionTriggerProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      AccordionTriggerProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
        /** The title of the accordion trigger */
        title?: string;
        /** The icon to show next to the title */
        icon?: string;
      }
    >(),
    {
      class: undefined,
      title: "",
      icon: "lucide:chevron-down",
    }
  );

  const forwarded = reactiveOmit(props, "class", "icon", "title");

  const styles = tv({
    base: "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&[data-state=open]>svg]:rotate-180",
  });
</script>
