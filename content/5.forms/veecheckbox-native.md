---
title: Checkbox - Native
description: The native checkbox allows you to do regular checkbox stuff like binding to an array of values.
label: New
---

## Source code

Click :SourceCodeLink{component="Vee/NativeCheckbox.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-native-checkbox
```

## Why?

You may be wondering why this is here. I ran into an issue the other way with how the checkbox from Radix Vue was working with an array of values.

Sadly, I couldn't find a way to make it work with an array of values. So I decided to create a native checkbox that works with an array of values.

## Usage

### Basic

::ShowCase

:DocsVeeNativeCheckboxBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NativeCheckbox/DocsVeeNativeCheckboxBasic.vue" code lang="vue" -->

```vue [DocsVeeNativeCheckboxBasic.vue]
<template>
  <div class="flex justify-center">
    <UiVeeNativeCheckbox />
  </div>
</template>
```

<!-- /automd -->

::

### Indeterminate

::ShowCase

:DocsVeeNativeCheckboxIndeterminate

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NativeCheckbox/DocsVeeNativeCheckboxIndeterminate.vue" code lang="vue" -->

```vue [DocsVeeNativeCheckboxIndeterminate.vue]
<template>
  <div class="flex justify-center">
    <UiVeeNativeCheckbox indeterminate />
  </div>
</template>
```

<!-- /automd -->

::

### Colors

::ShowCase

:DocsVeeNativeCheckboxColors

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NativeCheckbox/DocsVeeNativeCheckboxColors.vue" code lang="vue" -->

```vue [DocsVeeNativeCheckboxColors.vue]
<template>
  <div class="flex flex-wrap justify-center gap-3">
    <UiVeeNativeCheckbox v-for="color in colors" :key="color" :color="color" indeterminate />
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
  ] as const;
</script>
```

<!-- /automd -->

::

### Sizes

::ShowCase

:DocsVeeNativeCheckboxSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NativeCheckbox/DocsVeeNativeCheckboxSizes.vue" code lang="vue" -->

```vue [DocsVeeNativeCheckboxSizes.vue]
<template>
  <div class="flex flex-wrap justify-center gap-3">
    <UiVeeNativeCheckbox v-for="size in sizes" :key="size" :size="size" indeterminate />
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md"] as const;
</script>
```

<!-- /automd -->

::

### Label Only

::ShowCase

:DocsVeeNativeCheckboxLabel

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NativeCheckbox/DocsVeeNativeCheckboxLabel.vue" code lang="vue" -->

```vue [DocsVeeNativeCheckboxLabel.vue]
<template>
  <div class="flex justify-center">
    <UiVeeNativeCheckbox label="Enable Notifications" />
  </div>
</template>
```

<!-- /automd -->

::

### Description Only

::ShowCase

:DocsVeeNativeCheckboxDescription

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NativeCheckbox/DocsVeeNativeCheckboxDescription.vue" code lang="vue" -->

```vue [DocsVeeNativeCheckboxDescription.vue]
<template>
  <div class="flex justify-center">
    <UiVeeNativeCheckbox description="I agree to getting notified via email & SMS" />
  </div>
</template>
```

<!-- /automd -->

::

### Label & Description

::ShowCase

:DocsVeeNativeCheckboxLabelDescription

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NativeCheckbox/DocsVeeNativeCheckboxLabelDescription.vue" code lang="vue" -->

```vue [DocsVeeNativeCheckboxLabelDescription.vue]
<template>
  <div class="flex justify-center">
    <UiVeeNativeCheckbox
      label="Enable Notification"
      description="I agree to getting notified via email & SMS"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Array of Items

::ShowCase

:DocsVeeNativeCheckboxArray

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NativeCheckbox/DocsVeeNativeCheckboxArray.vue" code lang="vue" -->

```vue [DocsVeeNativeCheckboxArray.vue]
<template>
  <form class="mx-auto w-full max-w-sm" @submit="submit">
    <fieldset :disabled="isSubmitting" class="flex flex-col gap-8">
      <UiVeeNativeCheckbox
        name="notifications"
        label="Email"
        description="Get notified via email"
        value="Email"
      />
      <UiVeeNativeCheckbox
        name="notifications"
        label="SMS"
        description="Get notified via SMS"
        value="SMS"
      />
      <UiButton type="submit" :loading="isSubmitting">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { array, object, string } from "yup";
  import type { InferType } from "yup";

  const schema = object({
    notifications: array(string().required().label("Notification type")).min(
      1,
      "At least one notification type is required"
    ),
  });
  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    name: "checkbox-notification",
    validationSchema: schema,
    initialValues: {
      notifications: ["Email"],
    },
  });

  const submit = handleSubmit(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      useSonner.success("Updated Successfully", {
        description: "Your notification settings have been updated",
      });
    } catch (error: any) {
      useSonner.error("An error occurred", {
        duration: 12000,
        description: error.message || "An error occurred",
      });
    }
  });
</script>
```

<!-- /automd -->

::
