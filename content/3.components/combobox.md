---
title: Combobox
description: Autocomplete input and command palette with a list of suggestions.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/combobox.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/combobox.html#api-reference
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

          <Icon name="lucide:chevrons-up-down" class="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
                    'mr-2 h-4 w-4',
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
          class="w-[250px] justify-between"
        >
          {{ value ? selectedFramework : "Select framework..." }}

          <Icon name="lucide:chevrons-up-down" class="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-[250px] p-0">
        <UiCommand v-model="value" :filter-function="filterFunction">
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
                    'mr-2 h-4 w-4',
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

  const filterFunction = (list: typeof frameworks, search: string) =>
    list.filter((i) => i.value.toLowerCase().includes(search.toLowerCase()));
</script>
```

<!-- /automd -->

::
