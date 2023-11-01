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
    <UIPopover v-model:open="open">
      <UIPopoverTrigger as-child>
        <UIButton
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[250px] justify-between"
        >
          {{ value ? selectedFramework : "Select framework..." }}

          <Icon name="lucide:chevrons-up-down" class="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </UIButton>
      </UIPopoverTrigger>
      <UIPopoverContent class="w-[250px] p-0">
        <UICommand v-model="value">
          <UICommandInput placeholder="Search framework..." />
          <UICommandList>
            <UICommandEmpty>No framework found.</UICommandEmpty>
            <UICommandGroup>
              <UICommandItem
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
              </UICommandItem>
            </UICommandGroup>
          </UICommandList>
        </UICommand>
      </UIPopoverContent>
    </UIPopover>
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

::ShowCase{component="DocsCombobox"}

#code

```vue [DocsCombobox.vue]
<template>
  <div class="flex justify-center">
    <UIPopover v-model:open="open">
      <UIPopoverTrigger as-child>
        <UIButton
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[250px] justify-between"
        >
          {{ value ? selectedFramework : "Select framework..." }}

          <Icon name="lucide:chevrons-up-down" class="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </UIButton>
      </UIPopoverTrigger>
      <UIPopoverContent class="w-[250px] p-0">
        <UICommand v-model="value">
          <UICommandInput placeholder="Search framework..." />
          <UICommandList>
            <UICommandEmpty>No framework found.</UICommandEmpty>
            <UICommandGroup>
              <UICommandItem
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
              </UICommandItem>
            </UICommandGroup>
          </UICommandList>
        </UICommand>
      </UIPopoverContent>
    </UIPopover>
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

::
