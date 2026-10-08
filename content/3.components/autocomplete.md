---
title: Autocomplete
description: An input that suggests values as you type while still accepting any text.
label: Updated
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/autocomplete.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/autocomplete.html#api-reference
    icon: "icon-park-solid:api"
  - title: VeeAutocomplete
    href: /forms/veeautocomplete
    icon: lucide:square-check
---

## Source code

Click :SourceCodeLink{component="Autocomplete"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add autocomplete"}

To use the autocomplete inside a Vee-Validate form, see [VeeAutocomplete](/forms/veeautocomplete).

## Autocomplete vs. Combobox

The autocomplete is built on Reka UI's `Autocomplete` primitive. It looks like [`UiCombobox`](/components/combobox) but behaves differently:

| | Autocomplete | Combobox |
| --- | --- | --- |
| `v-model` | The text in the input (`string`) | The selected item(s) |
| Free-form text | Yes, any text is a valid value | No, the value must be one of the items |
| Selecting an item | Fills the input with the item's text | Sets the model to the item's value |
| On blur | Keeps the typed text | Resets the input to the selection |
| `multiple` / object values | Not supported | Supported |

Use the autocomplete when suggestions are only a convenience (search boxes, emails, addresses, tags, job titles). Use a combobox when the user has to pick from a fixed list, or when you need objects or multiple selection.

## Usage

### Basic

The value of the autocomplete is the text in the input. Selecting a suggestion fills the input with that suggestion, but any other text is a perfectly valid value too. Suggestions are filtered as the user types.

::prose-show-case

:DocsAutoCompleteBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteBasic.vue" code lang="vue" -->

```vue [DocsAutoCompleteBasic.vue]
<template>
  <div class="mx-auto max-w-sm space-y-3">
    <UiAutocomplete v-model="value">
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Search for a fruit" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No suggestions. Keep typing, any text is fine.
        </UiAutocompleteEmpty>
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>Fruits</UiAutocompleteLabel>
          <UiAutocompleteItem v-for="f in fruits" :key="f" :value="f">
            {{ f }}
          </UiAutocompleteItem>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>

    <p class="text-muted-foreground text-sm">
      Value: <span class="text-foreground font-medium">{{ value || "(empty)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("");

  const fruits = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Watermelon",
  ];
</script>
```

<!-- /automd -->

::

### Open on focus or click

By default the suggestions open once the user starts typing or presses the arrow keys. Use `open-on-focus` or `open-on-click` to open them as soon as the input is focused or clicked.

::prose-show-case

:DocsAutoCompleteOpenOnFocus

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteOpenOnFocus.vue" code lang="vue" -->

```vue [DocsAutoCompleteOpenOnFocus.vue]
<template>
  <div class="mx-auto max-w-sm space-y-4">
    <div class="space-y-2">
      <UiLabel for="open-on-focus">Open on focus</UiLabel>
      <UiAutocomplete v-model="focusValue" open-on-focus>
        <UiAutocompleteAnchor>
          <UiAutocompleteInput id="open-on-focus" placeholder="Focus me to see suggestions" />
        </UiAutocompleteAnchor>
        <UiAutocompleteContent>
          <UiAutocompleteEmpty class="p-4 text-center text-sm">No matches</UiAutocompleteEmpty>
          <UiAutocompleteItem v-for="l in languages" :key="l" :value="l">
            {{ l }}
          </UiAutocompleteItem>
        </UiAutocompleteContent>
      </UiAutocomplete>
    </div>

    <div class="space-y-2">
      <UiLabel for="open-on-click">Open on click</UiLabel>
      <UiAutocomplete v-model="clickValue" open-on-click>
        <UiAutocompleteAnchor>
          <UiAutocompleteInput id="open-on-click" placeholder="Click me to see suggestions" />
        </UiAutocompleteAnchor>
        <UiAutocompleteContent>
          <UiAutocompleteEmpty class="p-4 text-center text-sm">No matches</UiAutocompleteEmpty>
          <UiAutocompleteItem v-for="l in languages" :key="l" :value="l">
            {{ l }}
          </UiAutocompleteItem>
        </UiAutocompleteContent>
      </UiAutocomplete>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const focusValue = ref("");
  const clickValue = ref("");

  const languages = ["TypeScript", "JavaScript", "Python", "Rust", "Go", "Swift", "Kotlin", "Ruby"];
</script>
```

<!-- /automd -->

::

### Clearable

Use `UiAutocompleteCancel` to render a button that clears the input.

::prose-show-case

:DocsAutoCompleteClearable

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteClearable.vue" code lang="vue" -->

```vue [DocsAutoCompleteClearable.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="value">
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Where are you travelling to?" />
        <UiAutocompleteCancel
          v-if="value"
          class="text-muted-foreground hover:text-foreground mr-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm"
          aria-label="Clear"
        >
          <Icon name="lucide:x" class="size-4" />
        </UiAutocompleteCancel>
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty class="p-4 text-center text-sm"
          >No destinations found</UiAutocompleteEmpty
        >
        <UiAutocompleteItem v-for="c in cities" :key="c" :value="c">
          {{ c }}
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("Berlin");

  const cities = [
    "Amsterdam",
    "Barcelona",
    "Berlin",
    "Copenhagen",
    "Dublin",
    "Lisbon",
    "London",
    "Madrid",
    "Paris",
    "Prague",
    "Rome",
    "Vienna",
  ];
</script>
```

<!-- /automd -->

::

### Groups

Use `UiAutocompleteGroup` and `UiAutocompleteLabel` to organise the suggestions. Visible groups are divided by a line automatically, and groups that do not match the search are hidden along with their divider. Individual items can be `disabled`. `UiAutocompleteSeparator` is still available for manual dividers outside of groups.

::prose-show-case

:DocsAutoCompleteGroups

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteGroups.vue" code lang="vue" -->

```vue [DocsAutoCompleteGroups.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="value">
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Search for a technology" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty class="p-4 text-center text-sm">Nothing found</UiAutocompleteEmpty>
        <UiAutocompleteGroup v-for="group in groups" :key="group.label">
          <UiAutocompleteLabel>{{ group.label }}</UiAutocompleteLabel>
          <UiAutocompleteItem
            v-for="item in group.items"
            :key="item.name"
            :value="item.name"
            :disabled="item.disabled"
          >
            {{ item.name }}
            <span v-if="item.disabled" class="text-muted-foreground ml-auto text-xs">Soon</span>
          </UiAutocompleteItem>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("");

  const groups = [
    {
      label: "Frameworks",
      items: [{ name: "Nuxt" }, { name: "Next.js" }, { name: "SvelteKit" }, { name: "Astro" }],
    },
    {
      label: "Libraries",
      items: [
        { name: "Vue" },
        { name: "React" },
        { name: "Svelte" },
        { name: "Solid", disabled: true },
      ],
    },
    {
      label: "Tooling",
      items: [
        { name: "Vite" },
        { name: "Vitest" },
        { name: "Bun" },
        { name: "Turbopack", disabled: true },
      ],
    },
  ];
</script>
```

<!-- /automd -->

::

### Custom item content

Items accept any content, such as flags, avatars or descriptions.

::prose-show-case

:DocsAutoCompleteIcons

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteIcons.vue" code lang="vue" -->

```vue [DocsAutoCompleteIcons.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="value">
      <UiAutocompleteAnchor>
        <Icon name="lucide:map-pin" class="text-muted-foreground mr-2 size-4 shrink-0" />
        <UiAutocompleteInput placeholder="Search for a country" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty class="p-4 text-center text-sm">No country found</UiAutocompleteEmpty>
        <UiAutocompleteItem v-for="c in countries" :key="c.name" :value="c.name">
          <div class="flex w-full items-center gap-3">
            <span class="text-base">{{ c.flag }}</span>
            <span>{{ c.name }}</span>
            <span class="text-muted-foreground ml-auto text-xs">{{ c.capital }}</span>
          </div>
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("");

  const countries = [
    { name: "Australia", capital: "Canberra", flag: "🇦🇺" },
    { name: "Brazil", capital: "Brasília", flag: "🇧🇷" },
    { name: "Canada", capital: "Ottawa", flag: "🇨🇦" },
    { name: "France", capital: "Paris", flag: "🇫🇷" },
    { name: "Germany", capital: "Berlin", flag: "🇩🇪" },
    { name: "Japan", capital: "Tokyo", flag: "🇯🇵" },
    { name: "Mexico", capital: "Mexico City", flag: "🇲🇽" },
    { name: "Spain", capital: "Madrid", flag: "🇪🇸" },
    { name: "United Kingdom", capital: "London", flag: "🇬🇧" },
    { name: "United States", capital: "Washington, D.C.", flag: "🇺🇸" },
  ];
</script>
```

<!-- /automd -->

::

### Search

Set `hide-when-empty` on `UiAutocompleteContent` to keep the popup hidden until at least one suggestion matches. This makes the autocomplete behave like a search box with suggestions.

::prose-show-case

:DocsAutoCompleteSearch

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteSearch.vue" code lang="vue" -->

```vue [DocsAutoCompleteSearch.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="query">
      <UiAutocompleteAnchor>
        <Icon name="lucide:search" class="text-muted-foreground mr-2 size-4 shrink-0" />
        <UiAutocompleteInput placeholder="Search the docs..." />
        <UiAutocompleteCancel
          v-if="query"
          class="text-muted-foreground hover:text-foreground inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm"
          aria-label="Clear search"
        >
          <Icon name="lucide:x" class="size-4" />
        </UiAutocompleteCancel>
      </UiAutocompleteAnchor>

      <!-- With `hide-when-empty` the popup stays hidden until there is at least one match. -->
      <UiAutocompleteContent hide-when-empty>
        <UiAutocompleteEmpty />
        <UiAutocompleteItem v-for="p in pages" :key="p" :value="p">
          {{ p }}
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const query = ref("");

  const pages = [
    "Installation",
    "Introduction",
    "Theming",
    "Dark mode",
    "Accordion",
    "Alert dialog",
    "Autocomplete",
    "Button",
    "Calendar",
    "Checkbox",
    "Dialog",
    "Dropdown menu",
    "Form validation",
    "Input",
    "Select",
    "Tabs",
  ];
</script>
```

<!-- /automd -->

::

### Email suggestions

Suggestions do not have to come from a static list. Here they are derived from what the user typed. Because the suggestions already match the input, built-in filtering is turned off with `ignore-filter`.

::prose-show-case

:DocsAutoCompleteEmail

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteEmail.vue" code lang="vue" -->

```vue [DocsAutoCompleteEmail.vue]
<template>
  <div class="mx-auto max-w-sm space-y-2">
    <UiLabel for="email-autocomplete">Email</UiLabel>
    <!-- `ignore-filter` because the suggestions are built from the typed text instead of filtered. -->
    <UiAutocomplete v-model="email" ignore-filter>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput id="email-autocomplete" type="email" placeholder="you@example.com" />
      </UiAutocompleteAnchor>

      <UiAutocompleteContent hide-when-empty>
        <UiAutocompleteEmpty />
        <UiAutocompleteItem v-for="s in suggestions" :key="s" :value="s">
          {{ s }}
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
    <p class="text-muted-foreground text-sm">
      Type a name followed by <kbd class="bg-muted rounded px-1 font-mono text-xs">@</kbd> to see
      domain suggestions.
    </p>
  </div>
</template>

<script lang="ts" setup>
  const email = ref("");

  const domains = ["gmail.com", "outlook.com", "icloud.com", "yahoo.com", "proton.me"];

  const suggestions = computed(() => {
    const [local, partial = ""] = email.value.split("@");
    // Only suggest while the user is typing the domain part of the address
    if (!local || !email.value.includes("@")) return [];
    return domains
      .filter((d) => d.startsWith(partial.toLowerCase()) && d !== partial.toLowerCase())
      .map((d) => `${local}@${d}`);
  });
</script>
```

<!-- /automd -->

::

### Async

Fetch suggestions from your API as the user types. Use `ignore-filter` so the results returned from the server are not filtered a second time on the client.

::prose-show-case

:DocsAutoCompleteAsync

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteAsync.vue" code lang="vue" -->

```vue [DocsAutoCompleteAsync.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="search" ignore-filter>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Search for a user..." />
        <Icon
          v-if="loading"
          name="lucide:loader-circle"
          class="text-muted-foreground size-4 shrink-0 animate-spin"
        />
        <Icon v-else name="lucide:search" class="text-muted-foreground size-4 shrink-0" />
      </UiAutocompleteAnchor>

      <UiAutocompleteContent hide-when-empty>
        <UiAutocompleteEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          {{ loading ? "Searching..." : "No users found" }}
        </UiAutocompleteEmpty>
        <UiAutocompleteGroup v-if="users.length">
          <UiAutocompleteLabel>Users</UiAutocompleteLabel>
          <UiAutocompleteItem v-for="u in users" :key="u.id" :value="u.name" :disabled="u.disabled">
            <div class="flex items-center gap-3">
              <UiAvatar class="size-7" :src="u.image" />
              <p :class="[u.disabled && 'line-through']">{{ u.name }}</p>
            </div>
          </UiAutocompleteItem>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import { promiseTimeout } from "@vueuse/core";

  type Person = {
    id: number;
    name: string;
    image: string;
    disabled?: boolean;
  };

  const loading = ref(false);
  const search = ref("");
  const users = ref<Person[]>([]);

  // Simulates a request to your API. The server is responsible for filtering the results.
  const fetchUsers = async (term: string): Promise<Person[]> => {
    await promiseTimeout(800);
    return Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: `${term} ${faker.person.lastName()}`,
      image: faker.image.avatar(),
      disabled: i === 3,
    }));
  };

  watchDebounced(
    search,
    async (term) => {
      if (!term.trim()) {
        users.value = [];
        return;
      }
      loading.value = true;
      try {
        users.value = await fetchUsers(term.trim());
      } finally {
        loading.value = false;
      }
    },
    { debounce: 300 }
  );
</script>
```

<!-- /automd -->

::

### Form

Pass a `name` to include the typed text when the surrounding `<form>` is submitted.

::prose-show-case

:DocsAutoCompleteForm

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteForm.vue" code lang="vue" -->

```vue [DocsAutoCompleteForm.vue]
<template>
  <form class="mx-auto max-w-sm space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-2">
      <UiLabel for="city-autocomplete">City</UiLabel>
      <!-- `name` makes the typed text part of the native form data -->
      <UiAutocomplete name="city" required>
        <UiAutocompleteAnchor>
          <UiAutocompleteInput id="city-autocomplete" placeholder="Where do you live?" />
        </UiAutocompleteAnchor>
        <UiAutocompleteContent>
          <UiAutocompleteEmpty class="p-4 text-center text-sm">
            We'll use whatever you typed.
          </UiAutocompleteEmpty>
          <UiAutocompleteItem v-for="c in cities" :key="c" :value="c">
            {{ c }}
          </UiAutocompleteItem>
        </UiAutocompleteContent>
      </UiAutocomplete>
    </div>
    <UiButton type="submit">Submit</UiButton>
    <p v-if="submitted" class="text-muted-foreground text-sm">
      Submitted city: <span class="text-foreground font-medium">{{ submitted }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const submitted = ref("");

  const cities = ["Austin", "Boston", "Chicago", "Denver", "Miami", "Portland", "Seattle"];

  const onSubmit = (e: Event) => {
    const data = new FormData(e.target as HTMLFormElement);
    submitted.value = String(data.get("city") ?? "");
  };
</script>
```

<!-- /automd -->

::

### Disabled

Set `disabled` on the root to prevent interaction.

::prose-show-case

:DocsAutoCompleteDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteDisabled.vue" code lang="vue" -->

```vue [DocsAutoCompleteDisabled.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete model-value="Vue" disabled>
      <UiAutocompleteAnchor class="has-disabled:cursor-not-allowed has-disabled:opacity-50">
        <UiAutocompleteInput placeholder="Pick a framework" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteItem v-for="f in frameworks" :key="f" :value="f">
          {{ f }}
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const frameworks = ["Vue", "React", "Svelte", "Solid", "Angular"];
</script>
```

<!-- /automd -->

::

## Props

### Autocomplete

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string` | `""` | The text in the input. |
| `default-value` | `string` | | Initial text when uncontrolled. |
| `v-model:open` | `boolean` | | Controls whether the suggestions are open. |
| `default-open` | `boolean` | | Initial open state when uncontrolled. |
| `open-on-focus` | `boolean` | `false` | Open the suggestions when the input is focused. |
| `open-on-click` | `boolean` | `false` | Open the suggestions when the input is clicked. |
| `ignore-filter` | `boolean` | `false` | Disable the built-in filtering. Use it when you filter the items yourself, for example with data from an API. |
| `reset-search-term-on-blur` | `boolean` | `false` | Reset the search term to the current value when the input loses focus. |
| `highlight-on-hover` | `boolean` | `true` | Highlight items on hover. |
| `loop` | `boolean` | `false` | Wrap keyboard navigation from the last item to the first and vice versa. |
| `name` | `string` | | Name used when the input is part of a native form. |
| `required` | `boolean` | | Marks the field as required. |
| `disabled` | `boolean` | | Prevents interaction. |
| `dir` | `"ltr" \| "rtl"` | | Reading direction. |

The root emits `update:modelValue`, `update:open` and `highlight`.

### AutocompleteContent

Accepts all of the [Reka UI popper content props](https://reka-ui.com/docs/components/autocomplete.html#content). The ones used most often are:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hide-when-empty` | `boolean` | `false` | Hide the popup while no item matches. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side of the input. |
| `side-offset` | `number` | `8` | Distance in pixels from the input. |
| `position` | `"inline" \| "popper"` | `"popper"` | Positioning strategy. |

### AutocompleteItem

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | The text that fills the input when the item is selected. Also used for filtering. |
| `disabled` | `boolean` | Prevents the item from being selected. |

## Accessibility

The input has the `combobox` role with `aria-autocomplete="list"`, and the suggestions are exposed as a listbox. Focus stays in the input while you move through the suggestions.

| Key | Description |
| --- | --- |
| `ArrowDown` / `ArrowUp` | Opens the suggestions, then moves the highlight. |
| `Enter` | Fills the input with the highlighted suggestion. |
| `Esc` | Closes the suggestions and keeps focus in the input. |
| `Tab` | Moves focus away. The typed text is kept. |
