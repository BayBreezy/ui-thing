# Forms

UI Thing forms are built on [vee-validate](https://vee-validate.logaretm.com/v4/). The `UiVee*` components wrap the base inputs with a label, hint and animated error message, and register their value with the nearest `useForm()` by `name`.

## Contents

- Setup (once per project)
- The standard form
- Rules
- Choosing a field component
- Alternatives: `UiFormBuilder` and `UiField*`
- Feedback after submit

---

## Setup (once per project)

Add the field components. The CLI does the rest:

```bash
npx ui-thing@latest add vee-input vee-select --yes                    # schema library defaults to yup
npx ui-thing@latest add vee-input vee-select --yes --validator zod    # or zod, joi, valibot
```

Adding any `vee-*` component registers `@vee-validate/nuxt` in `nuxt.config.ts` and installs the schema library with its vee-validate adapter (the shipped blocks use yup). Without `--yes` or `--validator` the CLI asks which one. `useForm` and `toTypedSchema` are then auto-imported.

Check `package.json` first if the project already uses a schema library, and pass the matching `--validator` so you do not end up with two. The MCP `get-install-plan` lists what is missing.

---

## The standard form

```vue
<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeInput name="name" label="Full name" hint="Shown on your profile." />
      <UiVeeInput name="email" label="Email" type="email" />
      <UiVeeSelect name="role" label="Role">
        <option disabled value="">Select a role</option>
        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
      </UiVeeSelect>
      <UiButton :loading="isSubmitting" type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const roles = ["Admin", "Editor", "Viewer"];

  const schema = object({
    name: string().required().label("Name").min(3),
    email: string().required().label("Email").email(),
    role: string().required().label("Role"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await $fetch("/api/profile", { method: "POST", body: values });
    useSonner.success("Saved", { description: "Your profile was updated." });
  });
</script>
```

Field components differ: for example `UiVeeSelect` is a native `<select>` that takes `<option>` children. Check the exact props of each field component in its docs page: `get-component` or `https://uithing.com/raw/forms/vee<name>.md`. Do not guess prop names.

---

## Rules

- **Every field has `name` and `label`.** Add `hint` for format help. `name` must match a key in the schema.
- **The wrapper renders its own error.** Do not add separate error elements or `v-if="errors.email"` markup.

  **Incorrect:**

  ```vue
  <UiVeeInput name="email" label="Email" />
  <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
  ```

  **Correct:**

  ```vue
  <UiVeeInput name="email" label="Email" />
  ```

- **Bind `handleSubmit` to `<form @submit>`** and do not add `@submit.prevent`; vee-validate prevents default for you.
- **Disable while submitting:** wrap fields in `<fieldset :disabled="isSubmitting">` and set `:loading="isSubmitting"` on the submit `UiButton`.
- **Give schema labels** (`.label("Email")`) so error messages read well.
- **Use `UiVee*`, not raw `UiInput`, for validated fields.** Use the base `Ui*` controls for plain, non-validated UI such as a search box.
- **Layout:** one column on mobile; group long forms into `UiCard`s or sections with headings. Use `UiVeeCheckbox` / `UiVeeSwitch` for booleans and `UiVeeRadioGroup` for 2 to 5 mutually exclusive choices.
- **Destructive or irreversible submit** (delete account, cancel plan): confirm with `UiAlertDialog` first.
- **Always handle failure:** show a `UiAlert variant="destructive"` or `useSonner.error(...)` when the request fails, and keep the user's input.

---

## Choosing a field component

| Data | Component |
| --- | --- |
| Short text, email, number | `UiVeeInput` (`type`) |
| Password | `UiVeePasswordInput` |
| Long text | `UiVeeTextarea` |
| One of a list | `UiVeeSelect` (native `<select>` with `<option>` children), or `UiVeeCombobox` / `UiVeeAutocomplete` when searchable |
| Several of a list | `UiVeeMultiSelect`, `UiVeeTagsInput` |
| Boolean | `UiVeeCheckbox`, `UiVeeSwitch` |
| One of few | `UiVeeRadioGroup` |
| Date | `UiVeeDatepicker`, `UiVeeDateField` |
| Number with steppers / currency | `UiVeeNumberField`, `UiVeeCurrencyInput` |
| One-time code | `UiVeePinInput` |
| File | `UiVeeFileInput` |
| Rating / range | `UiVeeRating`, `UiVeeVueFormSlider` |

The MCP `plan-form` tool maps a form type (`login`, `signup`, `contact`, `settings`, `checkout`, `survey`, `custom`) to these components with a wiring example.

---

## Alternatives: `UiFormBuilder` and `UiField*`

- **`UiFormBuilder`** builds a whole form from an array of field objects plus a schema. Good for admin screens and quick forms. See `/forms/form-builder`.
- **`UiField*`** (`UiFieldGroup`, `UiFieldLabel`, `UiFieldError`, ...) is for bespoke layouts without vee-validate wrappers. If you use it with vee-validate, wire the error and `aria-invalid` yourself.

Prefer `UiVee*` unless the layout truly cannot be expressed with it.

---

## Feedback after submit

Render `<UiSonner />` once in `app.vue` (add it with `npx ui-thing@latest add sonner`), then call `useSonner.success("Saved")`, `useSonner.error("Could not save")` or `useSonner("Title", { description })`. See [states-and-accessibility.md](./states-and-accessibility.md).
