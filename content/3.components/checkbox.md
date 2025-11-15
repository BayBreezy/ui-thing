---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/checkbox.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/checkbox.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Checkbox"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add checkbox"}

## Usage

### Basic

::ShowCase

:DocsCheckbox

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckbox.vue" code lang="vue" -->

```vue [DocsCheckbox.vue]
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center gap-2">
      <UiCheckbox id="checkbox-terms" v-model="terms" />
      <UiLabel for="checkbox-terms">
        <span class="mt-0.5 ml-2"
          >I agree to the <a href="#" class="text-primary underline">terms and conditions</a></span
        >
      </UiLabel>
    </div>

    <div class="items-top mt-5 flex space-x-2">
      <UiCheckbox id="terms1" v-model="terms1" />
      <div class="mt-0.5 grid gap-1.5 leading-none">
        <UiLabel for="terms1"> Accept terms and conditions </UiLabel>
        <p class="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const terms = ref(false);
  const terms1 = ref(false);
</script>
```

<!-- /automd -->

::

### Default

::ShowCase

:DocsCheckboxDefaultValues

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxDefaultValues.vue" code lang="vue" -->

```vue [DocsCheckboxDefaultValues.vue]
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="items-top mt-5 flex space-x-2">
      <UiCheckbox id="default-value" default-value="indeterminate" />
      <div class="mt-0.5 grid gap-1.5 leading-none">
        <UiLabel for="default-value"> Waiting...</UiLabel>
        <p class="text-sm text-muted-foreground">
          This checkbox will be in the indeterminate state by default.
        </p>
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Shadcn

::ShowCase

:DocsCheckboxShadcn

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxShadcn.vue" code lang="vue" -->

```vue [DocsCheckboxShadcn.vue]
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <UiCheckbox id="terms" />
        <UiLabel for="terms">Accept terms and conditions</UiLabel>
      </div>
      <div class="flex items-start gap-3">
        <UiCheckbox id="terms-2" default-value />
        <div class="grid gap-2">
          <UiLabel for="terms-2">Accept terms and conditions</UiLabel>
          <p class="text-sm text-muted-foreground">
            By clicking this checkbox, you agree to the terms and conditions.
          </p>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <UiCheckbox id="toggle" disabled />
        <UiLabel for="toggle">Enable notifications</UiLabel>
      </div>
      <UiLabel
        class="flex items-start justify-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
      >
        <UiCheckbox
          id="toggle-2"
          default-value="indeterminate"
          class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div class="grid gap-1.5 font-normal">
          <p class="text-sm leading-none font-medium">Enable notifications</p>
          <p class="text-sm text-muted-foreground">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Origin UI

### Simple

::ShowCase

:DocsCheckboxOriginSimple

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginSimple.vue" code lang="vue" -->

```vue [DocsCheckboxOriginSimple.vue]
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center gap-2">
      <UiCheckbox :id="id" />
      <UiLabel :for="id">Simple checkbox</UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
</script>
```

<!-- /automd -->

::

### Indeterminate

::ShowCase

:DocsCheckboxOriginIndeterminate

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginIndeterminate.vue" code lang="vue" -->

```vue [DocsCheckboxOriginIndeterminate.vue]
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center gap-2">
      <UiCheckbox :id="id" default-value="indeterminate" />
      <UiLabel :for="id">Indeterminate checkbox</UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
</script>
```

<!-- /automd -->

::

### Colored

::ShowCase

:DocsCheckboxOriginColored

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginColored.vue" code lang="vue" -->

```vue [DocsCheckboxOriginColored.vue]
<template>
  <div
    class="flex items-center justify-center [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] dark:[--ring:var(--color-indigo-900)]"
  >
    <div class="flex items-center gap-2">
      <UiCheckbox :id="id" default-value />
      <UiLabel :for="id">Colored checkbox</UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
</script>
```

<!-- /automd -->

::

### Disabled

::ShowCase

:DocsCheckboxOriginDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginDisabled.vue" code lang="vue" -->

```vue [DocsCheckboxOriginDisabled.vue]
<template>
  <div class="flex items-center justify-center">
    <div class="flex items-center gap-2">
      <UiCheckbox :id="id" disabled />
      <UiLabel :for="id">Disabled checkbox</UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
</script>
```

<!-- /automd -->

::

### Line Through

::ShowCase

