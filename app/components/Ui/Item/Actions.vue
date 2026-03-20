<template>
  <Primitive
    data-slot="item-actions"
    v-bind="forwarded"
    :class="itemActionsStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const itemActionsStyles = tv({
    base: "flex items-center gap-2",
  });

  export type ItemActionsProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ItemActionsProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
