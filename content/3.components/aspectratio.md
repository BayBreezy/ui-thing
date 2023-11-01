---
title: Aspect Ratio
description: Displays content within a desired ratio.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/aspect-ratio.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/aspect-ratio.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="AspectRatio"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add aspect-ratio
```

## Usage

::ShowCase{component="DocsAspectRatio"}

#code

```vue [DocsAspectRatio.vue]
<template>
  <div>
    <UIAspectRatio :ratio="16 / 9">
      <img
        src="https://cdn.pixabay.com/photo/2023/05/02/21/08/river-7966163_1280.png"
        alt="Snow Lake"
        class="h-full w-full rounded-md object-cover"
      />
    </UIAspectRatio>
  </div>
</template>
```

::
