---
title: Collapsible
description: An interactive component which expands/collapses a panel.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/collapsible.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/collapsible.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Collapsible"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add collapsible
```

## Usage

::ShowCase

:DocsCollapsible

#code

<!-- automd:file src="../../app/components/content/Docs/DocsCollapsible.vue" code lang="vue" -->

```vue [DocsCollapsible.vue]
<template>
  <div class="flex items-center justify-center">
    <UiCollapsible class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-2">
        <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <UiCollapsibleTrigger as-child>
          <UiButton variant="ghost" size="sm" class="w-9 p-0">
            <Icon name="lucide:chevrons-up-down" class="h-4 w-4" />
            <span class="sr-only">Toggle</span>
          </UiButton>
        </UiCollapsibleTrigger>
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
      <UiCollapsibleContent class="space-y-2">
        <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
        <div class="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
      </UiCollapsibleContent>
    </UiCollapsible>
  </div>
</template>
```

<!-- /automd -->

::
