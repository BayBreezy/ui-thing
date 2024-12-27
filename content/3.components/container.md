---
title: Container
description: A container to wrap content in. It has a max-width and is centered by default.
---

## Source code

Click :SourceCodeLink{component="Container.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add container
```

## Usage

### Basic

::ShowCase

:DocsContainer

#code

<!-- automd:file src="../../app/components/content/Docs/DocsContainer.vue" code lang="vue" -->

```vue [DocsContainer.vue]
<template>
  <div>
    <UiContainer>
      <div class="h-[200px] w-full rounded-lg bg-muted shadow" />
    </UiContainer>
  </div>
</template>
```

<!-- /automd -->

::
