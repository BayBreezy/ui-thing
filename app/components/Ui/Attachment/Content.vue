<template>
  <Primitive
    data-slot="attachment-content"
    v-bind="forwarded"
    :class="attachmentContentStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const attachmentContentStyles = tv({
    base: "max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1",
  });

  export type AttachmentContentProps = PrimitiveProps & {
    /** Additional classes to apply to the content slot. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AttachmentContentProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
