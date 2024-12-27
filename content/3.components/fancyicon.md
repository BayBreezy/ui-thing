---
title: Fancy Icon
description: An icon with a nice background color.
---

## Source code

Click :SourceCodeLink{component="FancyIcon"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add fancy-icon
```

## Usage

### Basic

::ShowCase

:DocsFancyIcon

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIcon.vue" code lang="vue" -->

```vue [DocsFancyIcon.vue]
<template>
  <div class="flex items-center justify-center">
    <UiFancyIcon icon="lucide:mail" />
  </div>
</template>
```

<!-- /automd -->

::

### Colors

For the colors to show, you have to change the type from `modern`.
::ShowCase

:DocsFancyIconColor

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconColor.vue" code lang="vue" -->

```vue [DocsFancyIconColor.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-5">
    <UiFancyIcon type="dark" color="primary" icon="lucide:mail" />
    <UiFancyIcon type="dark" color="success" icon="lucide:mail" />
    <UiFancyIcon type="dark" color="error" icon="lucide:mail" />
    <UiFancyIcon type="dark" color="warning" icon="lucide:mail" />
    <UiFancyIcon type="dark" color="info" icon="lucide:mail" />
  </div>
</template>
```

<!-- /automd -->

::

### Types

::ShowCase

:DocsFancyIconType

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconType.vue" code lang="vue" -->

```vue [DocsFancyIconType.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-5">
    <UiFancyIcon type="light" icon="lucide:mail" />
    <UiFancyIcon type="dark" color="success" icon="lucide:mail" />
    <UiFancyIcon type="modern" color="error" icon="lucide:mail" />
  </div>
</template>
```

<!-- /automd -->

::

### Sizes

::ShowCase

:DocsFancyIconSize

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconSize.vue" code lang="vue" -->

```vue [DocsFancyIconSize.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-5">
    <UiFancyIcon
      v-for="s in sizes"
      :key="s"
      :size="s"
      type="dark"
      color="primary"
      icon="lucide:mail"
    />
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md", "lg", "xl"] as const;
</script>
```

<!-- /automd -->

::

### Circle prop

::ShowCase

:DocsFancyIconCircle

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconCircle.vue" code lang="vue" -->

```vue [DocsFancyIconCircle.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-5">
    <UiFancyIcon circle icon="lucide:mail" />
  </div>
</template>
```

<!-- /automd -->

::
