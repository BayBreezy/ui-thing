<template>
  <div>
    <Heading
      title="Accordion"
      subtext="A vertically stacked set of interactive headings that each reveal a section of content."
      radix-link="https://www.radix-vue.com/components/accordion.html"
    />

    <UIAccordion type="single" default-value="item-2" :items="accordionItems" />
  </div>
</template>

<script lang="ts" setup>
  const accordionItems = [
    {
      value: "item-1",
      title: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      value: "item-2",
      title: "Is it unstyled?",
      content: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    },
    {
      value: "item-3",
      title: "Can it be animated?",
      content: "Yes! You can use the transition prop to configure the animation.",
    },
  ];
</script>
