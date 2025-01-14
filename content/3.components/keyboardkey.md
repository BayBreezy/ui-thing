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

::ShowCase

:DocsKbd

#code

<!-- automd:file src="../../app/components/content/Docs/Kbd/DocsKbd.vue" code lang="vue" -->

```vue [DocsKbd.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="flex flex-wrap items-center gap-3">
      <UiKbd size="xs">Ctrl+K</UiKbd>
      <UiKbd>Ctrl+K</UiKbd>
      <UiKbd size="md">Ctrl+K</UiKbd>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
