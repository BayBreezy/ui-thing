---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/toggle-group.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/toggle-group.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="ToggleGroup"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add toggle-group
```

## Usage

### Basic

::ShowCase

:DocsToggleGroupBasic

#code

<!-- automd:file src="../../app/components/content/Docs/ToggleGroup/DocsToggleGroupBasic.vue" code lang="vue" -->

```vue [DocsToggleGroupBasic.vue]
<template>
  <div>
    <UiToggleGroup>
      <UiToggleGroupItem value="bold" icon="lucide:bold" />
      <UiToggleGroupItem value="italic" icon="lucide:italic" />
      <UiToggleGroupItem value="underline" icon="lucide:underline" />
    </UiToggleGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Outline

::ShowCase

:DocsToggleGroupOutline

#code

<!-- automd:file src="../../app/components/content/Docs/ToggleGroup/DocsToggleGroupOutline.vue" code lang="vue" -->

```vue [DocsToggleGroupOutline.vue]
<template>
  <div>
    <UiToggleGroup>
      <UiToggleGroupItem variant="outline" value="bold" icon="lucide:bold" />
      <UiToggleGroupItem variant="outline" value="italic" icon="lucide:italic" />
      <UiToggleGroupItem variant="outline" value="underline" icon="lucide:underline" />
    </UiToggleGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Multiple

::ShowCase

:DocsToggleGroupMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/ToggleGroup/DocsToggleGroupMultiple.vue" code lang="vue" -->

```vue [DocsToggleGroupMultiple.vue]
<template>
  <div>
    <UiToggleGroup type="multiple">
      <UiToggleGroupItem value="bold" icon="lucide:bold" />
      <UiToggleGroupItem value="italic" icon="lucide:italic" />
      <UiToggleGroupItem value="underline" icon="lucide:underline" />
    </UiToggleGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Sizes

::ShowCase

:DocsToggleGroupSize

#code

<!-- automd:file src="../../app/components/content/Docs/ToggleGroup/DocsToggleGroupSize.vue" code lang="vue" -->

```vue [DocsToggleGroupSize.vue]
<template>
  <div class="flex flex-col gap-8">
    <UiToggleGroup type="multiple">
      <UiToggleGroupItem size="sm" value="bold" icon="lucide:bold" />
      <UiToggleGroupItem size="sm" value="italic" icon="lucide:italic" />
      <UiToggleGroupItem size="sm" value="underline" icon="lucide:underline" />
    </UiToggleGroup>
    <UiToggleGroup type="multiple">
      <UiToggleGroupItem size="lg" value="bold" icon="lucide:bold" />
      <UiToggleGroupItem size="lg" value="italic" icon="lucide:italic" />
      <UiToggleGroupItem size="lg" value="underline" icon="lucide:underline" />
    </UiToggleGroup>
  </div>
</template>
```

<!-- /automd -->

::
