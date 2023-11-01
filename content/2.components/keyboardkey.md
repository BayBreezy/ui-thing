---
title: Keyboard Key
description: The <kbd> HTML element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device.
---

## Source code

Click :SourceCodeLink{component="Kbd.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add kbd
```

## Usage

### Basic example

::ShowCase{component="DocsKbd"}

#code

```vue [DocsKbd.vue]
<template>
  <div class="flex w-full justify-center">
    <UITooltip disable-closing-trigger>
      <template #trigger>
        <UITooltipTrigger as-child>
          <UIButton variant="outline">Hover me</UIButton>
        </UITooltipTrigger>
      </template>
      <template #content>
        <UITooltipContent>
          <p>Add to library</p>
        </UITooltipContent>
      </template>
    </UITooltip>
  </div>
</template>
```

::
