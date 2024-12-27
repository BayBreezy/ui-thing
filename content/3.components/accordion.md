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

## Usage

### Basic

The most common way to use the accordion is by just passing an array of items to the `items` prop. Each item should have a `value`, `title`, and `content`.

::ShowCase

:DocsAccordion

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordion.vue" code lang="vue" -->

```vue [DocsAccordion.vue]
<template>
  <UiAccordion type="single" default-value="item-2" :items="accordionItems" />
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

<!-- /automd -->

::

### Custom styling

If you want to change the way that the items look, you can do so by using the different components that the accordion is composed of.

::ShowCase

:DocsAccordionVariant

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionVariant.vue" code lang="vue" -->

```vue [DocsAccordionVariant.vue]
<template>
  <UiAccordion :default-value="[accordionItems[1].value]" type="multiple" :items="accordionItems">
    <template v-for="(i, k) in accordionItems" :key="k">
      <UiAccordionItem v-slot="{ open }" class="border-b-0" :value="i.value">
        <UiAccordionHeader>
          <UiAccordionTrigger
            :class="[open ? 'bg-muted underline hover:!underline' : 'bg-muted/50 no-underline']"
            class="mb-2 rounded-md px-3 text-left text-sm underline-offset-2 hover:bg-muted hover:no-underline"
            >{{ i.title }}</UiAccordionTrigger
          >
        </UiAccordionHeader>
        <UiAccordionContent>
          <div class="px-3 py-2 leading-8" v-html="i.content" />
        </UiAccordionContent>
      </UiAccordionItem>
    </template>
  </UiAccordion>
</template>

<script lang="ts" setup>
  const accordionItems = [
    {
      value: "item-1",
      title: "What is a Javascript framework?",
      content:
        "A JavaScript framework is an application framework written in JavaScript. It differs from a JavaScript library in its control flow: a library offers functions to be called by its parent code, whereas a framework defines the entire application design.",
    },
    {
      value: "item-2",
      title: "Is it easy to create a design system with Radix-Vue?",
      content:
        "Yes! Radix-Vue is a collection of low-level UI components that you can use to create a design system.",
    },
    {
      value: "item-3",
      title: "Can I customize the animation of the accordion?",
      content:
        "Of course! You can customize the animation of the accordion by updating the animation that is in the tailwind.config file.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Custom icon

You can change the `icon` that is displayed based on the open state of an item. Just override the the `trigger` slot and then override the `icon` slot.

::ShowCase

:DocsAccordionIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionIcon.vue" code lang="vue" -->

```vue [DocsAccordionIcon.vue]
<template>
  <UiAccordion type="single" default-value="item-2" :items="accordionItems">
    <template #trigger="{ open, item }">
      <UiAccordionTrigger
        class="text-left text-sm"
        :class="[open && 'underline underline-offset-2']"
        :title="item.title"
      >
        <template #icon>
          <Icon v-if="!open" name="lucide:plus" class="size-4 shrink-0" />
          <Icon v-else name="lucide:minus" class="size-4 shrink-0" />
        </template>
      </UiAccordionTrigger>
    </template>
  </UiAccordion>
</template>

<script lang="ts" setup>
  const accordionItems = [
    {
      value: "item-1",
      title: "What does it take to get a job at Apple?",
      content:
        "A lot of hard work and dedication. Apple is a great place to work, but it's not easy to get a job there. You need to be passionate about technology and willing to put in the time and effort to succeed.",
    },
    {
      value: "item-2",
      title: "How long does it take to learn a new programming language?",
      content:
        "It depends on the language and your level of experience. Some languages are easier to learn than others, but most people can learn the basics of a new language in a few weeks. To become proficient, it can take several months or even years of practice.",
    },
    {
      value: "item-3",
      title: "How many languages do I need to learn to become a software developer?",
      content:
        "You don't need to learn multiple languages to become a software developer, but it can be helpful. Most developers are proficient in at least one language, but knowing multiple languages can make you more versatile and marketable.",
    },
  ];
</script>
```

<!-- /automd -->

::
