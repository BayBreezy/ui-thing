<template>
  <Primitive
    data-slot="item-description"
    v-bind="forwarded"
    :class="itemDescriptionStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const itemDescriptionStyles = tv({
    base: [
      "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
      "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
    ],
  });

  export type ItemDescriptionProps = PrimitiveProps & {
    /** Additional classes to apply to the parent element. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ItemDescriptionProps>(), {
    as: "p",
  });

  const forwarded = reactiveOmit(props, ["class"]);
</script>
