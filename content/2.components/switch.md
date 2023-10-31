---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/switch.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/switch.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Switch"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add switch
```

## Usage

### Basic example

::ShowCase{component="DocsSwitch"}

#code

```vue [DocsSwitch.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="flex items-center space-x-2">
      <UISwitch id="airplane-mode" />
      <UILabel for="airplane-mode">Airplane Mode</UILabel>
    </div>
  </div>
</template>
```

::
