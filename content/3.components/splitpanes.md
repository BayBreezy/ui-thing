---
title: Splitpanes
description: Splitpanes are a way to divide the screen into two or more panes that can be resized by dragging the divider between them.
links:
  - title: Splitpanes Docs
    href: https://antoniandre.github.io/splitpanes/
---

## Source code

Click :SourceCodeLink{component="Splitpanes"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add splitpanes
```

## The Handles

To display the handles, you can use the `withHandle` prop. This will display a handle between each pane that can be used to resize the panes.

## Usage

We can use the different parts to construct a splitpanes component. The `UiSplitpanes` component is the main container for the splitpanes. It can have one or more `UiSplitpanesPane` components as children. The `UiSplitpanesPane` component is the pane that can be resized. It can have one or more `UiSplitpanes` components as children.

::ShowCase{component="DocsSplitpanesBasic"}

#code

```vue [DocsSplitpanesBasic.vue]
<template>
  <div class="flex items-center justify-center">
    <UiSplitpanes withHandle style="height: 350px" class="max-w-md rounded-lg border">
      <UiSplitpanesPane :min-size="10">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </UiSplitpanesPane>
      <UiSplitpanesPane minSize="30">
        <UiSplitpanes horizontal>
          <UiSplitpanesPane minSize="10px" v-for="p in ['Two', 'Three', 'Four']" :key="p">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">{{ p }}</span>
            </div>
          </UiSplitpanesPane>
        </UiSplitpanes>
      </UiSplitpanesPane>
      <UiSplitpanesPane>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Five</span>
        </div>
      </UiSplitpanesPane>
    </UiSplitpanes>
  </div>
</template>
```

::
