---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/switch.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/switch.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Switch"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add switch"}

## Usage

### Basic example

::prose-show-case

:DocsSwitch

#code

<!-- automd:file src="../../app/components/content/Docs/Switch/DocsSwitch.vue" code lang="vue" -->

```vue [DocsSwitch.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="flex items-center space-x-2">
      <UiSwitch id="airplane-mode" />
      <UiLabel for="airplane-mode">Airplane Mode</UiLabel>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Form

::prose-show-case

:DocsSwitchForm

#code

<!-- automd:file src="../../app/components/content/Docs/Switch/DocsSwitchForm.vue" code lang="vue" -->

```vue [DocsSwitchForm.vue]
<template>
  <form @submit="onSubmit">
    <div class="mx-auto grid w-full max-w-xs">
      <Field v-slot="{ value, handleChange }" name="mode">
        <UiFormItem class="flex flex-col">
          <div class="flex items-center gap-3">
            <UiSwitch :model-value="value" @update:model-value="handleChange" />
            <UiFormLabel class="w-auto"> Airplane mode </UiFormLabel>
          </div>
        </UiFormItem>
      </Field>
      <div class="mt-4">
        <UiButton type="submit" size="sm"> Update </UiButton>
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
  import { boolean, object } from "yup";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({
        mode: boolean().label("Airplane Mode"),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    useSonner.success("Mode changed", {
      description: `Airplane mode is ${data.mode ? "on" : "off"}`,
    });
  });
