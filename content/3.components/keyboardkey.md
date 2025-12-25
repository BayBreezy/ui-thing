---
title: Keyboard Key
description: The <kbd> HTML element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device.
---

## Source code

Click :SourceCodeLink{component="Kbd.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add kbd"}

## Usage

```vue
<template>
  <UiKbd>Ctrl</UiKbd>
</template>
```

## Examples

### Basic

::ShowCase

:DocsKbd

#code

<!-- automd:file src="../../app/components/content/Docs/Kbd/DocsKbd.vue" code lang="vue" -->

```vue [DocsKbd.vue]
<template>
  <div class="mx-auto flex flex-col items-center gap-4">
    <UiKbdGroup>
      <UiKbd>⌘</UiKbd>
      <UiKbd>⇧</UiKbd>
      <UiKbd>⌥</UiKbd>
      <UiKbd>⌃</UiKbd>
    </UiKbdGroup>
    <UiKbdGroup>
      <UiKbd>Ctrl</UiKbd>
      <span>+</span>
      <UiKbd>B</UiKbd>
    </UiKbdGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Group

Use the `KbdGroup` component to group keyboard keys together.

::ShowCase

:DocsKbdGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Kbd/DocsKbdGroup.vue" code lang="vue" -->

```vue [DocsKbdGroup.vue]
<template>
  <div class="mx-auto flex flex-col items-center gap-4">
    <p class="text-sm text-muted-foreground">
      Use
      <UiKbdGroup>
        <UiKbd>Ctrl + B</UiKbd>
        <UiKbd>Ctrl + K</UiKbd>
      </UiKbdGroup>
      to open the command palette
    </p>
  </div>
</template>
```

<!-- /automd -->

::

### Button

Use the `Kbd` component inside a `Button` component to display a keyboard key inside a button.

::ShowCase

:DocsKbdButton

#code

<!-- automd:file src="../../app/components/content/Docs/Kbd/DocsKbdButton.vue" code lang="vue" -->

```vue [DocsKbdButton.vue]
<template>
  <div class="mx-auto flex flex-wrap items-center justify-center gap-4">
    <UiButton variant="outline" size="sm" class="pr-2"> Accept <UiKbd>⏎</UiKbd> </UiButton>
    <UiButton variant="outline" size="sm" class="pr-2"> Cancel <UiKbd>Esc</UiKbd> </UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Tooltip

You can use the `Kbd` component inside a `Tooltip` component to display a tooltip with a keyboard key.

::ShowCase

:DocsKbdTooltip

#code

<!-- automd:file src="../../app/components/content/Docs/Kbd/DocsKbdTooltip.vue" code lang="vue" -->

```vue [DocsKbdTooltip.vue]
<template>
  <div class="mx-auto flex flex-wrap items-center justify-center gap-4">
    <UiButtonGroup>
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton size="sm" variant="outline"> Save </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>
          <div class="flex items-center gap-2">Save Changes <UiKbd>S</UiKbd></div>
        </UiTooltipContent>
      </UiTooltip>
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton size="sm" variant="outline"> Print </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>
          <div class="flex items-center gap-2">
            Print Document
            <UiKbdGroup>
              <UiKbd>Ctrl</UiKbd>
              <UiKbd>P</UiKbd>
            </UiKbdGroup>
          </div>
        </UiTooltipContent>
      </UiTooltip>
    </UiButtonGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Input Group

You can use the `Kbd` component inside a `InputGroupAddon` component to display a keyboard key inside an input group.

::ShowCase

:DocsKbdInputGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Kbd/DocsKbdInputGroup.vue" code lang="vue" -->

```vue [DocsKbdInputGroup.vue]
<template>
  <div class="mx-auto flex w-full max-w-xs flex-col gap-6">
    <UiInputGroup>
      <UiInputGroupInput placeholder="Search..." />
      <UiInputGroupAddon>
        <Icon name="lucide:search" />
      </UiInputGroupAddon>
      <UiInputGroupAddon align="inline-end">
        <UiKbd>⌘</UiKbd>
        <UiKbd>K</UiKbd>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Sizes

::ShowCase

:DocsKbdSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Kbd/DocsKbdSizes.vue" code lang="vue" -->

```vue [DocsKbdSizes.vue]
<template>
  <div class="mx-auto flex flex-col items-center gap-4">
    <UiKbdGroup>
      <UiKbd size="xs">Ctrl</UiKbd>
      <span>+</span>
      <UiKbd size="xs">B</UiKbd>
    </UiKbdGroup>
    <UiKbdGroup>
      <UiKbd size="sm">Ctrl</UiKbd>
      <span>+</span>
      <UiKbd size="sm">B</UiKbd>
    </UiKbdGroup>
    <UiKbdGroup>
      <UiKbd size="md">Ctrl</UiKbd>
      <span>+</span>
      <UiKbd size="md">B</UiKbd>
    </UiKbdGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Variants

::ShowCase

:DocsKbdVariants

#code

<!-- automd:file src="../../app/components/content/Docs/Kbd/DocsKbdVariants.vue" code lang="vue" -->

```vue [DocsKbdVariants.vue]
<template>
  <div class="mx-auto flex flex-col items-center gap-4">
    <UiKbdGroup>
      <UiKbd variant="outline">Ctrl</UiKbd>
      <span>+</span>
      <UiKbd variant="outline">B</UiKbd>
    </UiKbdGroup>
    <UiKbdGroup>
      <UiKbd>Ctrl</UiKbd>
      <span>+</span>
      <UiKbd>B</UiKbd>
    </UiKbdGroup>
  </div>
</template>
```

<!-- /automd -->

::
