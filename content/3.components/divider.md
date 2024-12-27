---
title: Divider
description: A horizontal line to separate content. Similiar to the Seperator component, but with items in the middle.
---

## Source code

Click :SourceCodeLink{component="Divider.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add divider
```

## Usage

### Basic

::ShowCase

:DocsDivider

#code

<!-- automd:file src="../../app/components/content/Docs/Divider/DocsDivider.vue" code lang="vue" -->

```vue [DocsDivider.vue]
<template>
  <div class="flex w-full items-center">
    <UiDivider />
  </div>
</template>
```

<!-- /automd -->

::

### Label

::ShowCase

:DocsDividerLabel

#code

<!-- automd:file src="../../app/components/content/Docs/Divider/DocsDividerLabel.vue" code lang="vue" -->

```vue [DocsDividerLabel.vue]
<template>
  <div class="flex w-full items-center">
    <UiDivider label="OR" />
  </div>
</template>
```

<!-- /automd -->

::

### Icon

::ShowCase

:DocsDividerIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Divider/DocsDividerIcon.vue" code lang="vue" -->

```vue [DocsDividerIcon.vue]
<template>
  <div class="flex w-full items-center">
    <UiDivider icon="lucide:activity" />
  </div>
</template>
```

<!-- /automd -->

::

### Avatar

::ShowCase

:DocsDividerAvatar

#code

<!-- automd:file src="../../app/components/content/Docs/Divider/DocsDividerAvatar.vue" code lang="vue" -->

```vue [DocsDividerAvatar.vue]
<template>
  <div class="flex w-full items-center">
    <UiDivider avatar="https://behonbaker.com/icon.png" />
  </div>
</template>
```

<!-- /automd -->

::

### Vertical

::ShowCase

:DocsDividerVertical

#code

<!-- automd:file src="../../app/components/content/Docs/Divider/DocsDividerVertical.vue" code lang="vue" -->

```vue [DocsDividerVertical.vue]
<template>
  <div class="flex h-[200px] w-full items-center">
    <UiDivider orientation="vertical" avatar="https://behonbaker.com/icon.png" />
  </div>
</template>
```

<!-- /automd -->

::