</script>
```

<!-- /automd -->

::

### Origin UI

::prose-show-case

:DocsSwitchOrigin

#code

<!-- automd:file src="../../app/components/content/Docs/Switch/DocsSwitchOrigin.vue" code lang="vue" -->

```vue [DocsSwitchOrigin.vue]
<template>
  <div class="@container">
    <div
      class="grid grid-cols-1 *:flex *:items-center *:justify-center *:p-10 @[450px]:grid-cols-2"
    >
      <div class="inline-flex items-center gap-2">
        <UiSwitch :id="`${id}-simple-switch`" />
        <UiLabel :for="`${id}-simple-switch`" class="sr-only">Simple switch</UiLabel>
      </div>

      <div class="inline-flex items-center gap-2">
        <UiSwitch
          :id="id + 'small-switch'"
          class="h-5 w-8 [&_span]:size-4 data-[state=checked]:[&_span]:translate-x-3 data-[state=checked]:[&_span]:rtl:-translate-x-3"
        />
        <UiLabel :for="id + 'small-switch'" class="sr-only">Small switch</UiLabel>
      </div>

      <div
        class="inline-flex items-center gap-2 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] dark:[--primary:var(--color-indigo-500)] dark:[--ring:var(--color-indigo-900)]"
      >
        <UiSwitch :id="id + 'colored-switch'" :default-value="true" />
        <UiLabel :for="id + 'colored-switch'" class="sr-only">Colored switch</UiLabel>
      </div>

      <div class="inline-flex items-center gap-2">
        <UiSwitch :id="id + 'square-switch'" class="rounded-sm [&_span]:rounded" />
        <UiLabel :for="id + 'square-switch'" class="sr-only">Square switch</UiLabel>
      </div>

      <div class="inline-flex items-center gap-2">
        <UiSwitch
          :id="id + 'm2-style-switch'"
          class="[&_span]:border-input h-3 w-9 border-none outline-offset-[6px] [&_span]:border"
        />
        <UiLabel :for="id + 'm2-style-switch'" class="sr-only">M2-style switch</UiLabel>
      </div>

      <div class="inline-flex items-center gap-2">
        <UiSwitch
          :id="id + 'm3-style-switch'"
          class="data-[state=unchecked]:border-input data-[state=unchecked]:[&_span]:bg-input data-[state=unchecked]:bg-transparent [&_span]:transition-all data-[state=unchecked]:[&_span]:size-4 data-[state=unchecked]:[&_span]:translate-x-0.5 data-[state=unchecked]:[&_span]:shadow-none data-[state=unchecked]:[&_span]:rtl:-translate-x-0.5"
        />
        <UiLabel :for="id + 'm3-style-switch'" class="sr-only">M3-style switch</UiLabel>
      </div>

      <div class="inline-flex items-center gap-2">
        <UiSwitch :id="id + 'on-off-switch'" v-model="checked" aria-label="Toggle switch" />
        <UiLabel :for="id + 'on-off-switch'" class="text-sm font-medium">
          {{ checked ? "On" : "Off" }}
        </UiLabel>
      </div>

      <div
        class="group inline-flex items-center gap-2"
        :data-state="checked ? 'checked' : 'unchecked'"
      >
        <span
          :id="`${id}-off`"
          class="group-data-[state=checked]:text-muted-foreground/70 flex-1 cursor-pointer text-right text-sm font-medium"
          :aria-controls="id"
          @click="checked = false"
        >
          Off
        </span>
        <UiSwitch :id="id" v-model="checked" :aria-labelledby="`${id}-off ${id}-on`" />
        <span
          :id="`${id}-on`"
          class="group-data-[state=unchecked]:text-muted-foreground/70 flex-1 cursor-pointer text-left text-sm font-medium"
          :aria-controls="id"
          @click="checked = true"
        >
          On
        </span>
      </div>

      <div class="inline-flex items-center gap-2">
        <UiSwitch :id="id + 'sun-moon'" v-model="checked" aria-label="Toggle switch" />
        <UiLabel :for="id + 'sun-moon'">
          <span class="sr-only">Toggle switch</span>
          <Icon v-if="checked" name="lucide:sun" :size="16" aria-hidden="true" />
          <Icon v-else name="lucide:moon" :size="16" aria-hidden="true" />
        </UiLabel>
      </div>

      <div
        class="group mx-auto inline-flex w-fit items-center justify-center gap-2"
        :data-state="checked ? 'checked' : 'unchecked'"
      >
        <span
          :id="`${id}-off-2`"
          class="group-data-[state=checked]:text-muted-foreground/70 flex-1 cursor-pointer text-right text-sm font-medium"
          :aria-controls="id"
          @click="checked = false"
        >
          <Icon name="lucide:moon" :size="16" aria-hidden="true" />
        </span>
        <UiSwitch
          :id="id"
          v-model="checked"
          :aria-labelledby="`${id}-off ${id}-on`"
          aria-label="Toggle between dark and light mode"
        />
        <span
          :id="`${id}-on-2`"
          class="group-data-[state=unchecked]:text-muted-foreground/70 flex-1 cursor-pointer text-left text-sm font-medium"
          :aria-controls="id"
          @click="checked = true"
        >
          <Icon name="lucide:sun" :size="16" aria-hidden="true" />
        </span>
      </div>

      <div>
        <div class="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
          <UiSwitch
            :id="id + 'label-inside-switch'"
            v-model="checked"
            class="peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto rounded-md [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
          />
          <span
            class="pointer-events-none relative ms-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full"
          >
            <span class="text-[10px] font-medium uppercase">Off</span>
          </span>
          <span
            class="peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full"
          >
            <span class="text-[10px] font-medium uppercase">On</span>
          </span>
        </div>
        <UiLabel :for="id + 'label-inside-switch'" class="sr-only">Labeled switch</UiLabel>
      </div>

      <div>
        <div
          class="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
        >
          <UiSwitch
            :id="id"
            class="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2 data-[state=checked]:[&_span]:rtl:-translate-x-2"
            :aria-describedby="`${id}-description`"
          />
          <div class="grid grow gap-2">
            <UiLabel :for="id">
              Label
              <span class="text-muted-foreground text-xs leading-[inherit] font-normal">
                (Sublabel)
              </span>
            </UiLabel>
            <p :id="`${id}-description`" class="text-muted-foreground text-xs">
              A short description goes here.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
  const checked = ref(false);
</script>
```

<!-- /automd -->

::
