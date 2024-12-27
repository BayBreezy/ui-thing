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

::ShowCase

:DocsPinInput

#code

<!-- automd:file src="../../app/components/content/Docs/PinInput/DocsPinInput.vue" code lang="vue" -->

```vue [DocsPinInput.vue]
<template>
  <div class="flex items-center justify-center">
    <UiLabel class="flex flex-col items-start">
      <p class="mb-3 text-sm font-medium">Placeholder</p>
      <UiPinInput placeholder="0" />
    </UiLabel>
  </div>
</template>
```

<!-- /automd -->

::

### Separator

Passing a value to the separator prop will render a separator character between each input.

::ShowCase

:DocsPinInputSeparator

#code

<!-- automd:file src="../../app/components/content/Docs/PinInput/DocsPinInputSeparator.vue" code lang="vue" -->

```vue [DocsPinInputSeparator.vue]
<template>
  <div class="flex items-center justify-center">
    <UiLabel class="flex flex-col items-start">
      <p class="mb-3 text-sm font-medium">Separator</p>
      <UiPinInput :input-count="6" separator="-" />
    </UiLabel>
  </div>
</template>
```

<!-- /automd -->

::

### Complete event

The complete event is emitted when the user has entered a value in all inputs.

::ShowCase

:DocsPinInputComplete

#code

<!-- automd:file src="../../app/components/content/Docs/PinInput/DocsPinInputComplete.vue" code lang="vue" -->

```vue [DocsPinInputComplete.vue]
<template>
  <div class="flex items-center justify-center">
    <UiLabel class="flex flex-col items-start">
      <p class="mb-3 text-sm font-medium">Enter OTP sent to your email</p>
      <UiPinInput :input-count="5" type="number" @complete="toast({ title: 'Complete' })" />
    </UiLabel>
  </div>
</template>
```

<!-- /automd -->

::
