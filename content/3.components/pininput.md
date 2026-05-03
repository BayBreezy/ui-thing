---
title: Pin Input
description: A sequence of one-character alphanumeric inputs. Useful for PIN codes, verification codes, etc.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/pin-input.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/pin-input.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="PinInput"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add pin-input"}

## Usage

### Placeholder

Passing a value to the placeholder prop will render a placeholder character in each input.

::prose-show-case

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

::prose-show-case

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

::prose-show-case

:DocsPinInputComplete

#code

<!-- automd:file src="../../app/components/content/Docs/PinInput/DocsPinInputComplete.vue" code lang="vue" -->

```vue [DocsPinInputComplete.vue]
<template>
  <div class="flex items-center justify-center">
    <UiLabel class="flex flex-col items-start">
      <p class="mb-3 text-sm font-medium">Enter OTP sent to your email</p>
      <UiPinInput :input-count="5" type="number" @complete="useSonner.success('OTP Complete')" />
    </UiLabel>
  </div>
</template>
```

<!-- /automd -->

::

### Origin UI

::prose-show-case

:DocsPinInputOrigin

#code

<!-- automd:file src="../../app/components/content/Docs/PinInput/DocsPinInputOrigin.vue" code lang="vue" -->

```vue [DocsPinInputOrigin.vue]
<template>
  <div class="mx-auto grid max-w-xs grid-cols-1 gap-10">
    <div class="flex flex-col gap-3">
      <UiLabel for="otp-single">OTP input single</UiLabel>
      <UiPinInput id="otp-single">
        <UiPinInputGroup>
          <template v-for="(item, i) in 4" :key="i">
            <UiPinInputInput
              :index="i"
              class="rounded-s-none rounded-e-none border-l-0 will-change-[box-shadow] first:rounded-s-md first:border-l last:rounded-e-md focus:z-20 focus:border-l"
            />
          </template>
        </UiPinInputGroup>
      </UiPinInput>
    </div>
    <div class="flex flex-col gap-3">
      <UiLabel for="otp-double">OTP input double</UiLabel>
      <UiPinInput id="otp-double" otp>
        <UiPinInputGroup>
          <template v-for="(item, n) in [1, 2, 3]" :key="n">
            <UiPinInputInput
              :index="n"
              class="rounded-s-none rounded-e-none border-l-0 will-change-[box-shadow] first:rounded-s-md first:border-l last:rounded-e-md focus:z-20 focus:border-l"
            />
          </template>
        </UiPinInputGroup>
        <Icon name="lucide:minus" />
        <UiPinInputGroup>
          <template v-for="(item, n) in [4, 5, 6]" :key="n">
            <UiPinInputInput
              :index="n + 3"
              class="rounded-s-none rounded-e-none border-l-0 will-change-[box-shadow] first:rounded-s-md first:border-l last:rounded-e-md focus:z-20 focus:border-l"
            />
          </template>
        </UiPinInputGroup>
      </UiPinInput>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
