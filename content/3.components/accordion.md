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

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/accordions). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### With Chevron

::ShowCase

:DocsAccordionWithChevron

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionWithChevron.vue" code lang="vue" -->

```vue [DocsAccordionWithChevron.vue]
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
        <UiAccordionTrigger class="text-[15px] leading-6 hover:no-underline">
          {{ item.title }}
          <template #icon>
            <Icon name="lucide:chevron-down" :class="['transition', open && 'rotate-180']" />
          </template>
        </UiAccordionTrigger>
      </template>
      <template #content="{ item }">
        <UiAccordionContent class="text-muted-foreground">{{ item.content }}</UiAccordionContent>
      </template>
    </UiAccordion>
  </div>
</template>
```

<!-- /automd -->

::

### With Chevron Left

::ShowCase

:DocsAccordionWithChevronLeft

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionWithChevronLeft.vue" code lang="vue" -->

```vue [DocsAccordionWithChevronLeft.vue]
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
```

<!-- /automd -->

::

### With Chevron & Icon

::ShowCase

:DocsAccordionWithChevronIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionWithChevronIcon.vue" code lang="vue" -->

```vue [DocsAccordionWithChevronIcon.vue]
<script lang="ts" setup>
  const items = [
    {
      id: "1",
      icon: "lucide:command",
      value: "1",
      title: "What makes UI Thing different?",
      content:
        "UI Thing focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
    },
    {
      id: "2",
      icon: "lucide:eclipse",
      value: "2",
      title: "How can I customize the components?",
      content:
        "Use our CSS variables for global styling, or class and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
    },
    {
      id: "3",
      icon: "lucide:zap",
      value: "3",
      title: "Is UI Thing optimized for performance?",
      content:
        "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
    },
    {
      id: "4",
      icon: "lucide:at-sign",
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
      <template #trigger="{ item }">
        <UiAccordionTrigger class="text-[15px] leading-6 hover:no-underline">
          <div class="flex items-center gap-3">
            <Icon :name="item.icon!" class="shrink-0 opacity-60" />
            {{ item.title }}
          </div>
        </UiAccordionTrigger>
      </template>
      <template #content="{ item }">
        <UiAccordionContent class="ps-7 text-muted-foreground">{{
          item.content
        }}</UiAccordionContent>
      </template>
    </UiAccordion>
  </div>
</template>
```

<!-- /automd -->

::

### With Sub-Header & Chevron

::ShowCase

:DocsAccordionWithChevronSubHeader

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionWithChevronSubHeader.vue" code lang="vue" -->

```vue [DocsAccordionWithChevronSubHeader.vue]
<script lang="ts" setup>
  const items = [
    {
      id: "1",
      value: "1",
      title: "Connected accounts",
      sub: "Manage your linked social and work accounts",
      content:
        "Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.",
    },
    {
      id: "2",
      value: "2",
      title: "Notifications",
      sub: "Customize your notification preferences",
      content:
        "Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.",
    },
    {
      id: "3",
      value: "3",
      title: "2-step verification",
      sub: "Add an extra layer of security to your account",
      content:
        "Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.",
    },
    {
      id: "4",
      value: "4",
      title: "Contact support",
      sub: "We're here to help 24/7",
      content:
        "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
    },
  ];
</script>

<template>
  <div class="mx-auto max-w-lg">
    <UiAccordion :items type="single" collapsible class="w-full" default-value="3">
      <template #trigger="{ item }">
        <UiAccordionTrigger class="text-[15px] leading-6 hover:no-underline">
          <div class="flex flex-col items-start space-y-1">
            {{ item.title }}
            <span v-if="item.sub" class="text-sm font-normal">{{ item.sub }}</span>
          </div>
        </UiAccordionTrigger>
      </template>
      <template #content="{ item }">
        <UiAccordionContent class="text-muted-foreground">{{ item.content }}</UiAccordionContent>
      </template>
    </UiAccordion>
  </div>
</template>
```

<!-- /automd -->

::

### With Icon, Sub-Header & Chevron

::ShowCase

:DocsAccordionWithChevronSubHeaderIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionWithChevronSubHeaderIcon.vue" code lang="vue" -->

