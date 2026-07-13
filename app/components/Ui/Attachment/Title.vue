<template>
  <Primitive
    data-slot="attachment-title"
    v-bind="forwarded"
    :class="attachmentTitleStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const attachmentTitleStyles = tv({
    base: "group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block max-w-full min-w-0 truncate font-medium",
  });

  export type AttachmentTitleProps = PrimitiveProps & {
    /** Additional classes to apply to the title. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AttachmentTitleProps>(), {
    as: "span",
  });

  const forwarded = reactiveOmit(props, ["class"]);
</script>
