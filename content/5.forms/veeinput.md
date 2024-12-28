---
title: VeeInput
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

::ShowCase

:DocsVeeInput

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsVeeInput.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputRequired

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputRequired.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputHelperText

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputHelperText.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputLabelHint

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputLabelHint.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputColoredBorder

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputColoredBorder.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputGrayBg

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputGrayBg.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputDisabled.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputStartIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputStartIcon.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputEndIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputEndIcon.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputStartInlineAddOn

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputStartInlineAddOn.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputEndInlineAddOn

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputEndInlineAddOn.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputInlineAddOns

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputInlineAddOns.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputStartAddon

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputStartAddon.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputEndAddon

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputEndAddon.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputInlineStartEndAddon

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputInlineStartEndAddon.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputStartSelect

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputStartSelect.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputEndSelect

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputEndSelect.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputEndInlineButton

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputEndInlineButton.vue" code lang="vue" -->

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

::ShowCase

:DocsOriginInputEndIconButton

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputEndIconButton.vue" code lang="vue" -->

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

### Input with End Button

::ShowCase

:DocsOriginInputEndButton

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputEndButton.vue" code lang="vue" -->

```vue [DocsOriginInputEndButton.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with end button" class="peer pe-9" placeholder="Email" type="email">
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Send email"
          class="absolute inset-y-0 end-0 flex h-full items-center justify-center rounded-e-md border border-transparent border-l-input px-3 text-sm ring-offset-background transition-shadow hover:bg-muted/50 hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Input with Button

::ShowCase

:DocsOriginInputWithButton

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputWithButton.vue" code lang="vue" -->

```vue [DocsOriginInputWithButton.vue]
<template>
  <div class="flex items-center justify-center gap-2">
    <UiVeeInput label="Input with button" placeholder="Email" type="email" />
    <UiButton aria-label="Send the email" class="mt-7" variant="outline">Send</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Input with Show/Hide Password

::ShowCase

:DocsOriginInputShowHidePassword

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputShowHidePassword.vue" code lang="vue" -->

```vue [DocsOriginInputShowHidePassword.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Show/hide password input"
      :type="isVisible ? 'text' : 'password'"
      placeholder="••••••••"
    >
      <template #trailingIcon>
        <UiTooltip disable-closing-trigger>
          <UiTooltipTrigger as-child>
            <button
              type="button"
              aria-label="Login password"
              class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              @click="toggleVisibility"
            >
              <Icon :name="isVisible ? 'lucide:eye-off' : 'lucide:eye'" class="size-4" />
            </button>
          </UiTooltipTrigger>
          <UiTooltipContent align="center">
            {{ isVisible ? "Hide" : "Show" }} password
          </UiTooltipContent>
        </UiTooltip>
      </template>
    </UiVeeInput>
  </div>
</template>

<script lang="ts" setup>
  const isVisible = ref(false);
  const toggleVisibility = () => (isVisible.value = !isVisible.value);
</script>
```

<!-- /automd -->

::

### Input with Clear Button

::ShowCase

:DocsOriginInputClearButton

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputClearButton.vue" code lang="vue" -->

```vue [DocsOriginInputClearButton.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput v-model="value" label="Input with clear button" placeholder="Enter a value">
      <template #trailingIcon>
        <UiTooltip disable-closing-trigger>
          <TransitionScale>
            <UiTooltipTrigger v-if="value" as-child>
              <button
                type="button"
                aria-label="Clear input"
                class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                @click="value = ''"
              >
                <Icon name="lucide:circle-x" class="size-4" />
              </button>
            </UiTooltipTrigger>
          </TransitionScale>
          <UiTooltipContent align="center"> Clear </UiTooltipContent>
        </UiTooltip>
      </template>
    </UiVeeInput>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("Click to clear");
</script>
```

<!-- /automd -->

::

### Input with &lt;kbd&gt;

::ShowCase

:DocsOriginInputWithK_D_B

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputWithKDB.vue" code lang="vue" -->

