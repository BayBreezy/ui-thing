---
title: Currency Input
description: Displays a form input field for currency values.
label: New
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

::ShowCase{component="DocsCurrencyInputBasic"}

#code

```vue [DocsCurrencyInputBasic.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiCurrencyInput placeholder="How much?" :modelValue="25367" />
  </div>
</template>
```

::

### Options

You can change the configuration by passing the `options` prop.

::ShowCase{component="DocsCurrencyInputOptions"}

#code

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
      :modelValue="8518"
    />
  </div>
</template>
```

::

### Form

::ShowCase{component="DocsCurrencyInputForm"}

#code

```vue [DocsCurrencyInputForm.vue]
<template>
  <div class="mx-auto flex w-full max-w-lg items-center justify-center">
    <form @submit="onSubmit" class="w-full space-y-4">
      <Field name="username" v-slot="{ componentField }">
        <UiFormItem label="Username" description="Others will be able to see this">
          <UiInput v-bind="componentField" />
        </UiFormItem>
      </Field>
      <div>
        <UiButton type="submit">Update</UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        username: z
          .string({
            required_error: "Username is required",
          })
          .min(3, "Username must be at least 3 characters long")
          .max(20, "Username must be at most 20 characters long"),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>
```

::
