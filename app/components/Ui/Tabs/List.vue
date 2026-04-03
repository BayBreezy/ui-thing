<template>
  <TabsList
    data-slot="tabs-list"
    :class="styles({ pill, class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </TabsList>
</template>

<script lang="ts" setup>
  import { TabsList } from "reka-ui";
  import type { TabsListProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      TabsListProps & {
        /** Custom class(es) to add to parent element */
        class?: HTMLAttributes["class"];
        pill?: boolean;
      }
    >(),
    { pill: true }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "inline-flex w-fit items-center justify-center rounded-md p-0.5 text-muted-foreground/70",
    variants: {
      pill: {
        true: "bg-muted",
        false: "",
      },
    },
  });
</script>
