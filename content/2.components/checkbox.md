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

::ShowCase{component="DocsCheckbox"}

#code

```vue [DocsCheckbox.vue]
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center gap-2">
      <UICheckbox v-model="terms" id="checkbox-terms" />
      <UILabel for="checkbox-terms">
        <span class="ml-2"
          >I agree to the <a href="#" class="text-primary underline">terms and conditions</a></span
        >
      </UILabel>
    </div>

    <div class="items-top mt-5 flex space-x-2">
      <UICheckbox id="terms1" v-model="terms1" />
      <div class="grid gap-1.5 leading-none">
        <UILabel for="terms1"> Accept terms and conditions </UILabel>
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

::
