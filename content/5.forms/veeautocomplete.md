---
title: VeeAutocomplete
description: An autocomplete component that uses the composition API provided by Vee-Validate to perform validation.
label: New
links:
  - title: Autocomplete Source
    href: /components/autocomplete
    icon: lucide:text-cursor-input
---

## Source code

Click :SourceCodeLink{component="Vee/Autocomplete.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-autocomplete"}

## Usage

`UiVeeAutocomplete` wraps [`UiAutocomplete`](/components/autocomplete) with a label, hint and animated error message, and registers the value with the surrounding Vee-Validate form. The value is the text in the input, so it is always a `string` and any text is accepted unless your schema says otherwise. Any other attribute (`open-on-focus`, `open-on-click`, `ignore-filter`, ...) is forwarded to `UiAutocomplete`.

### Basic example

`options` takes an array of strings. Picking a suggestion fills the input; anything else the user types is also a valid value. The `required` prop only adds the asterisk and `aria-required`, so enforce it in your schema.

::prose-show-case

:DocsVeeAutocomplete

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Autocomplete/DocsVeeAutocomplete.vue" code lang="vue" -->

```vue [DocsVeeAutocomplete.vue]
<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeAutocomplete
        name="job"
        label="Job title"
        hint="Pick a suggestion or type your own."
        placeholder="e.g. Product designer"
        :options="jobs"
        required
      />
      <UiButton :loading="isSubmitting" type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  const jobs = [
    "Backend engineer",
    "Frontend engineer",
    "Product designer",
    "Product manager",
    "Data analyst",
    "DevOps engineer",
    "Engineering manager",
    "QA engineer",
  ];

  const schema = object({
    job: string().label("Job title").required().min(3).max(50).trim(),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Saved", { description: `Job title: ${values.job}` });
  });
</script>
```

<!-- /automd -->

::

### Default value

Use `v-model` or `initialValues` to set an initial value. Add `clearable` for a clear button and `open-on-focus` to show the suggestions as soon as the input is focused.

::prose-show-case

:DocsVeeAutocompleteDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Autocomplete/DocsVeeAutocompleteDefault.vue" code lang="vue" -->

```vue [DocsVeeAutocompleteDefault.vue]
<template>
  <form class="mx-auto max-w-sm space-y-4">
    <UiVeeAutocomplete
      v-model="framework"
      name="framework"
      label="Favorite framework"
      label-hint="Optional"
      hint="Starts with a default value. Clear it or type something else."
      :options="frameworks"
      open-on-focus
      clearable
    />
    <p class="text-muted-foreground text-sm">
      Current value:
      <span class="text-foreground font-medium">{{ framework || "(empty)" }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const framework = ref("Nuxt");

  const frameworks = ["Nuxt", "Next.js", "SvelteKit", "Astro", "Remix", "SolidStart", "Angular"];
</script>
```

<!-- /automd -->

::

### Groups

Options can be objects. Options sharing the same `group` are rendered together under a label, and `disabled` options cannot be picked.

::prose-show-case

:DocsVeeAutocompleteGroups

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Autocomplete/DocsVeeAutocompleteGroups.vue" code lang="vue" -->

```vue [DocsVeeAutocompleteGroups.vue]
<template>
  <form class="mx-auto max-w-sm space-y-5" @submit="onSubmit">
    <!-- Options with the same `group` are rendered together under a label. -->
    <UiVeeAutocomplete
      name="timezone"
      label="Time zone"
      placeholder="Search time zones..."
      :options="timezones"
      empty-text="No time zone found"
      open-on-focus
      required
    />
    <UiButton type="submit">Save</UiButton>
  </form>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const timezones = [
    { value: "UTC", group: "Universal" },
    { value: "GMT", group: "Universal" },
    { value: "America/New_York", group: "Americas" },
    { value: "America/Chicago", group: "Americas" },
    { value: "America/Los_Angeles", group: "Americas" },
    { value: "America/Sao_Paulo", group: "Americas" },
    { value: "Europe/London", group: "Europe" },
    { value: "Europe/Paris", group: "Europe" },
    { value: "Europe/Berlin", group: "Europe" },
    { value: "Europe/Moscow", group: "Europe", disabled: true },
    { value: "Asia/Tokyo", group: "Asia" },
    { value: "Asia/Singapore", group: "Asia" },
    { value: "Asia/Kolkata", group: "Asia" },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(object({ timezone: string().label("Time zone").required() })),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", { description: `Time zone: ${values.timezone}` });
  });
</script>
```

<!-- /automd -->

::

### Custom items

The default slot replaces the generated suggestions, so you can render any `UiAutocomplete*` parts you like. Use `empty-text` (or the `empty` slot) to show a message when nothing matches.

::prose-show-case

:DocsVeeAutocompleteCustomItems

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Autocomplete/DocsVeeAutocompleteCustomItems.vue" code lang="vue" -->

