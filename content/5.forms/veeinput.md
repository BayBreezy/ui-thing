---
title: VeeInput
label: Updated
description: An input component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Input Source
    href: /components/input
    icon: lucide:text-cursor-input
---

## Source code

Click :SourceCodeLink{component="Vee/Input.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-input
```

## Usage

### User form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `zod` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase{component="DocsVeeInput"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsVeeInput.vue" code lang="vue" -->

```vue [DocsVeeInput.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeInput label="Full name" name="name" hint="This will be displayed to the public" />
      <UiVeeInput label="Email" name="email" type="email" />
      <UiVeeInput label="Age" name="age" type="number" />
      <UiButton type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    age: z
      .number({
        coerce: true,
        required_error: "Required",
        invalid_type_error: "Please enter a number",
      })
      .int("Only numbers are allowed")
      .min(18, "You must be at least 18 years old")
      .max(120, "You must be less than 120 years old"),
    email: z.string({ required_error: "Required" }).email("Please enter a valid email"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (_) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Sending information to our servers...",
      success: (_) => "We updated your information.",
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

<!-- /automd -->

::

## Origin UI

Here we have some examples that come from [Origin UI](https://originui.com/inputs).

Not all examples are copied but these should give you a good idea of what you can do with the `VeeInput` component.

### Required Input

::ShowCase{component="DocsOriginInputRequired"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputRequired.vue" code lang="vue" -->

```vue [DocsOriginInputRequired.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Required input" placeholder="Email" type="email" required />
  </div>
</template>
```

<!-- /automd -->

::

### Input with Helper Text

::ShowCase{component="DocsOriginInputHelperText"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputHelperText.vue" code lang="vue" -->

```vue [DocsOriginInputHelperText.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with helper text"
      placeholder="Email"
      type="email"
      hint="We won't share your email with anyone"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Input with label hint

::ShowCase{component="DocsOriginInputLabelHint"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputLabelHint.vue" code lang="vue" -->

```vue [DocsOriginInputLabelHint.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with label hint"
      placeholder="Email"
      type="email"
      label-hint="Optional"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Input with Colored Ring

::ShowCase{component="DocsOriginInputColoredBorder"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputColoredBorder.vue" code lang="vue" -->

```vue [DocsOriginInputColoredBorder.vue]
<template>
  <!-- NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color. -->
  <div class="flex items-center justify-center" style="--ring: 234 89% 74%">
    <UiVeeInput label="Input with colored ring" placeholder="Email" type="email" />
  </div>
</template>
```

<!-- /automd -->

::

### Input with Gray Background

::ShowCase{component="DocsOriginInputGrayBg"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputGrayBg.vue" code lang="vue" -->

```vue [DocsOriginInputGrayBg.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with gray background"
      class="border-transparent bg-muted shadow-none"
      placeholder="Email"
      type="email"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Disabled Input

::ShowCase{component="DocsOriginInputDisabled"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputDisabled.vue" code lang="vue" -->

```vue [DocsOriginInputDisabled.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Disabled input" disabled placeholder="Email" type="email" />
  </div>
</template>
```

<!-- /automd -->

::

### Input with Start Icon

::ShowCase{component="DocsOriginInputStartIcon"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputStartIcon.vue" code lang="vue" -->

```vue [DocsOriginInputStartIcon.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      icon="lucide:at-sign"
      label="Input with start icon"
      placeholder="Email"
      type="email"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Input with End Icon

::ShowCase{component="DocsOriginInputEndIcon"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputEndIcon.vue" code lang="vue" -->

```vue [DocsOriginInputEndIcon.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      trailing-icon="lucide:mail"
      label="Input with end icon"
      placeholder="Email"
      type="email"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Input with Start Inline Addon

::ShowCase{component="DocsOriginInputStartInlineAddOn"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputStartInlineAddOn.vue" code lang="vue" -->

```vue [DocsOriginInputStartInlineAddOn.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with start inline add-on" class="peer ps-16" placeholder="google.com">
      <template #icon>
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          https://
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with End Inline Addon

::ShowCase{component="DocsOriginInputEndInlineAddOn"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputEndInlineAddOn.vue" code lang="vue" -->

```vue [DocsOriginInputEndInlineAddOn.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with end inline add-on" class="peer pe-14" placeholder="google.com">
      <template #trailingIcon>
        <span
          class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          .com
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with Inline Addons

::ShowCase{component="DocsOriginInputInlineAddOns"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputInlineAddOns.vue" code lang="vue" -->

```vue [DocsOriginInputInlineAddOns.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with inline add-ons" class="peer pe-12 ps-6" placeholder="0.00">
      <template #trailingIcon>
        <span
          class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          EUR
        </span>
      </template>
      <template #icon>
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          €
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with Start Addon

::ShowCase{component="DocsOriginInputStartAddon"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputStartAddon.vue" code lang="vue" -->

```vue [DocsOriginInputStartAddon.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with start add-on"
      class="peer ps-20"
      placeholder="google.com"
      type="text"
    >
      <template #icon>
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center border-r px-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          https://
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with End Addon

::ShowCase{component="DocsOriginInputEndAddon"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputEndAddon.vue" code lang="vue" -->

```vue [DocsOriginInputEndAddon.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with end add-on"
      class="peer pe-16"
      placeholder="google.com"
      type="text"
    >
      <template #trailingIcon>
        <span
          class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center border-l px-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          .com
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with Inline Start & End Addon

::ShowCase{component="DocsOriginInputInlineStartEndAddon"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputInlineStartEndAddon.vue" code lang="vue" -->

```vue [DocsOriginInputInlineStartEndAddon.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with inline start and end add-on"
      class="peer pe-16 ps-7"
      placeholder="0.00"
      type="text"
    >
      <template #icon>
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          €
        </span>
      </template>
      <template #trailingIcon>
        <span
          class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center border-l px-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          EUR
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with Start Select

::ShowCase{component="DocsOriginInputStartSelect"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputStartSelect.vue" code lang="vue" -->

```vue [DocsOriginInputStartSelect.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with start select"
      class="peer ps-28"
      placeholder="192.168.1.1"
      type="text"
    >
      <template #icon>
        <select
          aria-label="Protocol"
          class="form-select absolute inset-y-0 start-0 flex items-center justify-center rounded-s-md border border-input bg-background ps-3 text-sm text-muted-foreground ring-offset-background focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-disabled:opacity-50"
        >
          <option value="https://">https://</option>
          <option value="http://">http://</option>
          <option value="ftp://">ftp://</option>
          <option value="sftp://">sftp://</option>
          <option value="ws://">ws://</option>
          <option value="wss://">wss://</option>
        </select>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with End Select

::ShowCase{component="DocsOriginInputEndSelect"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputEndSelect.vue" code lang="vue" -->

```vue [DocsOriginInputEndSelect.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with end select" class="peer pe-20" placeholder="google">
      <template #trailingIcon>
        <select
          aria-label="Protocol"
          class="form-select absolute inset-y-0 end-0 flex items-center justify-center rounded-e-md border border-input bg-background pe-7 text-sm text-muted-foreground ring-offset-background focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-disabled:opacity-50"
        >
          <option>.com</option>
          <option>.org</option>
          <option>.net</option>
        </select>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with End Inline Button

::ShowCase{component="DocsOriginInputEndInlineButton"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputEndInlineButton.vue" code lang="vue" -->

```vue [DocsOriginInputEndInlineButton.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with end inline button"
      class="peer pe-9"
      placeholder="Email"
      type="email"
    >
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Subscribe"
          class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="lucide:send" class="size-4" />
        </button>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with End Icon Button

::ShowCase{component="DocsOriginInputEndIconButton"}

#code

<!-- automd:file src="../../components/content/Docs/Vee/Input/DocsOriginInputEndIconButton.vue" code lang="vue" -->

```vue [DocsOriginInputEndIconButton.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with end icon button"
      class="peer pe-9"
      placeholder="Email"
      type="email"
    >
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Subscribe"
          class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent border-l-input text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-muted/50 hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="lucide:download" class="size-4" />
        </button>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::
