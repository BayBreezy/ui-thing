---
title: Combobox
description: An input with a list of options where the user picks one or more items from a fixed list.
label: Updated
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/combobox.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/combobox.html#api-reference
    icon: "icon-park-solid:api"
  - title: VeeCombobox
    href: /forms/veecombobox
    icon: lucide:square-check
---

## Source code

Click :SourceCodeLink{component="Combobox"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add combobox"}

To use the combobox inside a Vee-Validate form, see [VeeCombobox](/forms/veecombobox).

::prose-callout{variant="info" title="Hand-rolled comboboxes"}
Older versions of this page built the combobox by hand from `UiPopover` and `UiCommand`. That still works (see the [Command](/components/command) docs), but `UiCombobox` is now built on Reka UI's `Combobox` primitive and handles filtering, keyboard navigation, multiple selection and form values for you.
::

## Combobox vs. Autocomplete

| | Combobox | Autocomplete |
| --- | --- | --- |
| `v-model` | The selected item(s): a string, number, object or an array when `multiple` | The text in the input (`string`) |
| Free-form text | No, the value must be one of the items | Yes, any text is a valid value |
| Selecting an item | Sets the model to the item's `value` | Fills the input with the item's text |
| On blur | Resets the input to the selection | Keeps the typed text |
| `multiple` / object values | Supported | Not supported |

Use a combobox when the user has to choose from a fixed list, or when you need objects or multiple selection. Use [`UiAutocomplete`](/components/autocomplete) when suggestions are only a convenience.

## Usage

### Basic

The model holds the selected item. The input searches the list and shows the selection once the list closes.

::prose-show-case

:DocsComboboxBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxBasic.vue" code lang="vue" -->

```vue [DocsComboboxBasic.vue]
<template>
  <div class="mx-auto max-w-sm space-y-3">
    <UiCombobox v-model="value">
      <UiComboboxAnchor>
        <UiComboboxInput placeholder="Select a fruit" />
        <UiComboboxTrigger>
          <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No fruit found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem v-for="f in fruits" :key="f" :value="f">
            {{ f }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>

    <p class="text-muted-foreground text-sm">
      Selected: <span class="text-foreground font-medium">{{ value ?? "(none)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const value = ref<string>();

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
    "Orange",
    "Papaya",
    "Raspberry",
    "Strawberry",
    "Watermelon",
  ];
</script>
```

<!-- /automd -->

::

### Objects

Items can have any value, including objects. Use `by` to tell the combobox how to compare objects, and `display-value` on `UiComboboxInput` to control what the input shows for the selected object. Set `text-value` on the item so it can be searched.

::prose-show-case

:DocsComboboxObjects

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxObjects.vue" code lang="vue" -->

```vue [DocsComboboxObjects.vue]
<template>
  <div class="mx-auto max-w-sm space-y-3">
    <UiCombobox v-model="value" by="value">
      <UiComboboxAnchor>
        <UiComboboxInput
          placeholder="Select a framework"
          :display-value="(framework: Framework) => framework?.label ?? ''"
        />
        <UiComboboxTrigger>
          <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No framework found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem
            v-for="framework in frameworks"
            :key="framework.value"
            :value="framework"
            :text-value="framework.label"
          >
            {{ framework.label }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>

    <p class="text-muted-foreground text-sm">
      Selected:
      <span class="text-foreground font-medium">{{ value ? value.value : "(none)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  type Framework = { value: string; label: string };

  const frameworks: Framework[] = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const value = ref<Framework>(frameworks[2]!);
</script>
```

<!-- /automd -->

::

### Groups

Use `UiComboboxGroup` and `UiComboboxLabel` to organise the items. Visible groups are divided by a line automatically, and groups that do not match the search are hidden along with their divider. Individual items can be `disabled`.

::prose-show-case

:DocsComboboxGroups

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxGroups.vue" code lang="vue" -->

```vue [DocsComboboxGroups.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiCombobox v-model="value">
      <UiComboboxAnchor>
        <UiComboboxInput placeholder="Select a timezone" />
        <UiComboboxTrigger>
          <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No timezone found.
        </UiComboboxEmpty>
        <UiComboboxGroup v-for="group in timezones" :key="group.label">
          <UiComboboxLabel>{{ group.label }}</UiComboboxLabel>
          <UiComboboxItem v-for="tz in group.items" :key="tz" :value="tz">
            {{ tz }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>
  </div>
</template>

<script lang="ts" setup>
  const value = ref<string>();

  const timezones = [
    {
      label: "North America",
      items: [
        "Eastern Standard Time (EST)",
        "Central Standard Time (CST)",
        "Mountain Standard Time (MST)",
        "Pacific Standard Time (PST)",
        "Alaska Standard Time (AKST)",
        "Hawaii Standard Time (HST)",
      ],
    },
    {
      label: "Europe & Africa",
      items: [
        "Greenwich Mean Time (GMT)",
        "Central European Time (CET)",
        "Eastern European Time (EET)",
        "Western European Summer Time (WEST)",
        "Central Africa Time (CAT)",
        "East Africa Time (EAT)",
      ],
    },
    {
      label: "Asia",
      items: [
        "Moscow Time (MSK)",
        "India Standard Time (IST)",
        "China Standard Time (CST)",
        "Japan Standard Time (JST)",
        "Korea Standard Time (KST)",
        "Indonesia Central Standard Time (WITA)",
      ],
    },
    {
      label: "Australia & Pacific",
      items: [
        "Australian Western Standard Time (AWST)",
        "Australian Central Standard Time (ACST)",
        "Australian Eastern Standard Time (AEST)",
        "New Zealand Standard Time (NZST)",
        "Fiji Time (FJT)",
      ],
    },
  ];
</script>
```

<!-- /automd -->

::

### Multiple

Set `multiple` to allow more than one item. The model becomes an array. Reka UI recommends rendering the selection as tags: wrap a `UiTagsInput` in `UiComboboxAnchor` (with `as-child`) and render the input with `UiTagsInputInput`.

::prose-show-case

:DocsComboboxMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxMultiple.vue" code lang="vue" -->

```vue [DocsComboboxMultiple.vue]
<template>
  <div class="mx-auto max-w-sm space-y-3">
    <UiCombobox v-model="value" multiple>
      <UiComboboxAnchor as-child>
        <UiTagsInput
          v-model="value"
          delimiter=""
          class="h-auto! min-h-9 w-full gap-1.5 px-3! py-1.5"
        >
          <UiTagsInputItem v-for="item in value" :key="item" :value="item" />
          <UiComboboxInput v-model="searchTerm" as-child>
            <UiTagsInputInput
              placeholder="Select languages..."
              class="min-w-24 flex-1 p-0"
              @keydown.enter.prevent
            />
          </UiComboboxInput>
          <UiComboboxTrigger class="ml-auto">
            <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
          </UiComboboxTrigger>
        </UiTagsInput>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No language found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem
            v-for="language in languages"
            :key="language"
            :value="language"
            @select="searchTerm = ''"
          >
            {{ language }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>

    <p class="text-muted-foreground text-sm">
      Selected: <span class="text-foreground font-medium">{{ value.length || "none" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const languages = [
    "TypeScript",
    "JavaScript",
    "Python",
    "Go",
    "Rust",
    "Ruby",
    "PHP",
    "Java",
    "Kotlin",
    "Swift",
    "C#",
    "Elixir",
  ];

  const value = ref<string[]>(["TypeScript", "Rust"]);
  const searchTerm = ref("");
</script>
```

<!-- /automd -->

::

### Clearable

Use `UiComboboxCancel` to render a button that clears the search. Add `reset-model-value-on-clear` to also reset the model to `null` (or `[]` when `multiple`).

::prose-show-case

:DocsComboboxClearable

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxClearable.vue" code lang="vue" -->

```vue [DocsComboboxClearable.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiCombobox v-model="value" reset-model-value-on-clear>
      <UiComboboxAnchor>
        <UiComboboxInput placeholder="Select a country" />
        <UiComboboxCancel
          v-if="value"
          class="text-muted-foreground hover:text-foreground mr-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm"
          aria-label="Clear"
        >
          <Icon name="lucide:x" class="size-4" />
        </UiComboboxCancel>
        <UiComboboxTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No country found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem v-for="c in countries" :key="c" :value="c">
            {{ c }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>
  </div>
</template>

<script lang="ts" setup>
  const value = ref<string | null>("Canada");

  const countries = [
    "Australia",
    "Brazil",
    "Canada",
    "France",
    "Germany",
    "Japan",
    "Mexico",
    "Spain",
    "United Kingdom",
    "United States",
  ];
</script>
```

<!-- /automd -->

::

### Custom item content

Items accept any content, such as icons, avatars or descriptions. Content that is not plain text needs `text-value` so the item can still be searched. Here the selected item also drives an icon placed before the input.

::prose-show-case

:DocsComboboxIcons

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxIcons.vue" code lang="vue" -->

```vue [DocsComboboxIcons.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiCombobox v-model="value" by="id">
      <UiComboboxAnchor>
        <Icon
          :name="value?.icon ?? 'lucide:circle-dashed'"
          class="text-muted-foreground mr-2 size-4 shrink-0"
        />
        <UiComboboxInput
          placeholder="Set a status"
          :display-value="(status: Status) => status?.label ?? ''"
        />
        <UiComboboxTrigger>
          <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No status found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem
            v-for="status in statuses"
            :key="status.id"
            :value="status"
            :text-value="status.label"
          >
            <div class="flex items-center gap-2">
              <Icon :name="status.icon" :class="['size-4', status.class]" />
              <div>
                <p class="leading-none font-medium">{{ status.label }}</p>
                <p class="text-muted-foreground mt-1 text-xs">{{ status.description }}</p>
              </div>
            </div>
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>
  </div>
</template>

<script lang="ts" setup>
  type Status = {
    id: string;
    label: string;
    description: string;
    icon: string;
    class: string;
  };

  const statuses: Status[] = [
    {
      id: "backlog",
      label: "Backlog",
      description: "Not planned yet",
      icon: "lucide:circle-dashed",
      class: "text-muted-foreground",
    },
    {
      id: "todo",
      label: "Todo",
      description: "Ready to be picked up",
      icon: "lucide:circle",
      class: "text-blue-500",
    },
    {
      id: "in-progress",
      label: "In progress",
      description: "Someone is working on it",
      icon: "lucide:loader-circle",
      class: "text-amber-500",
    },
    {
      id: "done",
      label: "Done",
      description: "Shipped and verified",
      icon: "lucide:circle-check",
      class: "text-green-500",
    },
    {
      id: "canceled",
      label: "Canceled",
      description: "Won't be worked on",
      icon: "lucide:circle-x",
      class: "text-red-500",
    },
  ];

  const value = ref<Status>();
</script>
```

<!-- /automd -->

::

### Open on focus or click

By default the list opens once the user starts typing or presses the arrow keys. Use `open-on-focus` or `open-on-click` to open it as soon as the input is focused or clicked.

::prose-show-case

:DocsComboboxOpenOnFocus

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxOpenOnFocus.vue" code lang="vue" -->

```vue [DocsComboboxOpenOnFocus.vue]
<template>
  <div class="mx-auto max-w-sm space-y-4">
    <div class="space-y-2">
      <UiLabel for="open-on-focus">Open on focus</UiLabel>
      <UiCombobox v-model="focusValue" open-on-focus>
        <UiComboboxAnchor>
          <UiComboboxInput id="open-on-focus" placeholder="Focus me to see the options" />
        </UiComboboxAnchor>
        <UiComboboxContent>
          <UiComboboxEmpty class="p-4 text-center text-sm">No matches</UiComboboxEmpty>
          <UiComboboxItem v-for="s in sizes" :key="s" :value="s">{{ s }}</UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
    </div>

    <div class="space-y-2">
      <UiLabel for="open-on-click">Open on click</UiLabel>
      <UiCombobox v-model="clickValue" open-on-click>
        <UiComboboxAnchor>
          <UiComboboxInput id="open-on-click" placeholder="Click me to see the options" />
        </UiComboboxAnchor>
        <UiComboboxContent>
          <UiComboboxEmpty class="p-4 text-center text-sm">No matches</UiComboboxEmpty>
          <UiComboboxItem v-for="s in sizes" :key="s" :value="s">{{ s }}</UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["Extra small", "Small", "Medium", "Large", "Extra large"];

  const focusValue = ref<string>();
  const clickValue = ref<string>();
</script>
```

<!-- /automd -->

::

### Async

Fetch items from your API as the user types. Use `ignore-filter` so the results returned from the server are not filtered a second time on the client, and listen to `update:modelValue` on `UiComboboxInput` to get the search term. The selected object is kept in the model, so its label survives while the list of results changes.

::prose-show-case

:DocsComboboxAsync

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxAsync.vue" code lang="vue" -->

```vue [DocsComboboxAsync.vue]
<template>
  <div class="mx-auto max-w-sm space-y-3">
    <UiCombobox v-model="selected" by="id" ignore-filter>
      <UiComboboxAnchor>
        <UiComboboxInput
          placeholder="Search for a user..."
          :display-value="(user: Person) => user?.name ?? ''"
          @update:model-value="search = $event"
        />
        <Icon
          v-if="loading"
          name="lucide:loader-circle"
          class="text-muted-foreground size-4 shrink-0 animate-spin"
        />
        <Icon v-else name="lucide:search" class="text-muted-foreground size-4 shrink-0" />
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          {{ loading ? "Searching..." : "No users found" }}
        </UiComboboxEmpty>
        <UiComboboxGroup v-if="users.length">
          <UiComboboxLabel>Users</UiComboboxLabel>
          <UiComboboxItem
            v-for="u in users"
            :key="u.id"
            :value="u"
            :text-value="u.name"
            :disabled="u.disabled"
          >
            <div class="flex items-center gap-3">
              <UiAvatar class="size-7" :src="u.image" />
              <p :class="[u.disabled && 'line-through']">{{ u.name }}</p>
            </div>
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>

    <p class="text-muted-foreground text-sm">
      Selected:
      <span class="text-foreground font-medium">{{ selected ? `#${selected.id}` : "(none)" }}</span>
    </p>
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
  const selected = ref<Person>();
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

Pass a `name` to include the selected value when the surrounding `<form>` is submitted. For validation, see [VeeCombobox](/forms/veecombobox).

::prose-show-case

:DocsComboboxForm

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxForm.vue" code lang="vue" -->

```vue [DocsComboboxForm.vue]
<template>
  <form class="mx-auto max-w-sm space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-2">
      <UiLabel for="role-combobox">Role</UiLabel>
      <!-- `name` adds a hidden input, so the selected value is part of the native form data -->
      <UiCombobox name="role" required>
        <UiComboboxAnchor>
          <UiComboboxInput id="role-combobox" placeholder="Select a role" />
          <UiComboboxTrigger>
            <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
          </UiComboboxTrigger>
        </UiComboboxAnchor>
        <UiComboboxContent>
          <UiComboboxEmpty class="p-4 text-center text-sm">No role found.</UiComboboxEmpty>
          <UiComboboxItem v-for="r in roles" :key="r" :value="r">
            {{ r }}
          </UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
    </div>
    <UiButton type="submit">Submit</UiButton>
    <p v-if="submitted" class="text-muted-foreground text-sm">
      Submitted role: <span class="text-foreground font-medium">{{ submitted }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const submitted = ref("");

  const roles = ["Owner", "Admin", "Editor", "Viewer"];

  const onSubmit = (e: Event) => {
    const data = new FormData(e.target as HTMLFormElement);
    submitted.value = String(data.get("role") ?? "");
  };
</script>
```

<!-- /automd -->

::

### Disabled

Set `disabled` on the root to prevent interaction, or on individual items.

::prose-show-case

:DocsComboboxDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/Combobox/DocsComboboxDisabled.vue" code lang="vue" -->

```vue [DocsComboboxDisabled.vue]
<template>
  <div class="mx-auto max-w-sm space-y-4">
    <div class="space-y-2">
      <UiLabel for="disabled-combobox">Disabled combobox</UiLabel>
      <UiCombobox model-value="Medium" disabled>
        <UiComboboxAnchor class="has-disabled:cursor-not-allowed has-disabled:opacity-50">
          <UiComboboxInput id="disabled-combobox" />
          <UiComboboxTrigger disabled>
            <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
          </UiComboboxTrigger>
        </UiComboboxAnchor>
      </UiCombobox>
    </div>

    <div class="space-y-2">
      <UiLabel for="disabled-items">Disabled items</UiLabel>
      <UiCombobox>
        <UiComboboxAnchor>
          <UiComboboxInput id="disabled-items" placeholder="Pick a plan" />
          <UiComboboxTrigger>
            <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
          </UiComboboxTrigger>
        </UiComboboxAnchor>
        <UiComboboxContent>
          <UiComboboxItem value="Free">Free</UiComboboxItem>
          <UiComboboxItem value="Pro">Pro</UiComboboxItem>
          <UiComboboxItem value="Team" disabled>Team (coming soon)</UiComboboxItem>
          <UiComboboxItem value="Enterprise" disabled>Enterprise (coming soon)</UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

## Props

### Combobox

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `T \| T[]` | | The selected item. An array when `multiple`. |
| `default-value` | `T \| T[]` | | Initial selection when uncontrolled. |
| `multiple` | `boolean` | `false` | Allow selecting more than one item. |
| `by` | `string \| ((a: T, b: T) => boolean)` | | Property name or comparator used to compare object values. |
| `v-model:open` | `boolean` | | Controls whether the list is open. |
| `default-open` | `boolean` | | Initial open state when uncontrolled. |
| `open-on-focus` | `boolean` | `false` | Open the list when the input is focused. |
| `open-on-click` | `boolean` | `false` | Open the list when the input is clicked. |
| `ignore-filter` | `boolean` | `false` | Disable the built-in filtering. Use it when you filter the items yourself, for example with data from an API. |
| `reset-search-term-on-blur` | `boolean` | `true` | Reset the search term when the input loses focus. |
| `reset-search-term-on-select` | `boolean` | `true` | Reset the search term when an item is selected. |
| `reset-model-value-on-clear` | `boolean` | `false` | Reset the model when `UiComboboxCancel` is used. |
| `highlight-on-hover` | `boolean` | `true` | Highlight items on hover. |
| `name` | `string` | | Name used when the combobox is part of a native form. |
| `required` | `boolean` | | Marks the field as required. |
| `disabled` | `boolean` | | Prevents interaction. |
| `dir` | `"ltr" \| "rtl"` | | Reading direction. |

The root emits `update:modelValue`, `update:open` and `highlight`.

### ComboboxInput

| Prop | Type | Description |
| --- | --- | --- |
| `display-value` | `(value: T) => string` | What the input shows for the selected item once the list is closed. Needed for object values. Not used with `multiple`. |

Emits `update:modelValue` with the text in the input as the user types.

### ComboboxContent

Accepts all of the [Reka UI popper content props](https://reka-ui.com/docs/components/combobox.html#content). The ones used most often are:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hide-when-empty` | `boolean` | `false` | Hide the popup while no item matches. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side of the input. |
| `side-offset` | `number` | `8` | Distance in pixels from the input. |
| `position` | `"inline" \| "popper"` | `"popper"` | Positioning strategy. |

### ComboboxItem

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `T` | The value stored in the model when the item is selected. |
| `text-value` | `string` | Plain text used to search the item. Needed when the content is not plain text. |
| `disabled` | `boolean` | Prevents the item from being selected. |
| `icon` | `string` | Icon shown when the item is selected. Defaults to `lucide:check`. |

## Accessibility

The input has the `combobox` role and the items are exposed as a listbox. Focus stays in the input while you move through the items.

| Key | Description |
| --- | --- |
| `ArrowDown` / `ArrowUp` | Opens the list, then moves the highlight. |
| `Enter` | Selects the highlighted item. |
| `Esc` | Closes the list and keeps focus in the input. |
| `Tab` | Moves focus away. The input resets to the current selection. |