```vue [DocsVeeAutocompleteCustomItems.vue]
<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- The default slot replaces the generated suggestions. -->
      <UiVeeAutocomplete
        name="assignee"
        label="Assignee"
        hint="Search your team by name."
        placeholder="Who is this assigned to?"
        icon="lucide:user-round"
        empty-text="Nobody matches that name"
      >
        <UiAutocompleteGroup v-for="team in teams" :key="team.name">
          <UiAutocompleteLabel>{{ team.name }}</UiAutocompleteLabel>
          <UiAutocompleteItem v-for="m in team.members" :key="m.name" :value="m.name">
            <div class="flex w-full items-center justify-between gap-3">
              <span>{{ m.name }}</span>
              <span class="text-muted-foreground text-xs">{{ m.role }}</span>
            </div>
          </UiAutocompleteItem>
        </UiAutocompleteGroup>
      </UiVeeAutocomplete>
      <UiButton type="submit">Assign</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const teams = [
    {
      name: "Design",
      members: [
        { name: "Ada Lovelace", role: "Lead" },
        { name: "Grace Hopper", role: "Designer" },
      ],
    },
    {
      name: "Engineering",
      members: [
        { name: "Alan Turing", role: "Staff engineer" },
        { name: "Margaret Hamilton", role: "Engineer" },
        { name: "Linus Torvalds", role: "Engineer" },
      ],
    },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(object({ assignee: string().label("Assignee").required() })),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Assigned", { description: `Assigned to ${values.assignee}` });
  });
</script>
```

<!-- /automd -->

::

### Icons and trigger

Use `icon` (or the `icon` slot) for a leading icon, `clearable` for a clear button and `show-trigger` for a chevron that toggles the suggestions.

::prose-show-case

:DocsVeeAutocompleteIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Autocomplete/DocsVeeAutocompleteIcon.vue" code lang="vue" -->

```vue [DocsVeeAutocompleteIcon.vue]
<template>
  <div class="mx-auto max-w-sm space-y-6">
    <UiVeeAutocomplete
      name="search"
      label="Search"
      icon="lucide:search"
      placeholder="Search for a component..."
      :options="components"
      empty-text="No components found"
      clearable
    />
    <UiVeeAutocomplete
      name="location"
      label="Location"
      icon="lucide:map-pin"
      placeholder="Where to?"
      :options="locations"
      show-trigger
    />
  </div>
</template>

<script lang="ts" setup>
  const components = [
    "Accordion",
    "Alert",
    "Autocomplete",
    "Avatar",
    "Badge",
    "Button",
    "Calendar",
    "Card",
    "Checkbox",
    "Dialog",
    "Input",
    "Select",
    "Tabs",
  ];

  const locations = ["Lisbon", "Madrid", "Paris", "Rome", "Vienna"];
</script>
```

<!-- /automd -->

::

### Async suggestions

Load suggestions from your API as the user types. Pass `ignore-filter` so the results are not filtered a second time on the client.

::prose-show-case

:DocsVeeAutocompleteAsync

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Autocomplete/DocsVeeAutocompleteAsync.vue" code lang="vue" -->

```vue [DocsVeeAutocompleteAsync.vue]
<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <UiVeeAutocomplete
        name="city"
        label="City"
        placeholder="Start typing a city..."
        hint="Suggestions are loaded from the server as you type."
        :options="results"
        :empty-text="loading ? 'Searching...' : 'No cities found, your text will be used as is'"
        ignore-filter
        required
      >
        <template #icon>
          <Icon
            :name="loading ? 'lucide:loader-circle' : 'lucide:map-pin'"
            :class="['text-muted-foreground/70 mr-2 size-4 shrink-0', loading && 'animate-spin']"
          />
        </template>
      </UiVeeAutocomplete>
      <UiButton type="submit">Continue</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  const allCities = [
    "Amsterdam",
    "Athens",
    "Austin",
    "Barcelona",
    "Berlin",
    "Boston",
    "Brussels",
    "Chicago",
    "Copenhagen",
    "Dublin",
    "Lisbon",
    "London",
    "Los Angeles",
    "Madrid",
    "Paris",
    "Prague",
    "Rome",
    "San Francisco",
    "Vienna",
  ];

  const results = ref<string[]>([]);
  const loading = ref(false);

  const schema = object({ city: string().label("City").required().min(2) });
  const { handleSubmit, values } = useForm({ validationSchema: toTypedSchema(schema) });

  // Simulates an API call. The server does the filtering, hence `ignore-filter` above.
  const search = async (term: string) => {
    await promiseTimeout(600);
    return allCities.filter((c) => c.toLowerCase().includes(term.toLowerCase())).slice(0, 6);
  };

  watchDebounced(
    () => values.city,
    async (term) => {
      if (!term?.trim()) {
        results.value = [];
        return;
      }
      loading.value = true;
      try {
        results.value = await search(term.trim());
      } finally {
        loading.value = false;
      }
    },
    { debounce: 300 }
  );

  const onSubmit = handleSubmit((vals) => {
    useSonner.success("Saved", { description: `City: ${vals.city}` });
  });
</script>
```

