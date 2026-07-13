<template>
  <Primitive
    data-slot="attachment-actions"
    v-bind="forwarded"
    :class="attachmentActionsStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const attachmentActionsStyles = tv({
    base: "relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1",
  });

  export type AttachmentActionsProps = PrimitiveProps & {
    /** Additional classes to apply to the actions. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AttachmentActionsProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
