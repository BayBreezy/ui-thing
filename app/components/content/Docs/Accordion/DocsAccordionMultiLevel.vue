<script lang="ts" setup>
  const items = [
    {
      id: "1",
      title: "What makes UI Thing different?",
      collapsibles: [
        {
          title: "What about performance?",
          content: "We optimize every component for maximum performance and minimal bundle size.",
        },
        {
          title: "How is the documentation?",
          content:
            "Our documentation is comprehensive and includes live examples for every component.",
        },
      ],
    },
    {
      id: "2",
      title: "How can I customize the components?",
      collapsibles: [
        {
          title: "Can I use custom themes?",
          content:
            "Yes, our theming system is fully customizable and supports both light and dark modes.",
        },
        {
          title: "What about Tailwind support?",
          content: "We have first-class support for Tailwind CSS with custom utility classes.",
        },
      ],
    },
    {
      id: "3",
      title: "Is UI Thing optimized for performance?",
      collapsibles: [
        {
          title: "What's the bundle size impact?",
          content:
            "Our components are tree-shakeable and typically add minimal overhead to your bundle.",
          open: true,
        },
        {
          title: "How is code splitting handled?",
          content: "We support automatic code splitting for optimal loading performance.",
        },
      ],
    },
    {
      id: "4",
      title: "How accessible are the components?",
      collapsibles: [
        {
          title: "Which screen readers are supported?",
          content: "We test with NVDA, VoiceOver, and JAWS to ensure broad compatibility.",
        },
        {
          title: "What about keyboard navigation?",
          content:
            "Full keyboard navigation support is implemented following WAI-ARIA best practices.",
        },
      ],
    },
  ];
</script>

<template>
  <div class="mx-auto max-w-lg">
    <UiAccordion type="single" collapsible class="w-full -space-y-px" default-value="3">
      <UiAccordionItem
        v-for="item in items"
        :key="item.id"
        :value="item.id"
        class="overflow-hidden border bg-background first:rounded-t-lg last:rounded-b-lg"
      >
        <UiAccordionTrigger
          :title="item.title"
          class="w-full px-4 py-3 text-[15px] leading-6 hover:no-underline"
        />
        <UiAccordionContent class="p-0 [&>div]:pb-0">
          <UiCollapsible
            v-for="collapsible in item.collapsibles"
            :key="collapsible.title"
            class="space-y-1 border-t border-border bg-accent px-4 py-3"
            :default-open="collapsible.open"
          >
            <UiCollapsibleTrigger
              class="flex gap-2 text-[15px] font-semibold leading-6 [&[data-state=open]>svg]:rotate-180"
            >
              <Icon
                name="lucide:chevron-down"
                mode="svg"
                class="mt-1 size-4 shrink-0 opacity-60 transition-transform duration-200"
                aria-hidden="true"
              />

              {{ collapsible.title }}
            </UiCollapsibleTrigger>
            <UiCollapsibleContent
              class="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden ps-6 text-sm text-muted-foreground transition-all"
            >
              {{ collapsible.content }}
            </UiCollapsibleContent>
          </UiCollapsible>
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>
  </div>
</template>
