---
title: VeeCombobox
description: A combobox component that uses the composition API provided by Vee-Validate to perform validation.
label: New
links:
  - title: Combobox Source
    href: /components/combobox
    icon: lucide:chevrons-up-down
---

## Source code

Click :SourceCodeLink{component="Vee/Combobox.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-combobox"}

## Usage

`UiVeeCombobox` wraps [`UiCombobox`](/components/combobox) with a label, hint and animated error message, and registers the value with the surrounding Vee-Validate form. The form stores the `value` of the selected option (an array of values when `multiple`), while the input and the tags show its `label`. Any other attribute (`open-on-focus`, `ignore-filter`, ...) is forwarded to `UiCombobox`.

### Basic example

`options` takes an array of strings, numbers or `{ value, label, disabled, group }` objects. The form stores the `value`, the input shows the `label`. The `required` prop only adds the asterisk and `aria-required`, so enforce it in your schema.

::prose-show-case

:DocsVeeCombobox

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Combobox/DocsVeeCombobox.vue" code lang="vue" -->

```vue [DocsVeeCombobox.vue]
<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeCombobox
        name="framework"
        label="Framework"
        hint="Pick the framework you want to start with."
        placeholder="Select a framework"
        :options="frameworks"
        empty-text="No framework found"
        required
      />
      <UiButton :loading="isSubmitting" type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  // The form stores the `value` of the selected option, the input shows its `label`
  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const schema = object({
    framework: string().label("Framework").required("Please select a framework"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Saved", { description: `Framework: ${values.framework}` });
  });
</script>
```

<!-- /automd -->

::

### Default value

Bind a value with `v-model` (or `initialValues` on `useForm`). Add `clearable` to show a button that clears the selection.

::prose-show-case

:DocsVeeComboboxDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Combobox/DocsVeeComboboxDefault.vue" code lang="vue" -->

```vue [DocsVeeComboboxDefault.vue]
<template>
  <form class="mx-auto max-w-sm space-y-4">
    <UiVeeCombobox
      v-model="framework"
      name="framework"
      label="Favorite framework"
      label-hint="Optional"
      hint="Starts with a default value. Use the clear button to remove it."
      :options="frameworks"
      clearable
    />
    <p class="text-muted-foreground text-sm">
      Current value:
      <span class="text-foreground font-medium">{{ framework ?? "(empty)" }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const framework = ref<string | undefined>("Nuxt");

  const frameworks = ["Nuxt", "Next.js", "SvelteKit", "Astro", "Remix", "SolidStart", "Angular"];
</script>
```

<!-- /automd -->

::

### Groups

Give options a `group` to render them under a label. Ungrouped options are rendered first.

::prose-show-case

:DocsVeeComboboxGroups

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Combobox/DocsVeeComboboxGroups.vue" code lang="vue" -->

```vue [DocsVeeComboboxGroups.vue]
<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- Options with the same `group` are rendered together under a label -->
      <UiVeeCombobox
        name="timezone"
        label="Timezone"
        placeholder="Select a timezone"
        :options="timezones"
        empty-text="No timezone found"
        show-trigger
      />
      <UiButton type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const timezones = [
    { value: "EST", label: "Eastern Standard Time (EST)", group: "North America" },
    { value: "CST", label: "Central Standard Time (CST)", group: "North America" },
    { value: "PST", label: "Pacific Standard Time (PST)", group: "North America" },
    { value: "GMT", label: "Greenwich Mean Time (GMT)", group: "Europe & Africa" },
    { value: "CET", label: "Central European Time (CET)", group: "Europe & Africa" },
    { value: "EAT", label: "East Africa Time (EAT)", group: "Europe & Africa" },
    { value: "IST", label: "India Standard Time (IST)", group: "Asia" },
    { value: "JST", label: "Japan Standard Time (JST)", group: "Asia" },
    { value: "AEST", label: "Australian Eastern Standard Time (AEST)", group: "Australia" },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({ timezone: string().label("Timezone").required("Please select a timezone") })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", { description: `Timezone: ${values.timezone}` });
  });
</script>
```

<!-- /automd -->

::

### Multiple

Set `multiple` to select more than one option. The value is an array and the selection is shown as removable tags.

::prose-show-case

:DocsVeeComboboxMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Combobox/DocsVeeComboboxMultiple.vue" code lang="vue" -->

