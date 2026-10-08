---
title: VeeTagGroup
description: A selectable tag group that uses the composition API provided by Vee-Validate to perform validation.
label: New
links:
  - title: TagGroup Source
    href: /components/tag-group
    icon: lucide:tags
---

## Source code

Click :SourceCodeLink{component="Vee/TagGroup.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-tag-group"}

## Usage

`UiVeeTagGroup` wraps [`UiTagGroup`](/components/tag-group) as a choice field: it renders `options` as selectable tags, adds a label, hint and animated error message, and registers the selection with the surrounding Vee-Validate form. The value is an array of the selected `value`s, or a single value (or `undefined`) with `selection-mode="single"`. The label names the group for assistive technology and the hint and error message are linked with `aria-describedby`.

Any other attribute (`aria-label`, `loop`, `by`, ...) is forwarded to `UiTagGroup`. Tags are not removable here since a form field has a fixed list of options, use `UiTagGroup` with `@remove` for that.

### Basic example

`options` takes strings, numbers or `{ value, label, color, variant, icon, avatar, dot, disabled }` objects. The `required` prop only adds the asterisk and `aria-required`, so enforce it in your schema.

::prose-show-case

:DocsVeeTagGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/TagGroup/DocsVeeTagGroup.vue" code lang="vue" -->

```vue [DocsVeeTagGroup.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeTagGroup
        name="interests"
        label="Interests"
        hint="Pick the topics you want to hear about."
        :options="interests"
        color="indigo"
        required
      />
      <UiButton :loading="isSubmitting" type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { array, object, string } from "yup";

  const interests = ["Design", "Engineering", "Marketing", "Product", "Sales", "Support"];

  const schema = object({
    interests: array(string().required()).label("Interests").min(1, "Pick at least one interest"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Saved", { description: (values.interests ?? []).join(", ") });
  });
</script>
```

<!-- /automd -->

::

### Default value

Bind a value with `v-model` (or `initialValues` on `useForm`).

::prose-show-case

:DocsVeeTagGroupDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/TagGroup/DocsVeeTagGroupDefault.vue" code lang="vue" -->

```vue [DocsVeeTagGroupDefault.vue]
<template>
  <form class="mx-auto max-w-md space-y-4">
    <UiVeeTagGroup
      v-model="selected"
      name="languages"
      label="Languages"
      label-hint="Optional"
      hint="Starts with two languages selected."
      :options="languages"
      variant="outline"
      color="teal"
    />
    <p class="text-muted-foreground text-sm">
      Current value:
      <span class="text-foreground font-medium">{{ selected.join(", ") || "(empty)" }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const selected = ref(["TypeScript", "Go"]);

  const languages = ["TypeScript", "JavaScript", "Python", "Go", "Rust", "Ruby", "Kotlin"];
</script>
```

<!-- /automd -->

::

### Single selection

Use `selection-mode="single"` for one value. Add `disallow-empty-selection` when the user has to keep a choice.

::prose-show-case

:DocsVeeTagGroupSingle

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/TagGroup/DocsVeeTagGroupSingle.vue" code lang="vue" -->

```vue [DocsVeeTagGroupSingle.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- `single` stores one value (or `undefined`). Add `disallow-empty-selection` to force a choice. -->
      <UiVeeTagGroup
        name="size"
        label="T-shirt size"
        selection-mode="single"
        :options="sizes"
        variant="solid"
        color="primary"
        disallow-empty-selection
        required
      />
      <UiButton type="submit">Add to cart</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const sizes = ["XS", "S", "M", "L", "XL"];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({ size: string().label("Size").required("Pick a size") })
    ),
    initialValues: { size: "M" },
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Added to cart", { description: `Size ${values.size}` });
  });
</script>
```

<!-- /automd -->

::

### Colors

Give every option its own `color`, `icon`, `avatar` or `dot`. The `color`, `variant`, `size` and `shape` props of the field are the defaults for all tags.

::prose-show-case

:DocsVeeTagGroupColors

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/TagGroup/DocsVeeTagGroupColors.vue" code lang="vue" -->