```vue [DocsOriginInputWithKDB.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Search input with &lt;kbd&gt;"
      class="pe-11"
      placeholder="Search..."
      type="search"
    >
      <template #trailingIcon>
        <div
          class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground"
        >
          <UiKbd variant="outline"> ⌘K </UiKbd>
        </div>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Search Input with Icon & Button

::ShowCase

:DocsOriginInputSearchWithIconButton

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputSearchWithIconButton.vue" code lang="vue" -->

```vue [DocsOriginInputSearchWithIconButton.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Search input with icon and button"
      class="peer pe-9"
      placeholder="Search..."
      type="search"
      icon="lucide:search"
    >
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Subscribe"
          class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="lucide:arrow-right" class="size-4" />
        </button>
      </template>
    </UiVeeInput>
  </div>
</template>
```

<!-- /automd -->

::

### Search Input with Loader Icon

::ShowCase

:DocsOriginInputSearchWithLoader

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputSearchWithLoader.vue" code lang="vue" -->

```vue [DocsOriginInputSearchWithLoader.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      v-model.trim="search"
      label="Search input with loader"
      class="peer pe-9"
      placeholder="Search..."
      type="search"
      :icon="!loading ? 'lucide:search' : 'svg-spinners:6-dots-rotate'"
    >
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Start/Stop recording"
          class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          @click="useSonner.success('Recording started!')"
        >
          <Icon name="lucide:mic" class="size-4" />
        </button>
      </template>
    </UiVeeInput>
  </div>
</template>

<script lang="ts" setup>
  const search = ref("");
  const dSearch = refDebounced(search, 300);
  const loading = ref(false);

  const fakeApiCall = async () => {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loading.value = false;
  };

  watch(dSearch, () => {
    fakeApiCall();
  });
</script>
```

<!-- /automd -->

::

### Input with Overlapping Label

::ShowCase

:DocsOriginInputOverlappingLabel

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputOverlappingLabel.vue" code lang="vue" -->

```vue [DocsOriginInputOverlappingLabel.vue]
<template>
  <div class="relative flex items-center justify-center">
    <UiLabel
      for="input-overlapping-label"
      class="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
    >
      Input with overlapping label
    </UiLabel>

    <UiVeeInput id="input-overlapping-label" placeholder="Email" type="email" />
  </div>
</template>
```

<!-- /automd -->

::

### Input with Password Strength Indicator

::ShowCase

:DocsOriginInputPasswordStrengthIndicator

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsOriginInputPasswordStrengthIndicator.vue" code lang="vue" -->

```vue [DocsOriginInputPasswordStrengthIndicator.vue]
<template>
  <div class="flex flex-col">
    <UiVeeInput
      v-model="password"
      label="Input with password strength indicator"
      class="peer pe-9"
      placeholder="Password"
      :type="isVisible ? 'text' : 'password'"
      :aria-invalid="strengthScore < requirements.length"
    >
      <template #trailingIcon>
        <UiTooltip disable-closing-trigger>
          <UiTooltipTrigger as-child>
            <button
              type="button"
              aria-label="Subscribe"
              class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              @click="toggleVisibility"
            >
              <Icon :name="isVisible ? 'lucide:eye-off' : 'lucide:eye'" class="size-4" />
            </button>
          </UiTooltipTrigger>
          <UiTooltipContent align="center">
            {{ isVisible ? "Hide" : "Show" }} password
          </UiTooltipContent>
        </UiTooltip>
      </template>
    </UiVeeInput>

    <div
      class="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
      role="progressbar"
      :aria-valuenow="strengthScore"
      :aria-valuemin="0"
      :aria-valuemax="requirements.length"
      aria-label="Password strength"
    >
      <div
        :class="[`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`]"
        :style="{ width: `${(strengthScore / requirements.length) * 100}%` }"
      />
    </div>

    <p id="password-strength" class="mb-2 text-sm font-medium text-foreground">
      {{ getStrengthText(strengthScore) }}. Must contain:
    </p>

    <ul class="space-y-1.5" aria-label="Password requirements">
      <li v-for="(req, index) in strength" :key="index" class="flex items-center gap-2">
        <Icon
          v-if="req.met"
          name="lucide:check"
          size="16"
          class="text-emerald-500"
          aria-hidden="true"
        />
        <Icon
          v-else
          name="lucide:x"
          size="16"
          class="text-muted-foreground/80"
          aria-hidden="true"
        />
        <span :class="[`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`]">
          {{ req.text }}
          <span class="sr-only">
            {{ req.met ? " - Requirement met" : " - Requirement not met" }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  const password = ref("");
  const isVisible = ref(false);
  const toggleVisibility = () => (isVisible.value = !isVisible.value);

  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];
  const checkStrength = (pass: string) => {
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = computed(() => checkStrength(password.value));
  const strengthScore = computed(() => strength.value.filter((req) => req.met).length);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 3) return "bg-orange-500";
    if (score === 4) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 3) return "Weak password";
    if (score === 4) return "Medium password";
    return "Strong password";
  };
</script>
```

<!-- /automd -->

::
