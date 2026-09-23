---
title: VeePasswordInput
description: A password input with a show/hide toggle, an optional strength bar and an optional requirements checklist, powered by Vee-Validate.
label: New
links:
  - title: Input Source
    href: /components/input
    icon: lucide:text-cursor-input
---

## Source code

Click :SourceCodeLink{component="Vee/PasswordInput.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-password-input"}

## Usage

### User form

`VeePasswordInput` works like [VeeInput](/forms/veeinput): give it a `name` and it registers itself with the parent `useForm`. Validation rules come from your schema (or the `rules` prop), so the requirements list is purely visual feedback unless your schema enforces the same rules.

::prose-show-case

:DocsVeePasswordInput

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/PasswordInput/DocsVeePasswordInput.vue" code lang="vue" -->

```vue [DocsVeePasswordInput.vue]
<template>
  <form class="mx-auto max-w-xs" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeInput label="Email" name="email" type="email" />
      <UiVeePasswordInput label="Password" name="password" placeholder="Enter your password" />
      <UiButton :loading="isSubmitting" type="submit"> Sign in </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  const schema = object({
    email: string().required().label("Email").email(),
    password: string().required().label("Password").min(8),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (_) => {
    await promiseTimeout(2000);
    useSonner.success("Signed in");
  });
</script>
```

<!-- /automd -->

::

### Strength bar and requirements

Enable `show-strength` for the bar and `show-requirements` for the checklist. Both are off by default and can be used independently. With no `requirements` prop, all five built-in criteria are checked.

::prose-show-case

:DocsVeePasswordInputStrength

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/PasswordInput/DocsVeePasswordInputStrength.vue" code lang="vue" -->

```vue [DocsVeePasswordInputStrength.vue]
<template>
  <div class="mx-auto max-w-xs">
    <UiVeePasswordInput
      v-model="password"
      label="New password"
      name="newPassword"
      placeholder="Password"
      show-strength
      show-requirements
    />
  </div>
</template>

<script lang="ts" setup>
  const password = ref("");
</script>
```

<!-- /automd -->

::

### Choose your criteria

Pass built-in keys to `requirements` to check only what you need. Here only the length and special character criteria are used, and `min-length` changes the length threshold. The strength bar scales to however many criteria you pass.

Built-in keys: `length`, `special`, `number`, `lowercase`, `uppercase`.

::prose-show-case

:DocsVeePasswordInputCriteria

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/PasswordInput/DocsVeePasswordInputCriteria.vue" code lang="vue" -->

```vue [DocsVeePasswordInputCriteria.vue]
<template>
  <div class="mx-auto max-w-xs">
    <UiVeePasswordInput
      label="Password"
      name="criteriaPassword"
      placeholder="Password"
      :requirements="['length', 'special']"
      :min-length="12"
      show-requirements
    />
  </div>
</template>
```

<!-- /automd -->

::

### Strength bar only

Use `show-strength` on its own to hide the checklist.

::prose-show-case

:DocsVeePasswordInputBarOnly

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/PasswordInput/DocsVeePasswordInputBarOnly.vue" code lang="vue" -->

```vue [DocsVeePasswordInputBarOnly.vue]
<template>
  <div class="mx-auto max-w-xs">
    <UiVeePasswordInput
      label="Password"
      name="barPassword"
      placeholder="Password"
      hint="Use a mix of letters, numbers and symbols"
      show-strength
    />
  </div>
</template>
```

<!-- /automd -->

::

### Custom requirements

Mix built-in keys with your own `{ text, test }` objects. `test` can be a `RegExp` or a function that receives the password and returns a boolean.

::prose-show-case

:DocsVeePasswordInputCustom

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/PasswordInput/DocsVeePasswordInputCustom.vue" code lang="vue" -->

```vue [DocsVeePasswordInputCustom.vue]
<template>
  <div class="mx-auto max-w-xs">
    <UiVeePasswordInput
      label="Password"
      name="customPassword"
      placeholder="Password"
      :requirements
      show-strength
      show-requirements
    />
  </div>
</template>

<script lang="ts" setup>
  import type {
    PasswordRequirement,
    PasswordRequirementKey,
  } from "@/components/Ui/Vee/PasswordInput.vue";

  // Mix built-in keys with your own criteria
  const requirements: (PasswordRequirementKey | PasswordRequirement)[] = [
    "length",
    "number",
    { text: "No spaces", test: (v) => v.length > 0 && !/\s/.test(v) },
    {
      text: "Not a common password",
      test: (v) => v.length > 0 && !/^(password|12345678)/i.test(v),
    },
  ];
</script>
```

<!-- /automd -->

::

### Without the toggle and with an icon

Set `:show-toggle="false"` to remove the show/hide button. The `icon` prop works like it does on `VeeInput`.

::prose-show-case

:DocsVeePasswordInputNoToggle

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/PasswordInput/DocsVeePasswordInputNoToggle.vue" code lang="vue" -->

```vue [DocsVeePasswordInputNoToggle.vue]
<template>
  <div class="mx-auto max-w-xs">
    <UiVeePasswordInput
      label="Password"
      name="noTogglePassword"
      icon="lucide:lock"
      placeholder="Password"
      :show-toggle="false"
    />
  </div>
</template>
```

<!-- /automd -->

::

## Props

| Prop               | Type                                             | Default                                                | Description                                                    |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------------------- |
| `showStrength`     | `boolean`                                        | `false`                                                | Show the strength bar and label.                               |
| `showRequirements` | `boolean`                                        | `false`                                                | Show the requirements checklist.                               |
| `showToggle`       | `boolean`                                        | `true`                                                 | Show the show/hide password button.                            |
| `requirements`     | `(PasswordRequirementKey \| PasswordRequirement)[]` | `["length", "special", "number", "lowercase", "uppercase"]` | Criteria to check. Built-in keys or `{ text, test }` objects.  |
| `minLength`        | `number`                                         | `8`                                                    | Minimum length for the built-in `length` criterion.            |

All other props (`label`, `labelHint`, `hint`, `icon`, `name`, `rules`, `placeholder`, `required`, `disabled`, `validateOnMount`, `modelValue`) behave the same as on [VeeInput](/forms/veeinput). Extra attributes are forwarded to the underlying `UiInput`.

## Slots

| Slot           | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `icon`         | Replaces the leading icon.                                           |
| `toggle`       | Replaces the icon inside the show/hide button. Receives `visible`.   |
| `hint`         | Replaces the hint text. Receives `errorMessage` and `value`.         |
| `errorMessage` | Replaces the error message. Receives `errorMessage` and `value`.     |
