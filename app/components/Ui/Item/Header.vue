<template>
  <Primitive
    data-slot="item-header"
    v-bind="forwarded"
    :class="itemHeaderStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const itemHeaderStyles = tv({
    base: "flex basis-full items-center justify-between gap-2",
  });

  export type ItemHeaderProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ItemHeaderProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
