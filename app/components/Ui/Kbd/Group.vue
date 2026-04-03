<template>
  <Primitive
    data-slot="kbd-group"
    v-bind="forwarded"
    :class="kbdGroupStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const kbdGroupStyles = tv({
    base: "inline-flex items-center gap-1",
  });

  export type KbdGroupProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<KbdGroupProps>(), {});
  const forwarded = reactiveOmit(props, "class");
</script>
