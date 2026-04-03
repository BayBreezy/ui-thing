<template>
  <Primitive
    v-bind="forwarded"
    data-slot="input-group-text"
    :class="inputGroupTextStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const inputGroupTextStyles = tv({
    base: "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  });

  export type InputGroupText = PrimitiveProps & {
    /**
     * Additional classes to apply to the input group addon container.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<InputGroupText>();

  const forwarded = reactiveOmit(props, ["class"]);
</script>
