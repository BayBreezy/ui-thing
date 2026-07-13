<template>
  <Primitive
    data-slot="attachment-group"
    v-bind="forwarded"
    :class="attachmentGroupStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const attachmentGroupStyles = tv({
    base: "scroll-fade-x flex min-w-0 snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
  });

  export type AttachmentGroupProps = PrimitiveProps & {
    /** Additional classes to apply to the group. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AttachmentGroupProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