```vue [DocsAccordionWithChevronSubHeaderIcon.vue]
<script lang="ts" setup>
  const items = [
    {
      id: "1",
      icon: "lucide:link-2",
      value: "1",
      title: "Connected accounts",
      sub: "Manage your linked social and work accounts",
      content:
        "Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.",
    },
    {
      id: "2",
      icon: "lucide:bell",
      value: "2",
      title: "Notifications",
      sub: "Customize your notification preferences",
      content:
        "Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.",
    },
    {
      id: "3",
      icon: "lucide:shield-check",
      value: "3",
      title: "2-step verification",
      sub: "Add an extra layer of security to your account",
      content:
        "Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.",
    },
    {
      id: "4",
      icon: "lucide:life-buoy",
      value: "4",
      title: "Contact support",
      sub: "We're here to help 24/7",
      content:
        "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
    },
  ];
</script>

<template>
  <div class="mx-auto max-w-lg">
    <UiAccordion :items type="single" collapsible class="w-full" default-value="3">
      <template #trigger="{ item }">
        <UiAccordionTrigger class="text-[15px] leading-6 hover:no-underline">
          <div class="flex items-center gap-3">
            <UiFancyIcon size="md" circle :icon="item.icon" />
            <div class="flex flex-col items-start space-y-1">
              {{ item.title }}
              <span v-if="item.sub" class="text-sm font-normal">{{ item.sub }}</span>
            </div>
          </div>
        </UiAccordionTrigger>
      </template>
      <template #content="{ item }">
        <UiAccordionContent class="ps-12 text-muted-foreground">{{
          item.content
        }}</UiAccordionContent>
      </template>
    </UiAccordion>
  </div>
</template>
```

<!-- /automd -->

::

### Tabs with Chevron

::ShowCase

:DocsAccordionTabsWithChevron

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionTabsWithChevron.vue" code lang="vue" -->

```vue [DocsAccordionTabsWithChevron.vue]
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
    <UiAccordion :items type="single" collapsible class="w-full space-y-2" default-value="3">
      <UiAccordionItem
        v-for="item in items"
        :key="item.id"
        :value="item.value"
        class="rounded-lg border bg-background px-4 py-1"
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
```

<!-- /automd -->

::

### Tabs with Left Chevron

::ShowCase

:DocsAccordionTabsWithChevronLeft

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionTabsWithChevronLeft.vue" code lang="vue" -->

```vue [DocsAccordionTabsWithChevronLeft.vue]
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
    <UiAccordion :items type="single" collapsible class="w-full space-y-2" default-value="3">
      <UiAccordionItem
        v-for="item in items"
        :key="item.id"
        :value="item.value"
        class="rounded-lg border bg-background px-4"
      >
        <UiAccordionTrigger
          :icon="''"
          class="justify-start gap-3 text-[15px] leading-6 hover:no-underline"
        >
          <Icon mode="svg" class="transition" name="lucide:chevron-down" />
          {{ item.title }}
        </UiAccordionTrigger>
        <UiAccordionContent class="text-muted-foreground">
          {{ item.content }}
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>
  </div>
</template>
```

<!-- /automd -->

::

### Table with Chevron

::ShowCase

:DocsAccordionTableWithChevron

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionTableWithChevron.vue" code lang="vue" -->

```vue [DocsAccordionTableWithChevron.vue]
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
```

<!-- /automd -->

::

### Table with Left Chevron

::ShowCase

:DocsAccordionTableWithChevronLeft

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionTableWithChevronLeft.vue" code lang="vue" -->

```vue [DocsAccordionTableWithChevronLeft.vue]
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
        <UiAccordionTrigger
          :icon="''"
          class="justify-start gap-3 text-[15px] leading-6 hover:no-underline"
        >
          <Icon mode="svg" class="transition" name="lucide:chevron-down" />
          {{ item.title }}
        </UiAccordionTrigger>
        <UiAccordionContent class="text-muted-foreground">
          {{ item.content }}
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>
  </div>
</template>
```

<!-- /automd -->

::

### Multi-Level

::ShowCase

:DocsAccordionMultiLevel

#code

<!-- automd:file src="../../app/components/content/Docs/Accordion/DocsAccordionMultiLevel.vue" code lang="vue" -->

```vue [DocsAccordionMultiLevel.vue]
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
```

<!-- /automd -->

::
