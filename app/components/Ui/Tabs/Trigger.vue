<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="forwarded"
    :class="styles({ pill, class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </TabsTrigger>
</template>

<script lang="ts" setup>
  import { TabsTrigger } from "reka-ui";
  import type { TabsTriggerProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      TabsTriggerProps & {
        /** Custom class(es) to add to parent element */
        class?: HTMLAttributes["class"];
        /** Whether the trigger should be pill-shaped */
        pill?: boolean;
      }
    >(),
    {
      pill: true,
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all outline-none hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs [&_svg]:shrink-0",
    variants: {
      pill: {
        true: "",
        false:
          "hover:text-foreground focus-visible:border-none focus-visible:ring-1 data-[state=active]:shadow-none",
      },
    },
  });
</script>