```vue [DocsVeeTagGroupColors.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- Every option can have its own color, icon, avatar or dot -->
      <UiVeeTagGroup
        name="labels"
        label="Labels"
        hint="Each label has its own color."
        :options="labels"
      />
      <UiButton type="submit">Apply</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { array, object, string } from "yup";

  const labels = [
    { value: "bug", label: "Bug", color: "red", icon: "lucide:bug" },
    { value: "feature", label: "Feature", color: "green", icon: "lucide:sparkles" },
    { value: "docs", label: "Docs", color: "blue", icon: "lucide:book-open" },
    { value: "design", label: "Design", color: "pink", icon: "lucide:palette" },
    { value: "perf", label: "Performance", color: "amber", icon: "lucide:zap" },
    { value: "wontfix", label: "Won't fix", color: "gray", icon: "lucide:ban" },
  ] as const;

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(object({ labels: array(string().required()).label("Labels") })),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Applied", { description: (values.labels ?? []).join(", ") || "No labels" });
  });
</script>
```

<!-- /automd -->

::

### Variants

`soft`, `solid`, `outline` and `modern`.

::prose-show-case

:DocsVeeTagGroupVariants

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/TagGroup/DocsVeeTagGroupVariants.vue" code lang="vue" -->

```vue [DocsVeeTagGroupVariants.vue]
<template>
  <div class="mx-auto max-w-md space-y-6">
    <UiVeeTagGroup
      v-for="v in variants"
      :key="v"
      :name="`variant-${v}`"
      :label="v"
      :variant="v"
      :options="options"
      color="violet"
    />
  </div>
</template>

<script lang="ts" setup>
  const variants = ["soft", "solid", "outline", "modern"] as const;
  const options = ["Alpha", "Beta", "Gamma", "Delta"];
</script>
```

<!-- /automd -->

::

### Custom items

The `item` slot customizes the content of every tag and receives `{ option, selected, disabled }`. Use the default slot to render your own `UiTagGroupItem`s instead of `options`.

::prose-show-case

:DocsVeeTagGroupCustomItems

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/TagGroup/DocsVeeTagGroupCustomItems.vue" code lang="vue" -->

```vue [DocsVeeTagGroupCustomItems.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- The `item` slot customizes the content of every tag -->
      <UiVeeTagGroup
        name="members"
        label="Assign to"
        hint="Select everyone who should be notified."
        :options="members"
        variant="modern"
        size="lg"
      >
        <template #item="{ option, selected }">
          <span :class="selected && 'font-semibold'">{{ option.label }}</span>
          <span class="text-muted-foreground text-xs">{{ option.role }}</span>
        </template>
      </UiVeeTagGroup>
      <UiButton type="submit">Notify</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { array, object, string } from "yup";

  const members = [
    { value: "ada", label: "Ada", role: "Lead", avatar: "https://i.pravatar.cc/150?img=1" },
    { value: "grace", label: "Grace", role: "Design", avatar: "https://i.pravatar.cc/150?img=5" },
    { value: "alan", label: "Alan", role: "Eng", avatar: "https://i.pravatar.cc/150?img=4" },
  ];

  const schema = object({
    members: array(string().required()).label("Members").min(1, "Select at least one person"),
  });

  const { handleSubmit } = useForm({ validationSchema: toTypedSchema(schema) });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Notified", { description: `${values.members?.length ?? 0} people` });
  });
</script>
```

<!-- /automd -->

::

### Disabled

Set `disabled` on the field, or `disabled` on single options.

::prose-show-case

:DocsVeeTagGroupDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/TagGroup/DocsVeeTagGroupDisabled.vue" code lang="vue" -->

```vue [DocsVeeTagGroupDisabled.vue]
<template>
  <div class="mx-auto max-w-md space-y-6">
    <UiVeeTagGroup
      v-model="plans"
      name="plans"
      label="Plans"
      hint="Contact support to change your plans."
      :options="['Free', 'Pro', 'Team']"
      color="sky"
      disabled
    />

    <UiVeeTagGroup
      name="regions"
      label="Regions"
      hint="Some regions are not available yet."
      :options="regions"
      color="emerald"
    />
  </div>
</template>

<script lang="ts" setup>
  const plans = ref(["Pro"]);

  const regions = [
    { value: "us", label: "United States" },
    { value: "eu", label: "Europe" },
    { value: "ap", label: "Asia Pacific", disabled: true },
    { value: "sa", label: "South America", disabled: true },
  ];
</script>
```