:DocsCheckboxOriginLineThrough

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginLineThrough.vue" code lang="vue" -->

```vue [DocsCheckboxOriginLineThrough.vue]
<template>
  <div class="flex items-center justify-center">
    <div class="flex items-center gap-2">
      <UiCheckbox :id="id" default-value />
      <UiLabel :for="id" class="peer-data-[state=checked]:line-through">Simple todo item</UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
</script>
```

<!-- /automd -->

::

### Fancy Todo

::ShowCase

:DocsCheckboxOriginFancyTodo

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginFancyTodo.vue" code lang="vue" -->

```vue [DocsCheckboxOriginFancyTodo.vue]
<template>
  <div class="flex items-center justify-center">
    <div class="flex items-center gap-2 [--primary:var(--color-emerald-500)]">
      <UiCheckbox :id class="rounded-full" default-value />
      <UiLabel
        :for="id"
        class="relative peer-data-[state=checked]:text-muted-foreground after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:bg-muted-foreground after:transition-transform after:duration-500 after:ease-in-out peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
      >
        Fancy todo item
      </UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
</script>
```

<!-- /automd -->

::

### Frameworks (Group Checkbox)

::ShowCase

:DocsCheckboxOriginGroupFrameworks

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginGroupFrameworks.vue" code lang="vue" -->

```vue [DocsCheckboxOriginGroupFrameworks.vue]
<template>
  <div class="flex items-center justify-center">
    <UiCheckboxGroup v-model="selectedFrameworks" class="flex items-center gap-6">
      <div v-for="item in frameworks" :key="item.value" class="flex items-center gap-2">
        <UiCheckbox :id="item.value" :value="item.value" />
        <UiLabel :for="item.value">
          {{ item.name }}
        </UiLabel>
      </div>
    </UiCheckboxGroup>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();

  const frameworks = [
    {
      name: "Vue",
      value: `${id}-vue`,
    },
    {
      name: "Nuxt",
      value: `${id}-nuxt`,
    },
    {
      name: "React",
      value: `${id}-react`,
    },
  ];
  const selectedFrameworks = ref([`${id}-vue`, `${id}-nuxt`]);
</script>
```

<!-- /automd -->

::

### Frameworks (Group Checkbox - Vertical)

::ShowCase

:DocsCheckboxOriginGroupVertical

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginGroupVertical.vue" code lang="vue" -->

```vue [DocsCheckboxOriginGroupVertical.vue]
<template>
  <div class="flex items-center justify-center">
    <UiCheckboxGroup v-model="selectedFrameworks" orientation="vertical" class="grid gap-3">
      <div v-for="item in frameworks" :key="item.value" class="flex items-center gap-2">
        <UiCheckbox :id="item.value" :value="item.value" />
        <UiLabel :for="item.value">
          {{ item.name }}
        </UiLabel>
      </div>
    </UiCheckboxGroup>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();

  const frameworks = [
    {
      name: "Vue",
      value: `${id}-vue`,
    },
    {
      name: "Nuxt",
      value: `${id}-nuxt`,
    },
    {
      name: "React",
      value: `${id}-react`,
    },
  ];
  const selectedFrameworks = ref([`${id}-vue`, `${id}-nuxt`]);
</script>
```

<!-- /automd -->

::

### Checkbox with Description

::ShowCase

:DocsCheckboxOriginDescription

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginDescription.vue" code lang="vue" -->

