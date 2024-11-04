---
title: Button
description: A button is a component that is used to trigger an action.
label: Updated
---

## Source code

Click :SourceCodeLink{component="Button.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add button
```

## Plain Buttons

Here we have a few examples of the plain buttons.

### Default Button

::ShowCase{component="DocsButtonDefault"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonDefault.vue" code lang="vue" -->

```vue [DocsButtonDefault.vue]
<template>
  <div class="text-center">
    <UiButton>Default</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Secondary Button

::ShowCase{component="DocsButtonSecondary"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonSecondary.vue" code lang="vue" -->

```vue [DocsButtonSecondary.vue]
<template>
  <div class="text-center">
    <UiButton variant="secondary">Secondary</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### With Icon

::ShowCase{component="DocsButtonWithIcon"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonWithIcon.vue" code lang="vue" -->

```vue [DocsButtonWithIcon.vue]
<template>
  <div class="text-center">
    <UiButton><Icon class="size-4" name="lucide:mail" /> Login with Email</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Loading

::ShowCase{component="DocsButtonLoading"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonLoading.vue" code lang="vue" -->

```vue [DocsButtonLoading.vue]
<template>
  <div class="text-center">
    <UiButton loading
      ><Icon class="size-4 animate-spin" name="lucide:loader-2" /> Please wait...</UiButton
    >
  </div>
</template>
```

<!-- /automd -->

::

### Outline

::ShowCase{component="DocsButtonOutline"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonOutline.vue" code lang="vue" -->

```vue [DocsButtonOutline.vue]
<template>
  <div class="text-center">
    <UiButton variant="outline">Outline</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Destructive

::ShowCase{component="DocsButtonDestructive"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonDestructive.vue" code lang="vue" -->

```vue [DocsButtonDestructive.vue]
<template>
  <div class="text-center">
    <UiButton variant="destructive">Destructive</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Ghost

::ShowCase{component="DocsButtonGhost"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonGhost.vue" code lang="vue" -->

```vue [DocsButtonGhost.vue]
<template>
  <div class="text-center">
    <UiButton variant="ghost"><Icon name="lucide:ghost" class="size-4" />Ghost</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Link

::ShowCase{component="DocsButtonLink"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonLink.vue" code lang="vue" -->

```vue [DocsButtonLink.vue]
<template>
  <div class="text-center">
    <UiButton variant="link">Visit Page</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Icon

::ShowCase{component="DocsButtonIconOnly"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonIconOnly.vue" code lang="vue" -->

```vue [DocsButtonIconOnly.vue]
<template>
  <div class="text-center">
    <UiButton size="icon" variant="outline">
      <Icon class="size-4" name="lucide:activity" />
    </UiButton>
  </div>
</template>
```

<!-- /automd -->

::

## Sizes

Here are the different sizes that are available for the buttons.

### Regular Button Sizes

::ShowCase{component="DocsButtonSizes"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonSizes.vue" code lang="vue" -->

```vue [DocsButtonSizes.vue]
<template>
  <div class="flex items-center justify-center gap-2">
    <UiButton v-for="s in sizes" :key="s" :size="s" variant="outline" class="capitalize"
      >Size {{ s }}</UiButton
    >
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["xs", "sm", "default", "lg"] as const;
</script>
```

<!-- /automd -->

::

### Icon Button Sizes

::ShowCase{component="DocsButtonIconSizes"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonIconSizes.vue" code lang="vue" -->

```vue [DocsButtonIconSizes.vue]
<template>
  <div class="flex items-center justify-center gap-3">
    <UiButton v-for="s in sizes" :key="s" :size="s" variant="outline">
      <Icon name="lucide:activity" class="size-4" />
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["icon-xs", "icon-sm", "icon"] as const;
</script>
```

<!-- /automd -->

::

## Enhanced Buttons

These are some buttons that I found today over here [Enhanced Buttons](https://enhanced-button.vercel.app/). I think they are cool.

### Expand Icon - Right

::ShowCase{component="DocsButtonExpandIconRight"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonExpandIconRight.vue" code lang="vue" -->

```vue [DocsButtonExpandIconRight.vue]
<template>
  <div class="text-center">
    <UiButton variant="expandIcon" icon-placement="right" icon="lucide:arrow-right"
      >Right Icon</UiButton
    >
  </div>
</template>
```

<!-- /automd -->

::

### Expand Icon - Left

::ShowCase{component="DocsButtonExpandIconLeft"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonExpandIconLeft.vue" code lang="vue" -->

```vue [DocsButtonExpandIconLeft.vue]
<template>
  <div class="text-center">
    <UiButton variant="expandIcon" icon-placement="left" icon="lucide:arrow-left"
      >Left Icon</UiButton
    >
  </div>
</template>
```

<!-- /automd -->

::

### Gooey - Left

::ShowCase{component="DocsButtonGooeyLeft"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonGooeyLeft.vue" code lang="vue" -->

```vue [DocsButtonGooeyLeft.vue]
<template>
  <div class="text-center">
    <UiButton variant="gooeyLeft">Gooey Left</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Gooey - Right

::ShowCase{component="DocsButtonGooeyRight"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonGooeyRight.vue" code lang="vue" -->

```vue [DocsButtonGooeyRight.vue]
<template>
  <div class="text-center">
    <UiButton variant="gooeyRight">Gooey Right</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Shine

::ShowCase{component="DocsButtonShine"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonShine.vue" code lang="vue" -->

```vue [DocsButtonShine.vue]
<template>
  <div class="text-center">
    <UiButton variant="shine">Shining ✨</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Ring Hover

::ShowCase{component="DocsButtonRingHover"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonRingHover.vue" code lang="vue" -->

```vue [DocsButtonRingHover.vue]
<template>
  <div class="text-center">
    <UiButton variant="ringHover">Ring Hover</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Link Hover 1

::ShowCase{component="DocsButtonLinkHover1"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonLinkHover1.vue" code lang="vue" -->

```vue [DocsButtonLinkHover1.vue]
<template>
  <div class="text-center">
    <UiButton variant="linkHover1">Link Hover 1</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Link Hover 2

::ShowCase{component="DocsButtonLinkHover2"}

#code

<!-- automd:file src="../../components/content/Docs/Button/DocsButtonLinkHover2.vue" code lang="vue" -->

```vue [DocsButtonLinkHover2.vue]
<template>
  <div class="text-center">
    <UiButton variant="linkHover2">Link Hover 2</UiButton>
  </div>
</template>
```

<!-- /automd -->

::