```vue [DocsVeeComboboxMultiple.vue]
<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <UiVeeCombobox
        name="languages"
        label="Languages"
        hint="Pick up to 4 languages."
        placeholder="Select languages"
        :options="languages"
        empty-text="No language found"
        multiple
        clearable
        show-trigger
      />
      <UiButton type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { array, object, string } from "yup";

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
  ];

  const schema = object({
    languages: array(string().required())
      .label("Languages")
      .min(1, "Select at least one language")
      .max(4, "Select 4 languages at most"),
  });

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: { languages: ["TypeScript"] },
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", { description: (values.languages ?? []).join(", ") });
  });
</script>
```

<!-- /automd -->

::

### Custom items

The default slot replaces the generated options. With object values, set `by` to compare them and `display-value` to control what the input shows.

::prose-show-case

:DocsVeeComboboxCustomItems

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Combobox/DocsVeeComboboxCustomItems.vue" code lang="vue" -->

```vue [DocsVeeComboboxCustomItems.vue]
<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- The default slot replaces the generated options. Object values need `by` and `display-value`. -->
      <UiVeeCombobox
        name="assignee"
        label="Assignee"
        hint="Search your team by name."
        placeholder="Who is this assigned to?"
        icon="lucide:user-round"
        empty-text="Nobody matches that name"
        by="id"
        :display-value="(m: Member) => m?.name ?? ''"
      >
        <UiComboboxGroup v-for="team in teams" :key="team.name">
          <UiComboboxLabel>{{ team.name }}</UiComboboxLabel>
          <UiComboboxItem v-for="m in team.members" :key="m.id" :value="m" :text-value="m.name">
            <div class="flex w-full items-center justify-between gap-3">
              <span>{{ m.name }}</span>
              <span class="text-muted-foreground text-xs">{{ m.role }}</span>
            </div>
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiVeeCombobox>
      <UiButton type="submit">Assign</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { mixed, object } from "yup";

  type Member = { id: number; name: string; role: string };

  const teams: { name: string; members: Member[] }[] = [
    {
      name: "Design",
      members: [
        { id: 1, name: "Ada Lovelace", role: "Lead" },
        { id: 2, name: "Grace Hopper", role: "Designer" },
      ],
    },
    {
      name: "Engineering",
      members: [
        { id: 3, name: "Alan Turing", role: "Staff engineer" },
        { id: 4, name: "Margaret Hamilton", role: "Engineer" },
        { id: 5, name: "Linus Torvalds", role: "Engineer" },
      ],
    },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({ assignee: mixed<Member>().label("Assignee").required("Please pick someone") })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Assigned", { description: `Assigned to ${values.assignee.name}` });
  });
</script>
```

<!-- /automd -->

::

### Icons and trigger

Use `icon` for a leading icon, `clearable` for a clear button and `show-trigger` for a chevron that toggles the list.

::prose-show-case

:DocsVeeComboboxIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Combobox/DocsVeeComboboxIcon.vue" code lang="vue" -->

```vue [DocsVeeComboboxIcon.vue]
<template>
  <div class="mx-auto max-w-sm space-y-6">
    <UiVeeCombobox
      name="search"
      label="Component"
      icon="lucide:search"
      placeholder="Search for a component..."
      :options="components"
      empty-text="No components found"
      clearable
    />
    <UiVeeCombobox
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
    "Combobox",
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

### Async options

The `search` event is emitted with the text in the input as the user types. Load the options from your API and add `ignore-filter` so they are not filtered a second time.

::prose-show-case

:DocsVeeComboboxAsync

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Combobox/DocsVeeComboboxAsync.vue" code lang="vue" -->

```vue [DocsVeeComboboxAsync.vue]
<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- The `search` event fires as the user types. The server filters, hence `ignore-filter`. -->
      <UiVeeCombobox
        name="city"
        label="City"
        placeholder="Search for a city..."
        hint="Options are loaded from the server as you type."
        :options="results"
        :empty-text="loading ? 'Searching...' : 'No cities found'"
        ignore-filter
        required
        @search="search = $event"
      >
        <template #icon>
          <Icon
            :name="loading ? 'lucide:loader-circle' : 'lucide:map-pin'"
            :class="['text-muted-foreground/70 mr-2 size-4 shrink-0', loading && 'animate-spin']"
          />
        </template>
      </UiVeeCombobox>
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
  const search = ref("");

  const schema = object({ city: string().label("City").required("Please select a city") });
  const { handleSubmit } = useForm({ validationSchema: toTypedSchema(schema) });

  // Simulates an API call
  const fetchCities = async (term: string) => {
    await promiseTimeout(600);
    return allCities.filter((c) => c.toLowerCase().includes(term.toLowerCase())).slice(0, 6);
  };

  watchDebounced(
    search,
    async (term) => {
      if (!term.trim()) {
        results.value = [];
        return;
      }
      loading.value = true;
      try {
        results.value = await fetchCities(term.trim());
      } finally {
        loading.value = false;
      }
    },
    { debounce: 300 }
  );

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", { description: `City: ${values.city}` });
  });
