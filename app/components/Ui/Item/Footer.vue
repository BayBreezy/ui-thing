<template>
  <Primitive
    data-slot="item-footer"
    v-bind="forwarded"
    :class="itemFooterStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const itemFooterStyles = tv({
    base: "flex basis-full items-center justify-between gap-2",
  });

  export type ItemFooterProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ItemFooterProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
