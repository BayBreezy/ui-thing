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

::ShowCase{component="DocsSeparator"}

#code

```vue [DocsSeparator.vue]
<template>
  <div>
    <div class="space-y-1">
      <h4 class="text-sm font-medium leading-none">Radix Vue</h4>
      <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
    </div>
    <UISeparator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <UISeparator orientation="vertical" />
      <div>Docs</div>
      <UISeparator orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
</template>
```

::
