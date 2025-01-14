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

::ShowCase

:DocsVeeCheckbox

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckbox.vue" code lang="vue" -->

```vue [DocsVeeCheckbox.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
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
      success: (_) => `We will be sending you ${values.drinks.join(", ")} soon!`,
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

<!-- /automd -->

::

### Single checkbox

::ShowCase

:DocsVeeCheckboxSingle

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxSingle.vue" code lang="vue" -->

```vue [DocsVeeCheckboxSingle.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
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

  const onSubmit = handleSubmit(async (_) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Starting the process...",
      success: (_) => `We will begin the process now`,
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

<!-- /automd -->

::

### Default Value

We can use the `v-model` prop to set the default value of the VeeCheckbox.

::ShowCase

:DocsVeeCheckboxDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxDefault.vue" code lang="vue" -->

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

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/checks-radios-switches). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Colored Checkbox

::ShowCase

:DocsVeeCheckboxColored

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxColored.vue" code lang="vue" -->

```vue [DocsVeeCheckboxColored.vue]
<template>
  <div
    class="flex justify-center"
    :style="{
      '--primary': '238.7 83.5% 66.7%',
      '--ring': '238.7 83.5% 66.7%',
    }"
  >
    <UiVeeCheckbox :model-value="true" label="Colored checkbox" />
  </div>
</template>
```

<!-- /automd -->

::

### Simple Todo

::ShowCase

:DocsVeeCheckboxSimpleTodo

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxSimpleTodo.vue" code lang="vue" -->

```vue [DocsVeeCheckboxSimpleTodo.vue]
<template>
  <div class="flex justify-center">
    <UiVeeCheckbox id="checkbox-05" class="peer" :model-value="true" />
    <UiLabel for="checkbox-05" class="peer-has-[button[data-state=checked]]:line-through">
      Simple todo item
    </UiLabel>
  </div>
</template>
```

<!-- /automd -->

::

### Fancy Todo

::ShowCase

:DocsVeeCheckboxFancyTodo

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxFancyTodo.vue" code lang="vue" -->

```vue [DocsVeeCheckboxFancyTodo.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeCheckbox
      id="checkbox-06"
      class="peer [&_[data-state=checked]]:border-emerald-500 [&_[data-state=checked]]:bg-emerald-500 [&_button]:rounded-full [&_button]:border-border [&_button_span]:rounded-full"
      :model-value="true"
    />
    <UiLabel
      for="checkbox-06"
      class="relative after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:bg-muted-foreground after:transition-transform after:ease-in-out peer-has-[button[data-state=checked]]:text-muted-foreground peer-has-[button[data-state=checked]]:line-through peer-has-[button[data-state=checked]]:after:scale-x-100"
    >
      Fancy todo item
    </UiLabel>
  </div>
</template>
```

<!-- /automd -->

::

### Terms of Service

::ShowCase

:DocsVeeCheckboxTerms

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxTerms.vue" code lang="vue" -->

```vue [DocsVeeCheckboxTerms.vue]
<template>
  <div class="flex items-center justify-center gap-2">
    <UiVeeCheckbox id="checkbox-07">
      <template #label>
        <UiLabel for="checkbox-07">
          I agree to the
          <a class="underline" href="https://google.com" target="_blank"> terms of service </a>
        </UiLabel>
      </template>
    </UiVeeCheckbox>
  </div>
</template>
```

<!-- /automd -->

::

### Frameworks

::ShowCase

:DocsVeeCheckboxFrameworks

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxFrameworks.vue" code lang="vue" -->

```vue [DocsVeeCheckboxFrameworks.vue]
<template>
  <div class="flex justify-center gap-6">
    <UiVeeCheckbox
      v-for="framework in frameworks"
      :key="framework"
      class="[&_button]:border-border"
      :label="framework"
    />
  </div>
</template>

<script lang="ts" setup>
  const frameworks = ["Vue", "Nuxt", "Svelte"];
</script>
```

<!-- /automd -->

::

### Right Aligned

::ShowCase

:DocsVeeCheckboxRightAligned

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxRightAligned.vue" code lang="vue" -->

```vue [DocsVeeCheckboxRightAligned.vue]
<template>
  <div className="flex items-center justify-between gap-2 max-w-sm mx-auto">
    <UiLabel for="checkbox-09">Right aligned checkbox</UiLabel>
    <UiVeeCheckbox id="checkbox-09" />
  </div>
</template>
```

<!-- /automd -->

::

### Label w/ Sublabel

::ShowCase

:DocsVeeCheckboxLabelSublabel

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxLabelSublabel.vue" code lang="vue" -->

```vue [DocsVeeCheckboxLabelSublabel.vue]
<template>
  <div class="flex justify-center">
    <UiVeeCheckbox
      id="checkbox-10"
      hint="You can use this checkbox with a label and a description."
    >
      <template #label>
        <UiLabel for="checkbox-10" class="justify-start gap-2">
          Label
          <span class="text-xs font-normal leading-[inherit] text-muted-foreground">
            (Sublabel)
          </span>
        </UiLabel>
      </template>
    </UiVeeCheckbox>
  </div>
</template>
```

<!-- /automd -->

::

### Input Expansion

::ShowCase

:DocsVeeCheckboxInputExpansion

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxInputExpansion.vue" code lang="vue" -->

```vue [DocsVeeCheckboxInputExpansion.vue]
<template>
  <div class="mx-auto flex max-w-sm flex-col items-start">
    <div>
      <UiVeeCheckbox
        id="checkbox-11"
        v-model="open"
        label="Checkbox with expansion"
        aria-controls="checkbox-input-11"
      />
      <p class="ml-[30px] text-xs text-muted-foreground">
        Check the <span class="font-semibold">Checkbox</span> to expand the input field.
      </p>
    </div>
    <TransitionExpand>
      <UiVeeInput v-if="open" class="mt-5" placeholder="Enter your text here" />
    </TransitionExpand>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(false);
</script>
```

<!-- /automd -->

::

### Right Aligned w/ Sublabel

::ShowCase

:DocsVeeCheckboxRightAlignedSublabel

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxRightAlignedSublabel.vue" code lang="vue" -->

```vue [DocsVeeCheckboxRightAlignedSublabel.vue]
<template>
  <div class="mx-auto flex max-w-sm items-start gap-2">
    <div class="grid grow gap-2">
      <UiLabel for="checkbox-12" class="justify-start gap-2">
        Label
        <span class="text-xs font-normal leading-[inherit] text-muted-foreground">
          (Sublabel)
        </span>
      </UiLabel>
      <p id="checkbox-12-description" class="text-xs text-muted-foreground">
        You can use this checkbox with a label and a description.
      </p>
    </div>
    <UiVeeCheckbox id="checkbox-12" aria-describedby="checkbox-12-description" />
  </div>
</template>
```

<!-- /automd -->

::

### Right Aligned w/ Sublabel Bordered

::ShowCase

:DocsVeeCheckboxRightAlignedSublabelBorder

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxRightAlignedSublabelBorder.vue" code lang="vue" -->

```vue [DocsVeeCheckboxRightAlignedSublabelBorder.vue]
<template>
  <div
    class="relative mx-auto flex w-full max-w-sm items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[div_button[data-state=checked]]:border-ring"
  >
    <div class="grid grow gap-2">
      <UiLabel for="checkbox-13" class="justify-start gap-2">
        Label
        <span class="text-xs font-normal leading-[inherit] text-muted-foreground">
          (Sublabel)
        </span>
      </UiLabel>
      <p id="checkbox-13-description" class="text-xs text-muted-foreground">
        A short description goes here.
      </p>
    </div>
    <UiVeeCheckbox id="checkbox-13" aria-describedby="checkbox-13-description" />
  </div>
</template>
```

<!-- /automd -->

::

### Grid Box

::ShowCase

:DocsVeeCheckboxGridBox

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxGridBox.vue" code lang="vue" -->

```vue [DocsVeeCheckboxGridBox.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm justify-center">
    <div class="grid w-full grid-cols-2 gap-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="relative flex cursor-pointer flex-col gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
      >
        <div class="flex justify-between gap-2">
          <UiVeeCheckbox
            :id="item.id"
            :value="item.value"
            :model-value="item.defaultChecked ? item.value : null"
            class="order-1"
          />
          <Icon :name="item.icon" class="size-4 shrink-0 opacity-60" aria-hidden="true" />
        </div>
        <UiLabel class="after:absolute after:inset-0" :for="item.id">{{ item.label }}</UiLabel>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: "checkbox-16-c1",
      value: "c1",
      label: "Palette",
      icon: "lucide:swatch-book",
      defaultChecked: true,
    },
    { id: "checkbox-16-c2", value: "c2", label: "Brush", icon: "lucide:brush" },
    { id: "checkbox-16-c3", value: "c3", label: "Eraser", icon: "lucide:eraser" },
    { id: "checkbox-16-c4", value: "c4", label: "Cut", icon: "lucide:scissors" },
  ];
</script>
```

<!-- /automd -->

::

### Days of the Week

::ShowCase

:DocsVeeCheckboxDaysOfTheWeek

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxDaysOfTheWeek.vue" code lang="vue" -->

```vue [DocsVeeCheckboxDaysOfTheWeek.vue]
<template>
  <div class="flex justify-center">
    <fieldset class="space-y-4">
      <legend class="text-sm font-medium leading-none text-foreground">Days of the week</legend>
      <div class="flex gap-1.5">
        <label
          v-for="item in items"
          :key="item.id"
          class="relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-full border border-input text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
        >
          <UiVeeCheckbox
            :id="item.id"
            :model-value="item.defaultChecked ? item.value : null"
            :value="item.value"
            class="sr-only"
            name="days"
            :disabled="item.disabled"
          />
          <span aria-hidden="true" class="text-sm font-medium">
            {{ item.label[0] }}
          </span>
          <span class="sr-only">{{ item.label }}</span>
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { id: "checkbox-18-c1", value: "c1", label: "Monday", defaultChecked: true },
    { id: "checkbox-18-c2", value: "c2", label: "Tuesday", defaultChecked: true },
    { id: "checkbox-18-c3", value: "c3", label: "Wednesday" },
    { id: "checkbox-18-c4", value: "c4", label: "Thursday", defaultChecked: true },
    { id: "checkbox-18-c5", value: "c5", label: "Friday", defaultChecked: true },
    { id: "checkbox-18-c6", value: "c6", label: "Saturday" },
    { id: "checkbox-18-c7", value: "c7", label: "Sunday", disabled: true },
  ];
</script>
```

<!-- /automd -->

::
