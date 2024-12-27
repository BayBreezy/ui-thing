---
title: Separator
description: Visually or semantically separates content.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/separator.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/separator.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Separator.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add separator
```

## Usage

### Basic example

::ShowCase

:DocsSeparator

#code

<!-- automd:file src="../../app/components/content/Docs/Separator/DocsSeparator.vue" code lang="vue" -->

```vue [DocsSeparator.vue]
<template>
  <div>
    <div class="space-y-1">
      <h4 class="text-sm font-semibold leading-none">UI Thing</h4>
      <p class="text-sm text-muted-foreground">An open-source UI component library for Nuxt.</p>
    </div>
    <UiSeparator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div class="transition-colors hover:text-primary">Documentation</div>
      <UiSeparator orientation="vertical" />
      <div class="transition-colors hover:text-primary">Components</div>
      <UiSeparator orientation="vertical" />
      <div class="transition-colors hover:text-primary">Examples</div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
