<template>
  <div
    ref="content"
    data-slot="message-scroller-content"
    role="log"
    aria-relevant="additions"
    :class="messageScrollerContentStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
    <div
      ref="spacer"
      aria-hidden="true"
      data-message-scroller-spacer=""
      hidden
      :class="normalizeClass(props.spacerClass) || undefined"
    />
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const messageScrollerContentStyles = tv({
    base: "flex h-max min-h-full flex-col gap-8",
  });

  export type MessageScrollerContentProps = {
    /** Additional classes to apply to the content element. */
    class?: HTMLAttributes["class"];
    /** Additional classes to apply to the trailing spacer element. */
    spacerClass?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<MessageScrollerContentProps>();

  const { handleContentChange, handleResize, setContentElement, setSpacerElement } =
    useMessageScrollerContext();

  const contentRef = useTemplateRef<HTMLElement>("content");
  const spacerRef = useTemplateRef<HTMLElement>("spacer");

  let mutationObserver: MutationObserver | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let resizeFrame = 0;

  onMounted(() => {
    const content = contentRef.value;
    if (!content) return;

    setContentElement(content);
    setSpacerElement(spacerRef.value ?? null);
    handleContentChange();

    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(() => handleContentChange());
      mutationObserver.observe(content, { childList: true });
    }

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(content);
    }
  });

  onBeforeUnmount(() => {
    window.cancelAnimationFrame(resizeFrame);
    mutationObserver?.disconnect();
    resizeObserver?.disconnect();
    mutationObserver = null;
    resizeObserver = null;
    setContentElement(null);
    setSpacerElement(null);
  });
</script>
