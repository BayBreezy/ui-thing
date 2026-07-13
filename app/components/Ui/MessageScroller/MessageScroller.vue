<template>
  <div
    :ref="(el) => setRootElement(el as HTMLElement | null)"
    data-slot="message-scroller"
    :class="messageScrollerStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const messageScrollerStyles = tv({
    base: "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
  });

  export type MessageScrollerProps = {
    /** Additional classes to apply to the root element. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<MessageScrollerProps>();

  const { setRootElement } = useMessageScrollerContext();
</script>
