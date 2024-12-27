---
title: Number Field
description: A number field allows a user to enter a number and increment or decrement the value using stepper buttons.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/number-field
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/number-field#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="NumberField"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx --yes ui-thing@latest add number-field && npm add @internationalized/number
```

## Usage

### Basic

::ShowCase

:DocsNumberField

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberField.vue" code lang="vue" -->

```vue [DocsNumberField.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[150px]">
      <UiNumberField />
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Disabled

::ShowCase

:DocsNumberFieldDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberFieldDisabled.vue" code lang="vue" -->

```vue [DocsNumberFieldDisabled.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[150px]">
      <UiNumberField disabled />
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Decimal

::ShowCase

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

::ShowCase

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

::ShowCase

:DocsNumberFieldCurrency

#code

<!-- automd:file src="../../app/components/content/Docs/NumberField/DocsNumberFieldCurrency.vue" code lang="vue" -->

```vue [DocsNumberFieldCurrency.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[250px]">
      <UiNumberField
        :default-value="20000"
        :min="0"
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

::ShowCase

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
