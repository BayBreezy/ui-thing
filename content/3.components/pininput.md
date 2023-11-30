---
title: Pin Input
description: A sequence of one-character alphanumeric inputs. Useful for PIN codes, verification codes, etc.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/pin-input.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/pin-input.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="PinInput"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add pin-input
```

## Usage

### Placeholder

Passing a value to the placeholder prop will render a placeholder character in each input.

::ShowCase{component="DocsPinInput"}

#code

```vue [DocsPinInput.vue]
<template>
  <div class="flex items-center justify-center">
    <UiLabel>
      <p class="mb-3 text-sm font-medium">Placeholder</p>
      <UiPinInput placeholder="0" />
    </UiLabel>
  </div>
</template>
```

::

### Separator

Passing a value to the separator prop will render a separator character between each input.

::ShowCase{component="DocsPinInputSeparator"}

#code

```vue [DocsPinInputSeparator.vue]
<template>
  <div class="flex items-center justify-center">
    <UiLabel>
      <p class="mb-3 text-sm font-medium">Separator</p>
      <UiPinInput :inputCount="6" separator="-" />
    </UiLabel>
  </div>
</template>
```

::

### Complete event

The complete event is emitted when the user has entered a value in all inputs.

::ShowCase{component="DocsPinInputComplete"}

#code

```vue [DocsPinInputComplete.vue]
<template>
  <div class="flex items-center justify-center">
    <UiLabel>
      <p class="mb-3 text-sm font-medium">Enter OTP sent to your email</p>
      <UiPinInput @complete="toast({ title: 'Complete' })" :inputCount="5" type="number" />
    </UiLabel>
  </div>
</template>
```

::
