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

Right click the image to perform different actions.

::ShowCase{component="DocsAspectRatio"}

#code

```vue [DocsAspectRatio.vue]
<template>
  <div>
    <UIAspectRatio :ratio="16 / 9">
      <UIContextMenu>
        <UIContextMenuTrigger asChild>
          <img
            src="https://cdn.pixabay.com/photo/2023/05/02/21/08/river-7966163_1280.png"
            alt="Snow Lake"
            class="h-full w-full rounded-md object-cover"
          />
        </UIContextMenuTrigger>
        <UIContextMenuContent class="w-[150px]">
          <UIContextMenuGroup>
            <UIContextMenuItem @select="showMessage('Now sharing...')">Share</UIContextMenuItem>
            <UIContextMenuItem @select="showMessage('Moving image...')">Move</UIContextMenuItem>
            <UIContextMenuItem @select="showMessage('Please hold as we rename the image...')"
              >Rename</UIContextMenuItem
            >
          </UIContextMenuGroup>
          <UIContextMenuSeparator />
          <UIContextMenuGroup>
            <UIContextMenuItem @select="showMessage('Deleting the image...')"
              >Delete</UIContextMenuItem
            >
          </UIContextMenuGroup>
        </UIContextMenuContent>
      </UIContextMenu>
    </UIAspectRatio>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (message: string) => {
    useSonner(message);
  };
</script>
```

::
