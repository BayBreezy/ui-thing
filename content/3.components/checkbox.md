---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/checkbox.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/checkbox.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Checkbox"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add checkbox
```

## Usage

### Basic

::ShowCase

:DocsCheckbox

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckbox.vue" code lang="vue" -->

```vue [DocsCheckbox.vue]
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center gap-2">
      <UiCheckbox id="checkbox-terms" v-model:checked="terms" />
      <UiLabel for="checkbox-terms">
        <span class="ml-2"
          >I agree to the <a href="#" class="text-primary underline">terms and conditions</a></span
        >
      </UiLabel>
    </div>

    <div class="items-top mt-5 flex space-x-2">
      <UiCheckbox id="terms1" v-model:checked="terms1" />
      <div class="grid gap-1.5 leading-none">
        <UiLabel for="terms1"> Accept terms and conditions </UiLabel>
        <p class="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const terms = ref(false);
  const terms1 = ref(false);
</script>
```

<!-- /automd -->

::

### Default

We can set the default value of the checkbox by binding the `v-model:checked` prop to a boolean value.

To bind the default value on the [VeeCheckbox](/forms/veecheckbox) component, we need to use the `v-model` prop instead of `v-model:checked`.

::ShowCase

:DocsCheckboxDefaultValues

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxDefaultValues.vue" code lang="vue" -->

```vue [DocsCheckboxDefaultValues.vue]
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="items-top mt-5 flex space-x-2">
      <UiCheckbox id="terms1" v-model:checked="someVariable" />
      <div class="grid gap-1.5 leading-none">
        <UiLabel for="terms1"> I will be on by default </UiLabel>
        <p class="text-sm text-muted-foreground">This checkbox will be true by default.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const someVariable = ref(true);
</script>
```

<!-- /automd -->

::