<!-- /automd -->

::

### Disabled

::prose-show-case

:DocsVeeAutocompleteDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Autocomplete/DocsVeeAutocompleteDisabled.vue" code lang="vue" -->

```vue [DocsVeeAutocompleteDisabled.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiVeeAutocomplete
      v-model="plan"
      name="plan"
      label="Plan"
      hint="Contact support to change your plan."
      :options="['Free', 'Pro', 'Team']"
      disabled
    />
  </div>
</template>

<script lang="ts" setup>
  const plan = ref("Pro");
</script>
```

<!-- /automd -->

::

### Form

Autocompletes work like any other Vee field. This example derives email suggestions from the typed text and validates the country against a list, since the field itself accepts any text.

::prose-show-case

:DocsVeeAutocompleteForm

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Autocomplete/DocsVeeAutocompleteForm.vue" code lang="vue" -->

```vue [DocsVeeAutocompleteForm.vue]
<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md" @submit="onSubmit">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Shipping details</UiCardTitle>
          <UiCardDescription>Where should we send your order?</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-5">
          <UiVeeInput name="name" label="Full name" placeholder="Jane Doe" required />
          <UiVeeAutocomplete
            name="email"
            label="Email"
            placeholder="jane@example.com"
            hint="We'll suggest popular providers once you type an @."
            :options="emailSuggestions"
            ignore-filter
            required
          />
          <UiVeeAutocomplete
            name="country"
            label="Country"
            placeholder="Start typing..."
            :options="countries"
            empty-text="No country found"
            show-trigger
            required
          />
        </UiCardContent>

        <UiCardFooter>
          <UiButton type="button" variant="ghost" @click="resetForm()">Reset</UiButton>
          <UiButton :loading="isSubmitting" type="submit">Place order</UiButton>
        </UiCardFooter>
      </UiCard>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

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

  const domains = ["gmail.com", "outlook.com", "icloud.com", "yahoo.com", "proton.me"];

  const schema = object({
    name: string().label("Name").required().min(2).trim(),
    email: string().label("Email").required().email(),
    country: string()
      .label("Country")
      .required()
      .oneOf(countries, "Please choose a country from the list"),
  });

  const { handleSubmit, isSubmitting, resetForm, values } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  // Build suggestions from what the user has typed so far
  const emailSuggestions = computed(() => {
    const [local, partial = ""] = (values.email ?? "").split("@");
    if (!local || !values.email?.includes("@")) return [];
    return domains
      .filter((d) => d.startsWith(partial.toLowerCase()) && d !== partial.toLowerCase())
      .map((d) => `${local}@${d}`);
  });

  const onSubmit = handleSubmit(async (vals) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Order placed", {
      description: `Shipping to ${vals.name} in ${vals.country}.`,
    });
    resetForm();
  });
</script>
```

<!-- /automd -->

::

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `name` | `string` | Field name registered with Vee-Validate. Falls back to a generated id. |
| `label` | `string` | Label shown above the input. |
| `label-hint` | `string` | Extra hint shown next to the label. |
| `hint` | `string` | Helper text. Hidden while there is an error. |
| `placeholder` | `string` | Placeholder of the input. |
| `icon` | `string` | Icon shown at the start of the input. |
| `options` | `(string \| { value: string; disabled?: boolean; group?: string })[]` | Suggestions to render. `value` is the text that fills the input. |
| `empty-text` | `string` | Message shown when nothing matches. While empty (and no `empty` slot is used) the popup stays hidden when there is no match. |
| `clearable` | `boolean` | Shows a button that clears the input. |
| `show-trigger` | `boolean` | Shows a chevron button that toggles the suggestions. |
| `rules` | `any` | Vee-Validate rules (or use a schema on `useForm`). |
| `v-model` | `string` | Current value. |
| `required` | `boolean` | Shows the required asterisk and sets `aria-required`. |
| `disabled` | `boolean` | Prevents interaction. |
| `validate-on-mount` | `boolean` | Validates as soon as the field mounts. |
| `class` | `HTMLAttributes["class"]` | Classes for the wrapper element. |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Replaces the generated suggestions inside the popup. |
| `label` | Custom label. Receives `error-message` and `value`. |
| `icon` | Custom leading icon. |
| `empty` | Custom empty state. |
| `hint` | Custom hint. Receives `error-message` and `value`. |
| `errorMessage` | Custom error message. Receives `error-message` and `value`. |

## Accessibility

The input keeps the combobox semantics of [`UiAutocomplete`](/components/autocomplete#accessibility), including keyboard navigation. The label is linked to the input, the hint and error message are linked with `aria-describedby`, and the input is marked `aria-invalid` (and the wrapper styled) when validation fails. The field is marked as touched when the input loses focus, and like the other Vee components, errors are shown after a value change or on submit.
