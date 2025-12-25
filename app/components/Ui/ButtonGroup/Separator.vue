<template>
  <UiSeparator
    v-bind="forwarded"
    data-slot="button-group-separator"
    :orientation="orientation"
    :class="buttonGroupSeparatorStyles({ class: props.class })"
  >
    <slot />
  </UiSeparator>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const buttonGroupSeparatorStyles = tv({
    base: "relative m-0! self-stretch bg-input data-[orientation=vertical]:h-auto",
  });

  export type ButtonGroupSeparatorProps = {
    /**
     * The orientation of the separator.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Additional classes to apply to the button group text.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ButtonGroupSeparatorProps>(), {
    orientation: "vertical",
  });

  const forwarded = reactiveOmit(props, ["class"]);
</script>
