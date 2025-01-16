<script lang="ts" setup>
  const items = [
    {
      id: "1",
      value: "1",
      title: "What makes UI Thing different?",
      content:
        "UI Thing focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
    },
    {
      id: "2",
      value: "2",
      title: "How can I customize the components?",
      content:
        "Use our CSS variables for global styling, or class and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
    },
    {
      id: "3",
      value: "3",
      title: "Is UI Thing optimized for performance?",
      content:
        "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
    },
    {
      id: "4",
      value: "4",
      title: "How accessible are the components?",
      content:
        "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
    },
  ];
</script>

<template>
  <div class="mx-auto max-w-lg">
    <UiAccordion :items type="single" collapsible class="w-full -space-y-px" default-value="3">
      <UiAccordionItem
        v-for="item in items"
        :key="item.id"
        :value="item.value"
        class="border bg-background px-4 py-1 first:rounded-t-lg last:rounded-b-lg"
      >
        <UiAccordionTrigger class="w-full py-2 text-[15px] leading-6 hover:no-underline">
          {{ item.title }}
        </UiAccordionTrigger>
        <UiAccordionContent class="text-muted-foreground">
          {{ item.content }}
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>
  </div>
</template>
