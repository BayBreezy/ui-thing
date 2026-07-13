<template>
  <Primitive
    data-slot="attachment-description"
    v-bind="forwarded"
    :class="attachmentDescriptionStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const attachmentDescriptionStyles = tv({
    base: "text-muted-foreground group-data-[state=error]/attachment:text-destructive/80 mt-0.5 block max-w-full min-w-0 truncate text-xs",
  });

  export type AttachmentDescriptionProps = PrimitiveProps & {
    /** Additional classes to apply to the description. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AttachmentDescriptionProps>(), {
    as: "span",
  });

  const forwarded = reactiveOmit(props, ["class"]);
</script>
