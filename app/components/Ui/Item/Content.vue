<template>
  <Primitive
    data-slot="item-content"
    v-bind="forwarded"
    :class="itemContentStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const itemContentStyles = tv({
    base: "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
  });

  export type ItemContentProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ItemContentProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
