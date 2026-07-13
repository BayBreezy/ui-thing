<template>
  <Primitive
    data-slot="message"
    :data-align="align"
    v-bind="forwarded"
    :class="messageStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const messageStyles = tv({
    base: "group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
  });

  export type MessageProps = PrimitiveProps & {
    /**
     * The alignment of the message in the conversation.
     *
     * @default "start"
     */
    align?: "start" | "end";
    /** Additional classes to apply to the row. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MessageProps>(), {
    align: "start",
  });

  const forwarded = reactiveOmit(props, ["align", "class"]);
</script>
