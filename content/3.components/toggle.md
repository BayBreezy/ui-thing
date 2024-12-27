---
title: Toggle
description: A two-state button that can be either on or off.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/toggle.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/toggle.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Toggle.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add toggle
```

## Usage

### Basic example

::ShowCase

:DocsToggle

#code

<!-- automd:file src="../../app/components/content/Docs/Toggle/DocsToggle.vue" code lang="vue" -->

```vue [DocsToggle.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiToggle aria-label="Toggle italic">
      <Icon name="lucide:bold" class="h-4 w-4" />
    </UiToggle>
  </div>
</template>
```

<!-- /automd -->

::
