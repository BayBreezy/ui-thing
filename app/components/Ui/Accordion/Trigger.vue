<template>
  <AccordionTrigger
    data-slot="accordion-trigger"
    v-bind="forwarded"
    :class="accordionTriggerStyle({ class: normalizeClass(props.class) || undefined })"
  >
    <slot :props="props">
      {{ title }}
    </slot>
    <slot name="icon" :props="props">
      <Icon
        v-if="icon"
        data-slot="accordion-trigger-icon"
        mode="svg"
        :name="icon"
        class="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200"
      />
    </slot>
  </AccordionTrigger>
</template>

<script lang="ts">
  import { AccordionTrigger } from "reka-ui";
  import type { AccordionTriggerProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const accordionTriggerStyle = tv({
    base: "focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<
      AccordionTriggerProps & {
        /** Custom class(es) to add to the parent. */
        class?: HTMLAttributes["class"];
        /** The title of the accordion trigger. */
        title?: string;
        /** The icon to show next to the title. */
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
</script>
