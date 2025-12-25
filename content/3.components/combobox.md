---
title: Combobox
description: Autocomplete input and command palette with a list of suggestions.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/combobox.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/combobox.html#api-reference
    icon: "icon-park-solid:api"
---

## Installation

The Combobox is built using a composition of the `<Popover />` and the `<Command />` components.

See installation instructions for the [Popover](/components/popover) and the [Command](/components/command) components.

## Usage

```vue
<template>
  <div class="flex justify-center">
    <UiPopover v-model:open="open">
      <UiPopoverTrigger as-child>
        <UiButton
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[250px] justify-between"
        >
          {{ value ? selectedFramework : "Select framework..." }}

          <Icon name="lucide:chevrons-up-down" class="ml-auto size-4 shrink-0 opacity-50" />
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-[250px] p-0">
        <UiCommand v-model="value">
          <UiCommandInput placeholder="Search framework..." />
          <UiCommandList>
            <UiCommandEmpty>No framework found.</UiCommandEmpty>
            <UiCommandGroup>
              <UiCommandItem
                v-for="framework in frameworks"
                :key="framework.value"
                :value="framework"
                @select="open = false"
              >
                <Icon
                  name="lucide:check"
                  :class="[
                    'mr-2 size-4',
                    value?.value === framework.value ? 'opacity-100' : 'opacity-0',
                  ]"
                />
                {{ framework.label }}
              </UiCommandItem>
            </UiCommandGroup>
          </UiCommandList>
        </UiCommand>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<script setup lang="ts">
  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const open = ref(false);
  const value = ref();

  const selectedFramework = computed(
    () => frameworks.find((framework) => framework.value === value?.value?.value)?.label
  );
</script>
```

### Combobox

::ShowCase

:DocsCombobox

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsCombobox.vue" code lang="vue" -->

```vue [DocsCombobox.vue]
<template>
  <div class="flex justify-center">
    <UiPopover v-model:open="open">
      <UiPopoverTrigger as-child>
        <UiButton
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[200px] justify-between"
        >
          {{ value ? selectedFramework : "Select framework..." }}

          <Icon name="lucide:chevrons-up-down" class="ml-auto size-4 shrink-0 opacity-50" />
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-(--reka-popover-trigger-width) p-0">
        <UiCommand v-model="value" by="label">
          <UiCommandInput placeholder="Search framework..." />
          <UiCommandList>
            <UiCommandEmpty>No framework found.</UiCommandEmpty>
            <UiCommandGroup>
              <UiCommandItem
                v-for="framework in frameworks"
                :key="framework.value"
                :value="framework"
                @select="open = false"
              >
                {{ framework.label }}
                <Icon
                  name="lucide:check"
                  :class="[
                    'ml-auto size-4',
                    value?.value === framework.value ? 'opacity-100' : 'opacity-0',
                  ]"
                />
              </UiCommandItem>
            </UiCommandGroup>
          </UiCommandList>
        </UiCommand>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<script setup lang="ts">
  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const open = ref(false);
  const value = ref();

  const selectedFramework = computed(
    () => frameworks.find((framework) => framework.value === value?.value?.value)?.label
  );
</script>
```

<!-- /automd -->

::

### Origin UI

::ShowCase

:DocsComboboxOrigin

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxOrigin.vue" code lang="vue" -->

```vue [DocsComboboxOrigin.vue]
<template>
  <div class="mx-auto grid max-w-xs grid-cols-1 gap-8">
    <div class="grid gap-2">
      <UiLabel>Combobox with search</UiLabel>
      <UiPopover v-model:open="open">
        <UiPopoverTrigger as-child>
          <UiButton variant="outline" role="combobox" class="w-full justify-between">
            <span :class="['truncate', selectedFramework ? '' : 'text-muted-foreground']">{{
              selectedFramework || "Select a framework"
            }}</span>
            <Icon name="lucide:chevron-down" class="size-4 shrink-0 text-muted-foreground/50" />
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-(--reka-popover-trigger-width) border-input p-0">
          <UiCommand v-model="value" by="label">
            <UiCommandInput placeholder="Search framework..." />
            <UiCommandList>
              <UiCommandEmpty>No framework found.</UiCommandEmpty>
              <UiCommandGroup>
                <UiCommandItem
                  v-for="framework in frameworks"
                  :key="framework.value"
                  :value="framework.value"
                  @select="open = false"
                >
                  {{ framework.label }}
                  <Icon
                    v-if="value === framework.value"
                    name="lucide:check"
                    :size="16"
                    class="ml-auto"
                  />
                </UiCommandItem>
              </UiCommandGroup>
            </UiCommandList>
          </UiCommand>
        </UiPopoverContent>
      </UiPopover>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue.js" },
    { value: "react", label: "React" },
    { value: "ember", label: "Ember.js" },
    { value: "gatsby", label: "Gatsby" },
    { value: "eleventy", label: "Eleventy" },
    { value: "solid", label: "SolidJS" },
    { value: "preact", label: "Preact" },
    { value: "qwik", label: "Qwik" },
    { value: "alpine", label: "Alpine.js" },
    { value: "lit", label: "Lit" },
  ];

  const open = ref(false);
  const value = ref("nuxt.js");
  const selectedFramework = computed(
    () => frameworks.find((framework) => framework.value === value?.value)?.label
  );
</script>
```

<!-- /automd -->

::
