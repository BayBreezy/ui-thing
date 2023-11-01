---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal an associated section of content.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/accordion
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/accordion#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Accordion"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add accordion
```

You also need to add the animations to your `tailwind.config.js` file:

```js
keyframes: {
  "accordion-down": {
    from: { height: "0px" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0px" },
  },
},
animation: {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
},
```

## Usage

::ShowCase{component="DocsAccordion"}

#code

```vue [DocsAccordion.vue]
<template>
  <div>
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
```

::
