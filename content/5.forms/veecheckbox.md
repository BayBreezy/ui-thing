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

:prose-pm-x{command="ui-thing@latest add vee-checkbox"}

## Usage

### Grouping checkboxes

Checkboxes can be tricky to implement with validation libraries. Luckily, Vee-Validate takes care of the heavy lifting for us. Take a look at the [`Building Checkboxes Docs`](https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs/#building-checkboxes) for more information on how this works.

::prose-show-case

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
      <UiButton :loading="isSubmitting" type="submit"> Order now </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { array, object, string } from "yup";

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      object({
        drinks: array()
          .min(1, "Please select at least one drink")
          .label("Drinks")
          .required()
          .of(string()),
      })
    ),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(2000); // Simulate a network request
    useSonner.success("Order Complete", {
      description: () => `We will be sending you ${values.drinks.join(", ")} soon!`,
    });
  });
</script>
```

<!-- /automd -->

::

### Single checkbox

::prose-show-case

:DocsVeeCheckboxSingle

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxSingle.vue" code lang="vue" -->

```vue [DocsVeeCheckboxSingle.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <p class="font-semibold">Terms of Service</p>
    <p class="text-muted-foreground mt-2 mb-4 text-sm">
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
  import { boolean, object } from "yup";

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      object({
        terms: boolean().label("Terms of Service").required().is([true]),
      })
    ),
  });

  const onSubmit = handleSubmit(async (_) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Starting the process...",
      success: () => `We will begin the process now`,
      error: () => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

<!-- /automd -->

::

### Default Value

We can use the `v-model` prop to set the default value of the VeeCheckbox.

::prose-show-case

:DocsVeeCheckboxDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxDefault.vue" code lang="vue" -->

```vue [DocsVeeCheckboxDefault.vue]
<template>
  <div class="flex items-center justify-center">
    <form class="mx-auto max-w-md">
      <p class="font-semibold">On by default</p>
      <p class="text-muted-foreground mt-2 mb-4 text-sm">This checkbox will be true by default.</p>
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

::prose-show-case

:DocsVeeCheckboxColored

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxColored.vue" code lang="vue" -->

```vue [DocsVeeCheckboxColored.vue]
<template>
  <div
    class="flex justify-center [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] dark:[--ring:var(--color-indigo-900)]"
  >
    <UiVeeCheckbox :model-value="true" label="Colored checkbox" />
  </div>
</template>
```

<!-- /automd -->

::

### Simple Todo

::prose-show-case

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

::prose-show-case

:DocsVeeCheckboxFancyTodo

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxFancyTodo.vue" code lang="vue" -->

```vue [DocsVeeCheckboxFancyTodo.vue]
<template>
  <div class="flex items-center justify-center">
    <UiVeeCheckbox
      id="checkbox-06"
      class="peer [&_button]:border-border [&_[data-state=checked]]:border-emerald-500 [&_[data-state=checked]]:bg-emerald-500 [&_button]:rounded-full [&_button_span]:rounded-full"
      :model-value="true"
    />
    <UiLabel
      for="checkbox-06"
      class="peer-has-[button[data-state=checked]]:text-muted-foreground after:bg-muted-foreground relative peer-has-[button[data-state=checked]]:line-through after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:transition-transform after:ease-in-out peer-has-[button[data-state=checked]]:after:scale-x-100"
    >
      Fancy todo item
    </UiLabel>
  </div>
</template>
```

<!-- /automd -->

::

### Terms of Service

::prose-show-case

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

::prose-show-case

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

::prose-show-case

:DocsVeeCheckboxRightAligned

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxRightAligned.vue" code lang="vue" -->

```vue [DocsVeeCheckboxRightAligned.vue]
<template>
  <div class="mx-auto flex max-w-sm items-center justify-between gap-2">
    <UiLabel for="checkbox-09">Right aligned checkbox</UiLabel>
    <UiVeeCheckbox id="checkbox-09" />
  </div>
</template>
```

<!-- /automd -->

::

### Label w/ Sublabel

::prose-show-case

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
          <span class="text-muted-foreground text-xs leading-[inherit] font-normal">
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

::prose-show-case

:DocsVeeCheckboxInputExpansion

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxInputExpansion.vue" code lang="vue" -->

```vue [DocsVeeCheckboxInputExpansion.vue]
<template>
  <div class="mx-auto flex max-w-sm flex-col items-start gap-5">
    <div>
      <UiVeeCheckbox
        id="checkbox-11"
        v-model="open"
        label="Checkbox with expansion"
        aria-controls="checkbox-input-11"
      />
      <p class="text-muted-foreground ml-[30px] text-xs">
        Check the <span class="font-semibold">Checkbox</span> to expand the input field.
      </p>
    </div>
    <AnimatePresence as="div" class="w-full">
      <motion.div
        v-if="open"
        :exit="{ opacity: 0, height: 0 }"
        :initial="{ opacity: 0, height: 0 }"
        :animate="{ opacity: 1, height: 'auto' }"
      >
        <UiInput autofocus class="w-full" placeholder="Enter your text here" />
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script lang="ts" setup>
  import { motion } from "motion-v";

  const open = ref(false);
</script>
```

<!-- /automd -->

::

### Right Aligned w/ Sublabel

::prose-show-case

:DocsVeeCheckboxRightAlignedSublabel

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxRightAlignedSublabel.vue" code lang="vue" -->

```vue [DocsVeeCheckboxRightAlignedSublabel.vue]
<template>
  <div class="mx-auto flex max-w-sm items-start gap-2">
    <div class="grid grow gap-2">
      <UiLabel for="checkbox-12" class="justify-start gap-2">
        Label
        <span class="text-muted-foreground text-xs leading-[inherit] font-normal">
          (Sublabel)
        </span>
      </UiLabel>
      <p id="checkbox-12-description" class="text-muted-foreground text-xs">
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

::prose-show-case

:DocsVeeCheckboxRightAlignedSublabelBorder

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxRightAlignedSublabelBorder.vue" code lang="vue" -->

```vue [DocsVeeCheckboxRightAlignedSublabelBorder.vue]
<template>
  <div
    class="border-input has-[div_button[data-state=checked]]:border-ring relative mx-auto flex w-full max-w-sm items-start gap-2 rounded-lg border p-4 shadow-xs shadow-black/5"
  >
    <div class="grid grow gap-2">
      <UiLabel for="checkbox-13" class="justify-start gap-2">
        Label
        <span class="text-muted-foreground text-xs leading-[inherit] font-normal">
          (Sublabel)
        </span>
      </UiLabel>
      <p id="checkbox-13-description" class="text-muted-foreground text-xs">
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

::prose-show-case

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
        class="border-input has-[[data-state=checked]]:border-ring relative flex cursor-pointer flex-col gap-4 rounded-lg border p-4 shadow-xs shadow-black/5"
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

::prose-show-case

:DocsVeeCheckboxDaysOfTheWeek

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Checkbox/DocsVeeCheckboxDaysOfTheWeek.vue" code lang="vue" -->

```vue [DocsVeeCheckboxDaysOfTheWeek.vue]
<template>
  <div class="flex justify-center">
    <fieldset class="space-y-4">
      <legend class="text-foreground text-sm leading-none font-medium">Days of the week</legend>
      <div class="flex gap-1.5">
        <label
          v-for="item in items"
          :key="item.id"
          class="border-input has-[:focus-visible]:outline-ring/70 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-full border text-center shadow-xs shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50"
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
