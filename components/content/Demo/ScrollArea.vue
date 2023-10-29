<template>
  <div>
    <Heading
      title="ScrollArea"
      subtext="Augments native scroll functionality for custom, cross-browser styling."
      radix-link="https://www.radix-vue.com/components/scroll-area.html"
    />

    <UIScrollArea class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
        <template v-for="(tag, i) in tags" :key="i">
          <div class="text-sm">{{ tag }}</div>
          <UISeparator class="my-2" />
        </template>
      </div>
    </UIScrollArea>
  </div>
</template>

<script lang="ts" setup>
  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>
