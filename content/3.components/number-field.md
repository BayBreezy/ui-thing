---
title: Number Field
description: A number field allows a user to enter a number and increment or decrement the value using stepper buttons.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/number-field
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/number-field#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="NumberField"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add number-field"}

## Usage

The model is `number | undefined`. Clearing the input emits `undefined`. Set `startingValue` to choose the first value when stepping an empty field. Set `allowInvalid` to retain typed values outside the bounds or off the step. Stepping farther outside the range leaves the value unchanged.

### Stepping from an empty value

The first step in either direction sets the value to 10. Clear the input to try again.

::prose-show-case

:DocsNumberFieldStartingValue

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberFieldStartingValue.vue" code lang="vue" -->

```vue [DocsNumberFieldStartingValue.vue]
<template>
  <div class="mx-auto max-w-xs space-y-2">
    <UiLabel for="starting-quantity">Quantity</UiLabel>
    <UiNumberField
      id="starting-quantity"
      v-model="quantity"
      :starting-value="10"
      :min="0"
      :max="20"
      :step="2"
    />
  </div>
</template>

<script setup lang="ts">
  const quantity = ref<number>();
</script>
```

<!-- /automd -->

::

### Basic

::prose-show-case

:DocsNumberField

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberField.vue" code lang="vue" -->

```vue [DocsNumberField.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[120px]">
      <UiNumberField />
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Disabled

::prose-show-case

:DocsNumberFieldDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberFieldDisabled.vue" code lang="vue" -->

```vue [DocsNumberFieldDisabled.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[120px]">
      <UiNumberField disabled />
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Decimal

::prose-show-case

:DocsNumberFieldDecimal

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberFieldDecimal.vue" code lang="vue" -->

```vue [DocsNumberFieldDecimal.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[150px]">
      <UiNumberField
        :default-value="5"
        :min="0"
        :format-options="{
          signDisplay: 'exceptZero',
          minimumFractionDigits: 1,
        }"
      />
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Percent

::prose-show-case

:DocsNumberFieldPercent

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberFieldPercent.vue" code lang="vue" -->

```vue [DocsNumberFieldPercent.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[150px]">
      <UiNumberField
        :default-value="0.1"
        :min="0"
        :max="1"
        :step="0.01"
        :format-options="{
          style: 'percent',
        }"
      />
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Currency

::prose-show-case

:DocsNumberFieldCurrency

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberFieldCurrency.vue" code lang="vue" -->

```vue [DocsNumberFieldCurrency.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[200px]">
      <UiNumberField
        :default-value="20_000"
        :min="0"
        :max="30_000"
        :format-options="{
          style: 'currency',
          currency: 'JMD',
        }"
      />
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Custom

::prose-show-case

:DocsNumberFieldCustom

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberFieldCustom.vue" code lang="vue" -->

```vue [DocsNumberFieldCustom.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[150px]">
      <UiNumberField :min="0">
        <UiNumberFieldInput placeholder="15" />
        <UiNumberFieldDecrement class="border-l" />
        <UiNumberFieldIncrement class="border-l" />
      </UiNumberField>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
