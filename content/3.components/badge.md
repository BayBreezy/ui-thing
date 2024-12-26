---
title: Badge
description: A badge is a component that is used to highlight an item's status for quick recognition.
---

## Source code

Click :SourceCodeLink{component="Badge.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add badge
```

## Variants

### Default

::ShowCase

:DocsBadgeDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeDefault.vue" code lang="vue" -->

```vue [DocsBadgeDefault.vue]
<template>
  <div class="text-center">
    <UiBadge>Default</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Destructive

::ShowCase

:DocsBadgeDestructive

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeDestructive.vue" code lang="vue" -->

```vue [DocsBadgeDestructive.vue]
<template>
  <div class="text-center">
    <UiBadge variant="destructive">Destructive</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Outline

::ShowCase

:DocsBadgeOutline

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeOutline.vue" code lang="vue" -->

```vue [DocsBadgeOutline.vue]
<template>
  <div class="text-center">
    <UiBadge variant="outline">Outline</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Secondary

::ShowCase

:DocsBadgeSecondary

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeSecondary.vue" code lang="vue" -->

```vue [DocsBadgeSecondary.vue]
<template>
  <div class="text-center">
    <UiBadge variant="secondary">Secondary</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

## Sizes

Three sizes are available for badges: `sm`, `md`, and `lg`.

::ShowCase

:DocsBadgeSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeSizes.vue" code lang="vue" -->

```vue [DocsBadgeSizes.vue]
<template>
  <div class="flex items-center justify-center gap-2">
    <UiBadge v-for="s in sizes" :key="s" :size="s" variant="secondary">Label</UiBadge>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md", "lg"] as const;
</script>
```

<!-- /automd -->

::
