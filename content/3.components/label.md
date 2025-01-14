---
title: Label
description: Renders an accessible label associated with controls.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/label.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/label.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Label.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add label
```

## Usage

### Input

::ShowCase

:DocsInputLabel

#code

<!-- automd:file src="../../app/components/content/Docs/Input/DocsInputLabel.vue" code lang="vue" -->

```vue [DocsInputLabel.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div>
      <UiLabel for="picture">Picture</UiLabel>
      <UiInput id="picture" type="file" />
    </div>
  </div>
</template>
```

<!-- /automd -->

::
