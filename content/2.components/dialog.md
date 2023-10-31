---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/dialog.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/dialog.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Dialog"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add dialog
```

## Usage

::ShowCase{component="DocsDialog"}

#code

```vue [DocsDialog.vue]
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