```vue [DocsCheckboxOriginDescription.vue]
<template>
  <div class="mx-auto flex max-w-[350px] flex-col items-center justify-center gap-10">
    <div class="flex items-start gap-2">
      <UiCheckbox :id="id" :aria-describedby="`${id}-description`" />
      <div class="grid grow gap-2">
        <UiLabel :for="id" hint="(Sublabel)" class="justify-start"> Label </UiLabel>
        <p :id="`${id}-description`" class="text-xs text-muted-foreground">
          You can use this checkbox with a label and a description.
        </p>
      </div>
    </div>

    <div class="flex items-start gap-2">
      <UiCheckbox :id="id2" :aria-describedby="`${id2}-description`" class="order-1" />
      <div class="grid grow gap-2">
        <UiLabel :for="id2" hint="(Sublabel)" class="justify-start"> Label </UiLabel>
        <p :id="`${id2}-description`" class="text-xs text-muted-foreground">
          You can use this checkbox with a label and a description.
        </p>
      </div>
    </div>

    <div
      class="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
    >
      <UiCheckbox
        :id="id3"
        :aria-describedby="`${id3}-description`"
        class="order-1 after:absolute after:inset-0"
      />
      <div class="grid grow gap-2">
        <UiLabel :for="id3" hint="(Sublabel)" class="justify-start"> Label </UiLabel>
        <p :id="`${id3}-description`" class="text-xs text-muted-foreground">
          A short description goes here
        </p>
      </div>
    </div>

    <div
      class="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
    >
      <UiCheckbox
        :id="id4"
        class="order-1 after:absolute after:inset-0"
        :aria-describedby="`${id4}-description`"
      />
      <div class="flex grow items-start gap-3">
        <Icon name="logos:mastercard" class="size-6" />
        <div class="grid gap-2">
          <UiLabel :for="id4" hint="(Sublabel)" class="justify-start"> Label </UiLabel>
          <p :id="`${id4}-description`" class="text-xs text-muted-foreground">
            A short description goes here.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
  const id2 = useId();
  const id3 = useId();
  const id4 = useId();
</script>
```

<!-- /automd -->

::

### Selections

::ShowCase

:DocsCheckboxOriginOptions

#code

<!-- automd:file src="../../app/components/content/Docs/Checkbox/DocsCheckboxOriginOptions.vue" code lang="vue" -->

```vue [DocsCheckboxOriginOptions.vue]
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="mx-auto flex w-full max-w-[350px] flex-col justify-center gap-10">
    <UiCheckboxGroup class="grid w-full grid-cols-2 gap-3">
      <div
        v-for="item in options"
        :key="`${id}-${item.value}`"
        class="relative flex cursor-pointer flex-col gap-4 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
      >
        <div class="flex justify-between gap-2">
          <UiCheckbox
            :id="`${id}-${item.value}`"
            :value="item.value"
            class="order-1 after:absolute after:inset-0"
          />
          <Icon :name="item.icon" class="size-4 opacity-60" aria-hidden="true" />
        </div>
        <UiLabel :for="`${id}-${item.value}`">{{ item.label }}</UiLabel>
      </div>
    </UiCheckboxGroup>

    <fieldset class="space-y-4">
      <legend class="text-sm leading-none font-medium text-foreground">Days of the week</legend>
      <UiCheckboxGroup v-model="selectedDays" class="flex gap-1.5">
        <label
          v-for="item in items"
          :key="`${id}-${item.value}`"
          class="relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-full border border-input text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground"
        >
          <UiCheckbox
            :id="`${id}-${item.value}`"
            :value="item.value"
            class="sr-only after:absolute after:inset-0"
            :disabled="item.disabled"
          />
          <span aria-hidden="true" class="text-sm font-medium"> {{ item.label[0] }} </span>
          <span class="sr-only">{{ item.label }}</span>
        </label>
      </UiCheckboxGroup>
    </fieldset>

    <div class="space-y-4">
      <legend class="text-sm leading-none font-medium text-foreground">
        Dark mode toggle checkbox
      </legend>
      <div class="flex flex-col justify-center">
        <input
          :id="darkModeId"
          type="checkbox"
          :name="darkModeId"
          class="peer sr-only"
          :checked="colorMode.value == 'dark'"
          @change="colorMode.preference = colorMode.value == 'dark' ? 'light' : 'dark'"
        />
        <label
          class="group relative inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background text-foreground shadow-xs transition-[color,box-shadow] outline-none peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 hover:bg-accent hover:text-accent-foreground"
          :for="darkModeId"
          :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
        >
          <Icon
            name="lucide:moon"
            class="size-4 shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
            aria-hidden="true"
          />
          <Icon
            name="lucide:sun-medium"
            class="absolute size-4 shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
            aria-hidden="true"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
  const darkModeId = useId();

  const colorMode = useColorMode();

  const options = [
    { label: "Palette", icon: "lucide:swatch-book", value: useId() },
    { label: "Brush", icon: "lucide:brush", value: useId() },
    { label: "Eraser", icon: "lucide:eraser", value: useId() },
    { label: "Cut", icon: "lucide:scissors", value: useId() },
  ];

  const items = [
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
    { value: "7", label: "Sunday", disabled: true },
  ];

  const selectedDays = ref(["1", "2", "4", "5"]);
</script>
```

<!-- /automd -->

::
