---
title: Collapsible
description: An interactive component which expands/collapses a panel.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/collapsible.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/collapsible.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Collapsible"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add collapsible"}

## Usage

::prose-show-case

:DocsCollapsible

#code

<!-- automd:file src="../../app/components/content/Docs/DocsCollapsible.vue" code lang="vue" -->

```vue [DocsCollapsible.vue]
<template>
  <div class="flex items-center justify-center">
    <UiCollapsible v-slot="{ open }" class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-2">
        <div class="flex items-center gap-3">
          <UiAvatar src="https://behonbaker.com/icon.png" class="ring-muted/50 ring" />
          <h4 class="text-sm font-semibold">BayBreezy starred 3 repositories</h4>
        </div>
        <UiCollapsibleTrigger as-child>
          <UiButton variant="ghost" size="icon-sm">
            <Icon
              name="lucide:chevron-down"
              class="size-4 transform duration-300"
              :class="[open && 'rotate-180']"
            />
            <span class="sr-only">View starred repositories</span>
          </UiButton>
        </UiCollapsibleTrigger>
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm font-semibold">nuxt/nuxt</div>
      <UiCollapsibleContent class="space-y-2">
        <div class="rounded-md border px-4 py-3 font-mono text-sm font-semibold">
          BayBreezy/ui-thing
        </div>
        <div class="rounded-md border px-4 py-3 font-mono text-sm font-semibold">unjs/c12</div>
      </UiCollapsibleContent>
    </UiCollapsible>
  </div>
</template>
```

<!-- /automd -->

::
