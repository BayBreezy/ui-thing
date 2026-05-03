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

:prose-pm-x{command="ui-thing@latest add currency-input"}

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

::prose-show-case

:DocsCurrencyInputBasic

#code

<!-- automd:file src="../../app/components/content/Docs/CurrencyInput/DocsCurrencyInputBasic.vue" code lang="vue" -->

```vue [DocsCurrencyInputBasic.vue]
<template>
  <div class="mx-auto grid w-full max-w-xs items-center">
    <UiCurrencyInput placeholder="How much?" :model-value="25367" />
  </div>
</template>
```

<!-- /automd -->

::

### Options

You can change the configuration by passing the `options` prop.

::prose-show-case

:DocsCurrencyInputOptions

#code

<!-- automd:file src="../../app/components/content/Docs/CurrencyInput/DocsCurrencyInputOptions.vue" code lang="vue" -->

```vue [DocsCurrencyInputOptions.vue]
<template>
  <div class="mx-auto flex w-full max-w-xs items-center justify-center">
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

::prose-show-case

:DocsCurrencyInputForm

#code

<!-- automd:file src="../../app/components/content/Docs/CurrencyInput/DocsCurrencyInputForm.vue" code lang="vue" -->

```vue [DocsCurrencyInputForm.vue]
<template>
  <div class="mx-auto flex w-full max-w-xs items-center justify-center">
    <form class="w-full space-y-4" @submit="onSubmit">
      <Field v-slot="{ componentField }" name="total">
        <UiFormItem label="Grand total" description="This is what you came for, right?">
          <UiCurrencyInput v-bind="componentField" />
        </UiFormItem>
      </Field>
      <UiButton class="w-full" type="submit">Pay It</UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { number, object } from "yup";

  const schema = object({
    total: number()
      .label("Grand total")
      .required()
      .transform((v) => (v ? Number(v) : undefined))
      .min(1000),
  });

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner("Thank you for paying", {
      description: `You have paid ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(values.total)}`,
      closeButton: false,
      action: {
        label: "Undo",
        onClick: () => useSonner.dismiss(),
      },
    });
  });
</script>
```

<!-- /automd -->

::
