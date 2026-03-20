<template>
  <Primitive
    role="list"
    data-slot="item-group"
    v-bind="forwarded"
    :class="itemGroupStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const itemGroupStyles = tv({
    base: "group/item-group flex flex-col",
  });

  export type ItemGroupProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ItemGroupProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
