---
title: Form
description: Building forms with VeeValidate and Zod.
links:
  - title: Vee-Validate
    href: https://www.radix-vue.com/components/accordion
    icon: mdi:vuejs
  - title: Zod
    href: https://zod.dev/
    icon: simple-icons:zod
---

Forms are tricky. They are one of the most common things you'll build in a web application, but also one of the most complex.

Well-designed HTML forms are:

- Well-structured and semantically correct.
- Easy to use and navigate (keyboard).
- Accessible with ARIA attributes and proper labels.
- Has support for client and server side validation.
- Well-styled and consistent with the rest of the application.

In this guide, we will take a look at building forms with :prose-a[vee-validate]{href='https://vee-validate.logaretm.com/v4/' target='\_blank'} and :prose-a[zod]{href="https://zod.dev/" target="\_blank"}. We're going to use a `<FormField>` component to compose accessible forms using Radix Vue components.

## Features

The `<Form />` component is a wrapper around the `vee-validate` library. It provides a few things:

- Composable components for building forms.
- A `<FormField />` component for building controlled form fields.
- Form validation using `zod`.
- Applies the correct `aria` attributes to form fields based on states, handle unqiue IDs
- Built to work with all Radix Vue components.
- Bring your own schema library. We use `zod` but you can use any other supported schema validation you want, like `yup` or `valibot`.
- You have full control over the markup and styling.

:prose-a[vee-validate]{href='https://vee-validate.logaretm.com/v4/' target='\_blank'} makes use of two flavors to add validation to your forms.

- Composition API
- Higher-order components (HOC)

## Anatomy

```html
<form>
  <FormField v-slot="{ ... }">
    <FormItem>
      <FormLabel />
      <FormControl>
        <!-- any Form Input component or native input elements -->
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</form>
```

## Source code

Click :SourceCodeLink{component="Form"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add form
```

## Usage

### User profile form

::ShowCase{component="DocsFormUser"}

#code

```vue [DocsFormUser.vue]
<template>
  <div>
    <UIAccordion type="single" default-value="item-2" :items="accordionItems" />
  </div>
</template>

<script lang="ts" setup>
  const accordionItems = [
    {
      value: "item-1",
      title: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      value: "item-2",
      title: "Is it unstyled?",
      content: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    },
    {
      value: "item-3",
      title: "Can it be animated?",
      content: "Yes! You can use the transition prop to configure the animation.",
    },
  ];
</script>
```

::
