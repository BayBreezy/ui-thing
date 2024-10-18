---
title: VeeCheckbox
description: A checkbox component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Checkbox Source
    href: /components/checkbox
    icon: lucide:check-square
---

## Source code

Click :SourceCodeLink{component="Vee/Checkbox.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-checkbox
```

## Usage

### Grouping checkboxes

Checkboxes can be tricky to implement with validation libraries. Luckily, Vee-Validate takes care of the heavy lifting for us. Take a look at the [`Building Checkboxes Docs`](https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs/#building-checkboxes) for more information on how this works.

::ShowCase{component="DocsVeeCheckbox"}

#code

```vue [DocsVeeCheckbox.vue]
<template>
  <form @submit="onSubmit" class="mx-auto max-w-md">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeCheckbox name="drinks" value="coffee" label="Coffee" hint="I love coffee" />
      <UiVeeCheckbox name="drinks" value="tea" label="Tea" hint="I love tea" />
      <UiVeeCheckbox name="drinks" value="water" label="Water" hint="I love water" />
      <UiButton type="submit"> Order now </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const required_error = "Please select at least one drink";

  const schema = z.object({
    drinks: z.array(z.string({ required_error }), { required_error }).min(1, required_error),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Sending order details...",
      success: (d) => `We will be sending you ${values.drinks.join(", ")} soon!`,
      error: (e) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

::

### Single checkbox

::ShowCase{component="DocsVeeCheckboxSingle"}

#code

```vue [DocsVeeCheckboxSingle.vue]
<template>
  <form @submit="onSubmit" class="mx-auto max-w-md">
    <p class="font-semibold">Terms of Service</p>
    <p class="mb-4 mt-2 text-sm text-muted-foreground">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, perspiciatis sunt, quae
      architecto, dicta nobis corrupti commodi tempora asperiores eligendi id dolore dolores.
      Dolores quaerat architecto in sapiente expedita cum?
    </p>
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeCheckbox name="terms" label="I agree to the terms of service" />
      <UiButton type="submit"> Continue </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    terms: z.boolean({ required_error: "You must agree to the terms of service" }),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Starting the process...",
      success: (d) => `We will begin the process now`,
      error: (e) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

::

### Default Value

We can use the `v-model` prop to set the default value of the VeeCheckbox.

::ShowCase{component="DocsVeeCheckboxDefault"}

#code

```vue [DocsVeeCheckboxDefault.vue]
<template>
  <div class="flex items-center justify-center">
    <form class="mx-auto max-w-md">
      <p class="font-semibold">On by default</p>
      <p class="mb-4 mt-2 text-sm text-muted-foreground">This checkbox will be true by default.</p>
      <fieldset class="space-y-5">
        <UiVeeCheckbox v-model="someVariable" name="terms" label="I will be on by default" />
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts" setup>
  const someVariable = ref(true);
</script>
```

::
