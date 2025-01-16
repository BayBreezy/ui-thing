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
    <UiAccordion :items type="single" collapsible class="w-full" default-value="3">
      <template #trigger="{ item, open }">
        <UiAccordionTrigger
          :icon="''"
          class="justify-start gap-3 text-[15px] leading-6 hover:no-underline"
        >
          <Icon name="lucide:chevron-down" :class="['transition', open && 'rotate-180']" />
          {{ item.title }}
        </UiAccordionTrigger>
      </template>
      <template #content="{ item }">
        <UiAccordionContent class="text-muted-foreground">{{ item.content }}</UiAccordionContent>
      </template>
    </UiAccordion>
  </div>
</template>