<!-- /automd -->

::

### Form

A full form with a single and a multiple selection field.

::prose-show-case

:DocsVeeTagGroupForm

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/TagGroup/DocsVeeTagGroupForm.vue" code lang="vue" -->

```vue [DocsVeeTagGroupForm.vue]
<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md" @submit="onSubmit">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Create issue</UiCardTitle>
          <UiCardDescription>Describe the problem and label it.</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-5">
          <UiVeeInput name="title" label="Title" placeholder="Something is broken" required />
          <UiVeeTagGroup
            name="priority"
            label="Priority"
            selection-mode="single"
            :options="priorities"
            disallow-empty-selection
            required
          />
          <UiVeeTagGroup
            name="labels"
            label="Labels"
            hint="Pick between 1 and 3 labels."
            :options="labels"
            variant="soft"
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

  const priorities = [
    { value: "low", label: "Low", color: "sky", dot: true },
    { value: "medium", label: "Medium", color: "amber", dot: true },
    { value: "high", label: "High", color: "orange", dot: true },
    { value: "critical", label: "Critical", color: "red", dot: true },
  ] as const;

  const labels = [
    { value: "bug", label: "Bug", color: "red" },
    { value: "feature", label: "Feature", color: "green" },
    { value: "docs", label: "Docs", color: "blue" },
    { value: "design", label: "Design", color: "pink" },
    { value: "perf", label: "Performance", color: "amber" },
  ] as const;

  const schema = object({
    title: string().label("Title").required().min(3).trim(),
    priority: string().label("Priority").required("Please pick a priority"),
    labels: array(string().required())
      .label("Labels")
      .min(1, "Pick at least one label")
      .max(3, "Pick 3 labels at most"),
  });

  const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: { priority: "medium", labels: [] },
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Issue created", {
      description: `${values.title} (${values.priority}) with ${(values.labels ?? []).length} label(s).`,
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
| `label` | `string` | Label shown above the tags. |
| `label-hint` | `string` | Extra hint shown next to the label. |
| `hint` | `string` | Helper text. Hidden while there is an error. |
| `options` | `(string \| number \| { value: any; label?: string; color?: TagGroupColor; variant?: TagGroupVariant; icon?: string; avatar?: string; dot?: boolean; disabled?: boolean })[]` | Tags to render. `value` is stored in the form, `label` (defaults to the value) is displayed. |
| `selection-mode` | `"single" \| "multiple"` | Whether one or several tags can be selected. Defaults to `"multiple"`. |
| `disallow-empty-selection` | `boolean` | Prevent the user from deselecting the last selected tag. |
| `color` | `TagGroupColor` | Default color of the tags. |
| `variant` | `"soft" \| "solid" \| "outline" \| "modern"` | Default variant of the tags. |
| `size` | `"sm" \| "md" \| "lg"` | Default size of the tags. |
| `shape` | `"pill" \| "rounded"` | Default shape of the tags. |
| `rules` | `any` | Vee-Validate rules (or use a schema on `useForm`). |
| `v-model` | `any` | Current value. |
| `required` | `boolean` | Shows the required asterisk and sets `aria-required`. |
| `disabled` | `boolean` | Prevents interaction. |
| `validate-on-mount` | `boolean` | Validates as soon as the field mounts. |
| `class` | `HTMLAttributes["class"]` | Classes for the wrapper element. |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Replaces the generated tags. Render your own `UiTagGroupItem`s. |
| `item` | Content of a generated tag. Receives `option` (including any extra fields you added to it), `selected` and `disabled`. |
| `label` | Custom label. Receives `error-message` and `value`. |
| `hint` | Custom hint. Receives `error-message` and `value`. |
| `errorMessage` | Custom error message. Receives `error-message` and `value`. |

## Accessibility

The field keeps all the keyboard interactions of [`UiTagGroup`](/components/tag-group#accessibility). The label names the group with `aria-labelledby`, the hint and error message are linked with `aria-describedby`, and the group is outlined when validation fails. The field is marked as touched once focus leaves the whole group, and like the other Vee components, errors are shown after a value change or on submit.
