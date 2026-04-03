<template>
  <Primitive
    v-bind="forwarded"
    data-slot="button-group-text"
    :class="buttonGroupTextStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const buttonGroupTextStyles = tv({
    base: "flex items-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  });

  export type ButtonGroupTextProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the button group text.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<ButtonGroupTextProps>();

  const forwarded = reactiveOmit(props, ["class"]);
</script>
