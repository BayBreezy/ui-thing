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
<template>
  <form>
    <Field v-slot="{ ... }">
      <FormItem>
        <template #label>
          <FormLabel />
        </template>
        <FormControl>
          <!-- any Form Input component or native input elements -->
        </FormControl>
        <template #description>
          <FormDescription />
        </template>
        <template #message>
          <FormMessage />
        </template>
      </FormItem>
    </Field>
  </form>
</template>
```

The `<Field/>` component is auto-imported by the `@vee-validate/nuxt` module. You can change the name of the impported components in your `nuxt.config
.ts` file. You can visit :prose-a[here]{href="https://vee-validate.logaretm.com/v4/integrations/nuxt/" target="\_blank"} for more information.

## Source code

Click :SourceCodeLink{component="Form"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add form
```

## Usage

### User profile form

::ShowCase

:DocsFormUser

#code

<!-- automd:file src="../../app/components/content/Docs/Form/DocsFormUser.vue" code lang="vue" -->

```vue [DocsFormUser.vue]
<template>
  <UiCard
    class="mx-auto max-w-sm"
    title="Profile"
    description="Update your profile information below"
  >
    <template #content>
      <UiCardContent as="form" class="flex flex-col gap-4" @submit="onSubmit">
        <Field v-slot="{ componentField }" name="fullName">
          <UiFormItem label="Full name" description="This will be displayed to the public">
            <UiInput v-bind="componentField" />
          </UiFormItem>
        </Field>
        <Field v-slot="{ componentField }" name="email">
          <UiFormItem label="Email">
            <UiInput type="email" v-bind="componentField" />
          </UiFormItem>
        </Field>
        <Field v-slot="{ componentField }" name="phone">
          <UiFormItem hint="Optional" label="Phone">
            <UiInput type="tel" v-bind="componentField" />
          </UiFormItem>
        </Field>
        <div>
          <UiButton type="submit">Update profile</UiButton>
        </div>
      </UiCardContent>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        fullName: z
          .string({
            required_error: "Full name is required",
          })
          .min(3, "Full name must be at least 3 characters"),
        email: z
          .string({
            required_error: "Email is required",
          })
          .email("Email must be a valid email"),
        phone: z
          .string()
          .transform((value) => (!value ? null : value))
          .refine((value) => !value || value.length === 10, {
            message: "Phone must be 10 digits",
          })
          .nullish(),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>
```

<!-- /automd -->

::
