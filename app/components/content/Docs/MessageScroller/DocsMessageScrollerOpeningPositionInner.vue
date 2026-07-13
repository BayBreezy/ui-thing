<template>
  <slot />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    position: "start" | "end" | "last-anchor";
    positionKey: number;
  }>();

  const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScroller();

  // Scroll positioning is client-only, so drive it from onMounted (which does
  // not run during SSR) plus a watcher for later changes.
  let frame = 0;
  function applyPosition() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (props.position === "start") {
        scrollToStart({ behavior: "auto" });
        return;
      }
      if (props.position === "end") {
        scrollToEnd({ behavior: "auto" });
        return;
      }
      scrollToMessage("open-3", { align: "start", behavior: "auto", scrollMargin: 64 });
    });
  }

  onMounted(applyPosition);
  watch(() => [props.position, props.positionKey], applyPosition);
  onBeforeUnmount(() => cancelAnimationFrame(frame));
</script>
