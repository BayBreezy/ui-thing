<template>
  <div
    :ref="setItemRef"
    data-slot="message-scroller-item"
    :data-message-id="messageId"
    :data-scroll-anchor="scrollAnchor ? 'true' : 'false'"
    :class="messageScrollerItemStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { ComponentPublicInstance, HTMLAttributes } from "vue";

  export const messageScrollerItemStyles = tv({
    base: "min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
  });

  export type MessageScrollerItemProps = {
    /** Stable id used for anchoring, visibility, and jumps. */
    messageId?: string;
    /**
     * Marks this row as the start of a turn.
     *
     * @default false
     */
    scrollAnchor?: boolean;
    /** Additional classes to apply to the item. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MessageScrollerItemProps>(), {
    scrollAnchor: false,
  });

  const register = useMessageScrollerRegister();

  let previous: HTMLElement | null = null;

  function setItemRef(el: Element | ComponentPublicInstance | null) {
    const element = el instanceof HTMLElement ? el : null;
    const prev = previous;
    previous = element;
    if (props.messageId) register(props.messageId, element, prev);
  }
</script>
