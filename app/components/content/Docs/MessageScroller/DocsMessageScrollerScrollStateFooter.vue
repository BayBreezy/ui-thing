<template>
  <UiCardFooter class="text-muted-foreground justify-center border-t text-center text-sm">
    {{ status }}
  </UiCardFooter>
</template>

<script lang="ts" setup>
  const scrollable = useMessageScrollerScrollable();

  const status = computed(() => {
    const { start, end } = scrollable.value;
    if (start && end) return "You can scroll both ways.";
    if (end) return "You are at the top. You can only scroll down.";
    if (start) return "You are at the bottom. You can only scroll up.";
    return "All messages fit in the viewport.";
  });
</script>
