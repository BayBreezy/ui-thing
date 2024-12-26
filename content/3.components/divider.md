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

```vue [DocsDivider.vue]
<template>
  <div class="flex w-full items-center">
    <UiDivider />
  </div>
</template>
```

::

### Label

::ShowCase

:DocsDividerLabel

#code

```vue [DocsDividerLabel.vue]
<template>
  <div class="flex w-full items-center">
    <UiDivider label="OR" />
  </div>
</template>
```

::

### Icon

::ShowCase

:DocsDividerIcon

#code

```vue [DocsDividerIcon.vue]
<template>
  <div class="flex w-full items-center">
    <UiDivider icon="lucide:activity" />
  </div>
</template>
```

::

### Avatar

::ShowCase

:DocsDividerAvatar

#code

```vue [DocsDividerAvatar.vue]
<template>
  <div class="flex w-full items-center">
    <UiDivider avatar="https://behonbaker.com/icon.png" />
  </div>
</template>
```

::

### Vertical

::ShowCase

:DocsDividerVertical

#code

```vue [DocsDividerVertical.vue]
<template>
  <div class="flex h-[200px] w-full items-center">
    <UiDivider orientation="vertical" avatar="https://behonbaker.com/icon.png" />
  </div>
</template>
```

::
