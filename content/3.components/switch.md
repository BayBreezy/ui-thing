---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/switch.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/switch.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Switch"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add switch
```

## Usage

### Basic example

::ShowCase

:DocsSwitch

#code

<!-- automd:file src="../../app/components/content/Docs/Switch/DocsSwitch.vue" code lang="vue" -->

```vue [DocsSwitch.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="flex items-center space-x-2">
      <UiSwitch id="airplane-mode" />
      <UiLabel for="airplane-mode">Airplane Mode</UiLabel>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Form

::ShowCase

:DocsSwitchForm

#code

<!-- automd:file src="../../app/components/content/Docs/Switch/DocsSwitchForm.vue" code lang="vue" -->

```vue [DocsSwitchForm.vue]
<template>
  <form class="flex w-full justify-center" @submit="onSubmit">
    <div class="w-full">
      <Field v-slot="{ handleChange, value }" name="mode">
        <UiFormItem class="flex flex-col">
          <div class="flex items-center gap-3">
            <UiSwitch :checked="value" @update:checked="handleChange" />
            <UiFormLabel class="w-auto"> Airplane mode </UiFormLabel>
          </div>
        </UiFormItem>
      </Field>
      <div class="mt-4">
        <UiButton type="submit" size="sm"> Update </UiButton>
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        mode: z.literal(true, {
          errorMap: (_, __) => {
            return { message: "Please turn on airplane mode" };
          },
        }),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    useSonner.success("Mode changed", {
      description: `Airplane mode is ${data.mode ? "on" : "off"}`,
    });
  });
</script>
```

<!-- /automd -->

::