</script>
```

<!-- /automd -->

::

### Disabled

Set `disabled` to prevent interaction.

::prose-show-case

:DocsVeeComboboxDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Combobox/DocsVeeComboboxDisabled.vue" code lang="vue" -->

```vue [DocsVeeComboboxDisabled.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiVeeCombobox
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

A full form with a single and a multiple combobox.

::prose-show-case

:DocsVeeComboboxForm

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Combobox/DocsVeeComboboxForm.vue" code lang="vue" -->

```vue [DocsVeeComboboxForm.vue]
<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md" @submit="onSubmit">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Create project</UiCardTitle>
          <UiCardDescription>Choose a framework and where to deploy it.</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-5">
          <UiVeeInput name="name" label="Project name" placeholder="my-app" required />
          <UiVeeCombobox
            name="framework"
            label="Framework"
            placeholder="Select a framework"
            :options="frameworks"
            empty-text="No framework found"
            show-trigger
            required
          />
          <UiVeeCombobox
            name="regions"
            label="Regions"
            placeholder="Select regions"
            hint="Pick at least one region."
            :options="regions"
            multiple
            clearable
            required
          />
        </UiCardContent>

        <UiCardFooter>
          <UiButton type="button" variant="ghost" @click="resetForm()">Reset</UiButton>
          <UiButton :loading="isSubmitting" type="submit">Create</UiButton>
        </UiCardFooter>
      </UiCard>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { array, object, string } from "yup";

  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const regions = [
    { value: "us-east", label: "US East (N. Virginia)" },
    { value: "us-west", label: "US West (Oregon)" },
    { value: "eu-west", label: "Europe (Ireland)" },
    { value: "eu-central", label: "Europe (Frankfurt)" },
    { value: "ap-southeast", label: "Asia Pacific (Singapore)" },
    { value: "ap-northeast", label: "Asia Pacific (Tokyo)" },
  ];

  const schema = object({
    name: string().label("Project name").required().min(2).trim(),
    framework: string().label("Framework").required("Please select a framework"),
    regions: array(string().required())
      .label("Regions")
      .required("Please select at least one region")
      .min(1, "Please select at least one region"),
  });

  const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (vals) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Project created", {
      description: `${vals.name} (${vals.framework}) in ${(vals.regions ?? []).length} region(s).`,
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
| `options` | `(string \| number \| { value: any; label?: string; disabled?: boolean; group?: string })[]` | Options to render. `value` is stored in the form, `label` (defaults to the value) is displayed. |
| `multiple` | `boolean` | Allow selecting more than one option. The value is an array shown as tags. |
| `by` | `string \| ((a: any, b: any) => boolean)` | Property name or comparator used to compare object values. |
| `display-value` | `(value: any) => string` | Text shown for a selected value. Defaults to the label of the matching option. Needed for object values used with the default slot. |
| `empty-text` | `string` | Message shown when nothing matches. While empty (and no `empty` slot is used) the popup stays hidden when there is no match. |
| `clearable` | `boolean` | Shows a button that clears the selection. |
| `show-trigger` | `boolean` | Shows a chevron button that toggles the list. |
| `rules` | `any` | Vee-Validate rules (or use a schema on `useForm`). |
| `v-model` | `any` | Current value. |
| `required` | `boolean` | Shows the required asterisk and sets `aria-required`. |
| `disabled` | `boolean` | Prevents interaction. |
| `validate-on-mount` | `boolean` | Validates as soon as the field mounts. |
| `class` | `HTMLAttributes["class"]` | Classes for the wrapper element. |

### Events

| Event | Payload | Description |
| --- | --- | --- |
| `search` | `string` | Emitted with the text in the input as the user types. |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Replaces the generated options inside the popup. |
| `label` | Custom label. Receives `error-message` and `value`. |
| `icon` | Custom leading icon. |
| `empty` | Custom empty state. |
| `hint` | Custom hint. Receives `error-message` and `value`. |
| `errorMessage` | Custom error message. Receives `error-message` and `value`. |

## Accessibility

The input keeps the semantics of [`UiCombobox`](/components/combobox#accessibility), including keyboard navigation. The label is linked to the input, the hint and error message are linked with `aria-describedby`, and the input is marked `aria-invalid` (and the wrapper styled) when validation fails. The field is marked as touched when the input loses focus, and like the other Vee components, errors are shown after a value change or on submit.
