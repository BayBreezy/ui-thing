---
title: Loader
description: A loader indicates an unknown wait time or process duration, keeping users informed and enhancing their experience by providing visual feedback during delays.
label: New
---

## Source code

Click :SourceCodeLink{component="Loader.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add loader
```

## Usage

### Basic

::ShowCase

:DocsLoaderBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Loader/DocsLoaderBasic.vue" code lang="vue" -->

```vue [DocsLoaderBasic.vue]
<template>
  <div>
    <UiLoader />
  </div>
</template>
```

<!-- /automd -->

::

### Variants

So you can use any of the loaders located on the [Iconify Website](https://icones.js.org/collection/svg-spinners). Simply copy the name of the loader and paste it into the `icon` prop.

::ShowCase

:DocsLoaderVariants

#code

<!-- automd:file src="../../app/components/content/Docs/Loader/DocsLoaderVariants.vue" code lang="vue" -->

```vue [DocsLoaderVariants.vue]
<template>
  <div class="flex justify-center gap-3">
    <UiLoader v-for="variant in variants" :key="variant" :icon="variant" />
  </div>
</template>

<script lang="ts" setup>
  const variants = [
    "svg-spinners:dot-revolve",
    "svg-spinners:gooey-balls-2",
    "svg-spinners:bars-scale-fade",
    "svg-spinners:270-ring-with-bg",
  ];
</script>
```

<!-- /automd -->

::

### Sizes

You can adjust the size of the loader by passing a CSS class to the `class` prop.

::ShowCase

:DocsLoaderSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Loader/DocsLoaderSizes.vue" code lang="vue" -->

```vue [DocsLoaderSizes.vue]
<template>
  <div class="flex justify-center gap-3">
    <UiLoader class="size-5" />
    <UiLoader class="size-8" />
    <UiLoader class="size-10" />
    <UiLoader class="size-12" />
  </div>
</template>
```

<!-- /automd -->

::

### Colors

You can adjust the color of the loader by passing a CSS class to the `class` prop.

::ShowCase

:DocsLoaderColors

#code

<!-- automd:file src="../../app/components/content/Docs/Loader/DocsLoaderColors.vue" code lang="vue" -->

```vue [DocsLoaderColors.vue]
<template>
  <div class="flex justify-center gap-3">
    <UiLoader v-for="color in colors" :key="color" :class="[color, 'size-6']" />
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    "text-primary",
    "text-destructive",
    "text-emerald-500",
    "text-rose-500",
    "text-sky-500",
    "text-violet-500",
    "text-amber-500",
  ];
</script>
```

<!-- /automd -->

::

### Full Page Loader

The loader can operate as a full page loader by passing the `full-page` prop.

When the `full-page` prop is passed, the loader will take up the entire screen.

It can be closed manually or by pressing the `esc` key.

::ShowCase

:DocsLoaderBackdrop

#code

<!-- automd:file src="../../app/components/content/Docs/Loader/DocsLoaderBackdrop.vue" code lang="vue" -->

```vue [DocsLoaderBackdrop.vue]
<template>
  <div class="flex flex-col items-center gap-5">
    <UiLoader v-model="showLockedLoader" lock-scroll full-page class="size-14">
      <div class="flex flex-col items-center justify-center gap-3">
        <p>Loading... Press <UiKbd variant="outline">esc</UiKbd> to close</p>
        <UiButton size="sm" variant="outline" @click="showLockedLoader = false">
          Close Loader
        </UiButton>
      </div>
    </UiLoader>
    <UiButton variant="outline" @click="showLockedLoader = !showLockedLoader">
      Display Loader
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const showLockedLoader = ref(false);
</script>
```

<!-- /automd -->

::
