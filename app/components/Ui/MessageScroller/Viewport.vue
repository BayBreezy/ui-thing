<template>
  <div
    :ref="setViewportRef"
    data-slot="message-scroller-viewport"
    role="region"
    aria-label="Messages"
    :tabindex="0"
    :class="messageScrollerViewportStyles({ class: normalizeClass(props.class) || undefined })"
    @scroll="onScroll"
    @wheel="onWheel"
    @touchmove="onTouchMove"
    @keydown="onKeyDown"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { ComponentPublicInstance, HTMLAttributes } from "vue";

  export const messageScrollerViewportStyles = tv({
    // `scrollbar-thin` and `scrollbar-gutter-stable` stay on unconditionally
    // so the reserved gutter width never changes. While `data-autoscrolling`
    // is set, only the scrollbar's paint is faded to transparent (color, not
    // `scrollbar-width`) — that hides it during the animation without ever
    // changing box-model width, so nothing reflows and
    // `MessageScrollerButton` doesn't jump back into view mid-click.
    base: "scroll-fade-b size-full min-h-0 min-w-0 scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain transition-[scrollbar-color] duration-200 contain-content data-autoscrolling:[scrollbar-color:transparent_transparent] data-autoscrolling:[&::-webkit-scrollbar-thumb]:bg-transparent data-autoscrolling:[&::-webkit-scrollbar-track]:bg-transparent",
  });

  export type MessageScrollerViewportProps = {
    /**
     * Keep the current view when messages are added above.
     *
     * @default true
     */
    preserveScrollOnPrepend?: boolean;
    /** Additional classes to apply to the viewport. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MessageScrollerViewportProps>(), {
    preserveScrollOnPrepend: true,
  });

  const {
    handleResize,
    registerViewport,
    setPreserveScrollOnPrepend,
    syncAfterScroll,
    userScrollIntent,
  } = useMessageScrollerContext();

  setPreserveScrollOnPrepend(props.preserveScrollOnPrepend);
  watch(
    () => props.preserveScrollOnPrepend,
    (value) => setPreserveScrollOnPrepend(value)
  );

  function onScroll() {
    syncAfterScroll();
  }

  function onWheel() {
    userScrollIntent();
  }

  function onTouchMove() {
    userScrollIntent();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (SCROLL_KEYS.has(event.key)) userScrollIntent();
  }

  let resizeObserver: ResizeObserver | null = null;
  let resizeFrame = 0;

  // A function ref fires with the element on mount and with `null` on
  // unmount, so registration and the ResizeObserver lifecycle live together.
  function setViewportRef(el: Element | ComponentPublicInstance | null) {
    const element = el instanceof HTMLElement ? el : null;
    registerViewport(element);

    resizeObserver?.disconnect();
    resizeObserver = null;
    if (element && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
    }
  }
</script>
