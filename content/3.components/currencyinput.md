---
title: Currency Input
description: Displays a form input field for currency values.
links:
  - title: Currency Input
    href: https://dm4t2.github.io/vue-currency-input/
    icon: "lucide:circle-dollar-sign"
  - title: API Reference
    href: https://dm4t2.github.io/vue-currency-input/config.html
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="CurrencyInput.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add currency-input
```

Adding this component will also install the `vue-currency-input` package.

## Usage

### Default Configuration

The default configuration for the currency input component is as follows:

```json
{
  "currency": "USD",
  "locale": "en-US",
  "hideCurrencySymbolOnFocus": false,
  "hideGroupingSeparatorOnFocus": false
}
```

### Basic

::ShowCase

:DocsCurrencyInputBasic

#code

<!-- automd:file src="../../app/components/content/Docs/CurrencyInput/DocsCurrencyInputBasic.vue" code lang="vue" -->

```vue [DocsCurrencyInputBasic.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiCurrencyInput placeholder="How much?" :model-value="25367" />
  </div>
</template>
```

<!-- /automd -->

::

### Options

You can change the configuration by passing the `options` prop.

::ShowCase

:DocsCurrencyInputOptions

#code

<!-- automd:file src="../../app/components/content/Docs/CurrencyInput/DocsCurrencyInputOptions.vue" code lang="vue" -->

```vue [DocsCurrencyInputOptions.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiCurrencyInput
      :options="{
        currency: 'JMD',
        autoDecimalDigits: true,
        precision: { min: 0, max: 4 },
      }"
      placeholder="What is the total?"
      :model-value="8518"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Form

::ShowCase

:DocsCurrencyInputForm

#code

<!-- automd:file src="../../app/components/content/Docs/CurrencyInput/DocsCurrencyInputForm.vue" code lang="vue" -->

```vue [DocsCurrencyInputForm.vue]
<template>
  <div class="mx-auto flex w-full max-w-lg items-center justify-center">
    <form class="w-full space-y-4" @submit="onSubmit">
      <Field v-slot="{ componentField }" name="total">
        <UiFormItem label="Grand total" description="This is what you came for, right?">
          <UiCurrencyInput v-bind="componentField" />
        </UiFormItem>
      </Field>
      <div>
        <UiButton type="submit">Pay It</UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        total: z
          .number({
            description: "Total amount to pay",
            invalid_type_error: "Please enter a valid number",
          })
          .nonnegative()
          .min(1000),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner("Thank you for paying", {
      description: `You have paid ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(values.total)}`,
    });
  });
</script>
```

<!-- /automd -->

::
