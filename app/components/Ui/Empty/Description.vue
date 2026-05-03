<template>
  <Primitive
    data-slot="empty-description"
    :class="emptyDescriptionStyles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const emptyDescriptionStyles = tv({
    base: "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
  });

  export type EmptyDescriptionProps = PrimitiveProps & {
    /** Additional classes to apply to the parent element. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<EmptyDescriptionProps>();
  const forwarded = reactiveOmit(props, ["class"]);
</script>
