<template>
  <Primitive
    data-slot="item-title"
    v-bind="forwarded"
    :class="itemTitleStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const itemTitleStyles = tv({
    base: "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
  });

  export type ItemTitleProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ItemTitleProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
