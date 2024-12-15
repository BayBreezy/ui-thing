<template>
  <TabsTrigger v-bind="forwarded" :class="styles({ pill, class: props.class })">
    <slot />
  </TabsTrigger>
</template>

<script lang="ts" setup>
  import { TabsTrigger } from "radix-vue";
  import type { TabsTriggerProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      TabsTriggerProps & {
        /** Custom class(es) to add to parent element */
        class?: any;
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
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
      pill: {
        true: "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        false:
          "data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
      },
    },
  });
</script>
