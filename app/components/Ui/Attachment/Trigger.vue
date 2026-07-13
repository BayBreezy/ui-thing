<template>
  <Primitive
    data-slot="attachment-trigger"
    v-bind="forwarded"
    :class="attachmentTriggerStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const attachmentTriggerStyles = tv({
    base: "absolute inset-0 z-10 outline-none",
  });

  export type AttachmentTriggerProps = PrimitiveProps & {
    /** Additional classes to apply to the trigger. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AttachmentTriggerProps>(), {
    as: "button",
  });

  const forwarded = reactiveOmit(props, ["class"]);
</script>
