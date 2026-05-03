<template>
  <div class="flex w-full flex-col items-center gap-4">
    <UiScrollArea ref="scrollAreaRef" class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
        <template v-for="(tag, i) in tags" :key="i">
          <div
            :data-tag-index="i"
            :class="['text-sm', i === targetIndex && 'text-primary font-semibold']"
          >
            {{ tag }}
          </div>
          <UiSeparator v-if="i !== tags.length - 1" class="my-2" />
        </template>
      </div>
    </UiScrollArea>
    <div class="flex flex-wrap justify-center gap-2">
      <UiButton size="sm" variant="outline" @click="jumpScrollToTop">Jump Top</UiButton>
      <UiButton size="sm" variant="outline" @click="smoothScrollToTop">Smooth Top</UiButton>
      <UiButton size="sm" variant="outline" @click="scrollToTag">{{ tags[targetIndex] }}</UiButton>
      <UiButton size="sm" variant="outline" @click="scrollToBottom">Bottom</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const scrollAreaRef = useTemplateRef("scrollAreaRef");
  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
  const targetIndex = 24;

  const jumpScrollToTop = () => {
    scrollAreaRef.value?.scrollTop?.();
  };

  const smoothScrollToTop = () => {
    scrollAreaRef.value?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    scrollAreaRef.value?.scrollToBottom?.();
  };

  const scrollToTag = () => {
    const viewport = scrollAreaRef.value?.viewport;
    if (!viewport) return;
    const el = viewport.querySelector(`[data-tag-index="${targetIndex}"]`) as HTMLElement | null;
    if (!el) return;
    const elRect = el.getBoundingClientRect();
    const vpRect = viewport.getBoundingClientRect();
    const top =
      viewport.scrollTop +
      elRect.top -
      vpRect.top -
      viewport.clientHeight / 2 +
      el.clientHeight / 2;
    scrollAreaRef.value?.scrollTo({ top, behavior: "smooth" });
  };
</script>
