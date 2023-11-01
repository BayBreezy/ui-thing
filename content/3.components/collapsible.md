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

You also need to add the animations to your `tailwind.config.js` file:

```js
keyframes: {
  "collapse-down": {
    from: { height: "0px" },
    to: { height: "var(--radix-collapsible-content-height)" },
  },
  "collapse-up": {
    from: { height: "var(--radix-collapsible-content-height)" },
    to: { height: "0px" },
  },
},
animation: {
  "collapse-down": "collapse-down 0.2s ease-out",
  "collapse-up": "collapse-up 0.2s ease-out",
},
```

## Usage

::ShowCase{component="DocsCollapsible"}

#code

```vue [DocsCollapsible.vue]
<template>
  <div class="flex items-center justify-center">
    <UICollapsible class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-2">
        <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <UICollapsibleTrigger asChild>
          <UIButton variant="ghost" size="sm" class="w-9 p-0">
            <Icon name="lucide:chevrons-up-down" class="h-4 w-4" />
            <span class="sr-only">Toggle</span>
          </UIButton>
        </UICollapsibleTrigger>
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
      <UICollapsibleContent class="space-y-2">
        <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
        <div class="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
      </UICollapsibleContent>
    </UICollapsible>
  </div>
</template>
```

::
