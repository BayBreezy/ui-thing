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

::ShowCase

:DocsAspectRatio

#code

<!-- automd:file src="../../app/components/content/Docs/AspectRatio/DocsAspectRatio.vue" code lang="vue" -->

```vue [DocsAspectRatio.vue]
<template>
  <div>
    <UiAspectRatio :ratio="16 / 9">
      <UiContextMenu>
        <UiContextMenuTrigger as-child>
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            src="https://cdn.pixabay.com/photo/2023/05/02/21/08/river-7966163_1280.png"
            alt="Snow Lake"
            class="h-full w-full rounded-md object-cover"
          />
        </UiContextMenuTrigger>
        <UiContextMenuContent class="w-[150px]">
          <UiContextMenuGroup>
            <UiContextMenuItem @select="showMessage('Now sharing...')">Share</UiContextMenuItem>
            <UiContextMenuItem @select="showMessage('Moving image...')">Move</UiContextMenuItem>
            <UiContextMenuItem @select="showMessage('Please hold as we rename the image...')"
              >Rename</UiContextMenuItem
            >
          </UiContextMenuGroup>
          <UiContextMenuSeparator />
          <UiContextMenuGroup>
            <UiContextMenuItem @select="showMessage('Deleting the image...')"
              >Delete</UiContextMenuItem
            >
          </UiContextMenuGroup>
        </UiContextMenuContent>
      </UiContextMenu>
    </UiAspectRatio>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (message: string) => {
    useSonner(message);
  };
</script>
```

<!-- /automd -->

::
