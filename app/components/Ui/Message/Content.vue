<template>
  <Primitive
    data-slot="message-content"
    v-bind="forwarded"
    :class="messageContentStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const messageContentStyles = tv({
    base: "flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end",
  });

  export type MessageContentProps = PrimitiveProps & {
    /** Additional classes to apply to the content wrapper. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MessageContentProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
