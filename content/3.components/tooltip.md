---
title: Tooltip
description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/tooltip.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/tooltip.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Tooltip"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add tooltip
```

## Usage

### Basic example

::ShowCase

:DocsTooltip

#code

<!-- automd:file src="../../app/components/content/Docs/Tooltip/DocsTooltip.vue" code lang="vue" -->

```vue [DocsTooltip.vue]
<template>
  <div class="flex w-full justify-center">
    <UiTooltip disable-closing-trigger>
      <template #trigger>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline">Hover me</UiButton>
        </UiTooltipTrigger>
      </template>
      <template #content>
        <UiTooltipContent>
          <p>Add to library</p>
        </UiTooltipContent>
      </template>
    </UiTooltip>
  </div>
</template>
```

<!-- /automd -->

::
