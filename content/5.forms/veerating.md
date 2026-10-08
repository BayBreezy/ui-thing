---
title: VeeRating
description: A rating component that uses the composition API provided by Vee-Validate to perform validation.
label: New
links:
  - title: Rating Source
    href: /components/rating
    icon: lucide:star
---

## Source code

Click :SourceCodeLink{component="Vee/Rating.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-rating"}

## Usage

`UiVeeRating` wraps [`UiRating`](/components/rating) with a label, hint and animated error message, and registers the value with the surrounding Vee-Validate form. It is always editable. Any other prop (`max-rating`, `step`, `clearable`, `icon`, `size`, `show-value`, `filled-icon-class-name`, ...) is forwarded to `UiRating`.

### Basic example

A rating starts at `0` (nothing selected). Validate it with `min(1)` (or `min(0.5)` when using half stars) to make it required. The `required` prop only adds the asterisk and `aria-required`; the schema is what enforces it.

::prose-show-case

:DocsVeeRating

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Rating/DocsVeeRating.vue" code lang="vue" -->

```vue [DocsVeeRating.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeRating
        name="rating"
        label="How was your experience?"
        hint="Tap a star to rate us."
        required
      />
      <UiButton :loading="isSubmitting" type="submit"> Submit rating </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { number, object } from "yup";

  const schema = object({
    rating: number()
      .label("Rating")
      .required("Please select a rating")
      .min(1, "Please select a rating")
      .max(5),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Thanks for your feedback", {
      description: `You rated us ${values.rating} out of 5.`,
    });
  });
</script>
```

<!-- /automd -->

::

### Default value

Use `v-model` or `initialValues` to set an initial rating. Set `step` to `0.5` to allow half stars.

::prose-show-case

:DocsVeeRatingDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Rating/DocsVeeRatingDefault.vue" code lang="vue" -->

```vue [DocsVeeRatingDefault.vue]
<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md space-y-4">
      <UiVeeRating
        v-model="rating"
        name="quality"
        label="Product quality"
        hint="Half stars are supported."
        :step="0.5"
        show-value
      />
      <p class="text-muted-foreground text-sm">
        Current value:
        <span class="text-foreground font-medium">{{ rating }}</span>
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
  const rating = ref(3.5);
</script>
```

<!-- /automd -->

::

### Clearable and custom icon

Set `clearable` to let users click the current value again to reset it to `0`. This is useful for optional ratings. Use `icon`, `size` and the `*-class-name` props to restyle the stars.

::prose-show-case

:DocsVeeRatingClearable

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Rating/DocsVeeRatingClearable.vue" code lang="vue" -->

```vue [DocsVeeRatingClearable.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset class="space-y-5">
      <UiVeeRating
        name="satisfaction"
        label="Support satisfaction"
        label-hint="Optional"
        hint="Click the selected star again to clear your rating."
        icon="lucide:heart"
        filled-icon-class-name="fill-red-500 text-red-500"
        empty-icon-class-name="text-red-500/30"
        size="lg"
        clearable
      />
      <UiButton type="submit"> Save </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { number, object } from "yup";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({
        // Optional: clearing the rating sets the value back to 0.
        satisfaction: number().label("Satisfaction").min(0).max(5),
      })
    ),
    initialValues: {
      satisfaction: 4,
    },
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", {
      description: values.satisfaction
        ? `Satisfaction set to ${values.satisfaction} out of 5.`
        : "No rating provided.",
    });
  });
</script>
```

<!-- /automd -->

::

### Disabled

::prose-show-case

:DocsVeeRatingDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Rating/DocsVeeRatingDisabled.vue" code lang="vue" -->

```vue [DocsVeeRatingDisabled.vue]
<template>
  <div class="mx-auto max-w-md">
    <UiVeeRating
      v-model="rating"
      name="locked"
      label="Your previous rating"
      hint="Ratings can no longer be changed after 30 days."
      disabled
    />
  </div>
</template>

<script lang="ts" setup>
  const rating = ref(4);
</script>
```

<!-- /automd -->

::

### Review form

::prose-show-case

:DocsVeeRatingReview

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Rating/DocsVeeRatingReview.vue" code lang="vue" -->

```vue [DocsVeeRatingReview.vue]
<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md" @submit="onSubmit">
      <UiCard class="">
        <UiCardHeader>
          <UiCardTitle>Write a review</UiCardTitle>
          <UiCardDescription>Tell others what you think about this product.</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-5">
          <UiVeeRating name="rating" label="Overall rating" size="lg" :step="0.5" required />
          <UiVeeInput name="title" label="Review title" placeholder="Sum it up in a few words" />
          <UiVeeTextarea
            name="comment"
            label="Your review"
            hint="Minimum 20 characters."
            placeholder="What did you like or dislike?"
          />
        </UiCardContent>

        <UiCardFooter>
          <UiButton type="button" variant="ghost" @click="resetForm()">Reset</UiButton>
          <UiButton :loading="isSubmitting" type="submit">Post review</UiButton>
        </UiCardFooter>
      </UiCard>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { number, object, string } from "yup";

  const schema = object({
    rating: number()
      .label("Rating")
      .required("Please select a rating")
      .min(0.5, "Please select a rating")
      .max(5),
    title: string().label("Title").required().min(3).max(60).trim(),
    comment: string().label("Review").required().min(20).max(500).trim(),
  });

  const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Review posted", {
      description: `"${values.title}" - ${values.rating} out of 5 stars.`,
    });
    resetForm();
  });
</script>
```

<!-- /automd -->

::

## Props

| Prop               | Type                  | Description                                                                  |
| ------------------ | --------------------- | ---------------------------------------------------------------------------- |
| `name`             | `string`              | Field name registered with Vee-Validate. Falls back to a generated id.       |
| `label`            | `string`              | Label shown above the rating.                                                |
| `label-hint`       | `string`              | Extra hint shown next to the label.                                          |
| `hint`             | `string`              | Helper text. Hidden while there is an error.                                 |
| `rules`            | `any`                 | Vee-Validate rules (or use a schema on `useForm`).                           |
| `v-model`          | `number`              | Current rating.                                                              |
| `required`         | `boolean`             | Shows the required asterisk and sets `aria-required`.                        |
| `disabled`         | `boolean`             | Prevents interaction.                                                        |
| `validate-on-mount`| `boolean`             | Validates as soon as the field mounts.                                       |
| `class`            | `HTMLAttributes["class"]` | Classes for the wrapper element.                                         |

The `label`, `hint` and `errorMessage` slots are available for custom markup and receive `error-message` and `value`.

## Accessibility

The rating is exposed as a labelled group containing a radio group, so it supports keyboard navigation (`Tab` to focus, arrow keys to move between stars, `Space` to select). The label, hint and error message are linked with `aria-labelledby` and `aria-describedby`, and the group is marked `aria-invalid` when validation fails. The field is marked as touched once focus leaves the rating. Like the other Vee components, errors are shown after a value change or on submit.
