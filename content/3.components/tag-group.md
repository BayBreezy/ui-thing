---
title: Tag Group
description: A group of colorful tags that can be selected, removed and navigated with the keyboard.
label: New
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/tag-group.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/tag-group.html#api-reference
    icon: "icon-park-solid:api"
  - title: VeeTagGroup
    href: /forms/veetaggroup
    icon: lucide:square-check
---

## Source code

Click :SourceCodeLink{component="TagGroup"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add tag-group"}

To use the tag group as a field inside a Vee-Validate form, see [VeeTagGroup](/forms/veetaggroup).

## Tag Group vs. Badge vs. Tags Input

| | Tag Group | [Badge](/components/badge) | [Tags Input](/components/tagsinput) |
| --- | --- | --- | --- |
| Purpose | A list of tags the user can focus, select or remove | A static label | An input where the user types new tags |
| Keyboard | Arrow keys, Home/End, typeahead, Delete | None | Typing, arrow keys, Backspace |
| Selection | None, single or multiple | No | No |
| Colors | 26 colors, 4 variants | A few variants | Neutral |

Use a tag group for filters, choice chips and removable lists. Use a badge for a status that does nothing, and a tags input when users create the tags themselves.

## Usage

The group renders a `grid` that needs an accessible name, so always pass an `aria-label` (or `aria-labelledby`). Set `color`, `variant`, `size` and `shape` on the group to style every tag at once, and override any of them on a single tag. The text of a tag is the default slot, which is also used for typeahead.

```vue
<template>
  <UiTagGroup v-model="selected" aria-label="Topics" selection-mode="multiple" color="indigo">
    <UiTagGroupItem value="vue" icon="logos:vue">Vue</UiTagGroupItem>
    <UiTagGroupItem value="nuxt" color="green" removable>Nuxt</UiTagGroupItem>
  </UiTagGroup>
</template>
```

::prose-callout{variant="warning" title="Removing needs @remove"}
Tags are only removable when the group listens to `@remove`. The group does not delete anything itself, it tells you which values were removed and you update your own list. Without the listener, `removable` buttons and the Delete key do nothing.
::

## Examples

### Basic

A removable list. `removable` shows the remove button of a tag and the group emits `remove` with the values to delete. Focus a tag and press Delete or Backspace to remove it too.

::prose-show-case

:DocsTagGroupBasic

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupBasic.vue" code lang="vue" -->

```vue [DocsTagGroupBasic.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <!-- The group needs an accessible name. Removing only works when `@remove` is listened to. -->
    <UiTagGroup aria-label="Skills" color="indigo" @remove="remove">
      <UiTagGroupItem v-for="tag in tags" :key="tag" :value="tag" removable>
        {{ tag }}
      </UiTagGroupItem>
    </UiTagGroup>

    <div class="flex items-center gap-3">
      <UiButton size="sm" variant="outline" :disabled="tags.length === all.length" @click="reset">
        Reset
      </UiButton>
      <p class="text-muted-foreground text-sm">
        Click the x, or focus a tag and press Delete or Backspace.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const all = ["Vue", "Nuxt", "TypeScript", "Tailwind", "Reka UI"];
  const tags = ref([...all]);

  // The group does not remove tags itself, update your own list
  const remove = (values: unknown[]) => {
    tags.value = tags.value.filter((t) => !values.includes(t));
  };

  const reset = () => (tags.value = [...all]);
</script>
```

<!-- /automd -->

::

### Colors

There are 26 colors: `primary`, the full Tailwind palette (`red` to `rose`, plus `slate`, `gray`, `zinc`, `neutral` and `stone`) and the `error`, `warning` and `success` aliases. Every color has light and dark styles.

::prose-show-case

:DocsTagGroupColors

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupColors.vue" code lang="vue" -->

```vue [DocsTagGroupColors.vue]
<template>
  <UiTagGroup aria-label="Colors" class="mx-auto max-w-2xl justify-center">
    <UiTagGroupItem v-for="c in colors" :key="c" :value="c" :color="c" dot>
      {{ c }}
    </UiTagGroupItem>
  </UiTagGroup>
</template>

<script lang="ts" setup>
  const colors = [
    "primary",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "error",
    "warning",
    "success",
  ] as const;
</script>
```

<!-- /automd -->

::

### Variants

`soft` (default) is a tinted pill, `solid` is filled, `outline` only draws the border and `modern` is a neutral card where the color is used for the dot.

::prose-show-case

:DocsTagGroupVariants

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupVariants.vue" code lang="vue" -->

```vue [DocsTagGroupVariants.vue]
<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div v-for="v in variants" :key="v" class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">{{ v }}</p>
      <!-- `color` and `variant` set on the group are the defaults for every tag -->
      <UiTagGroup :aria-label="`${v} tags`" :variant="v">
        <UiTagGroupItem v-for="c in colors" :key="c" :value="c" :color="c">
          {{ c }}
        </UiTagGroupItem>
      </UiTagGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const variants = ["soft", "solid", "outline", "modern"] as const;
  const colors = [
    "gray",
    "primary",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
  ] as const;
</script>
```

<!-- /automd -->

::

### Sizes

Use `size` with `sm`, `md` (default) or `lg`.

::prose-show-case

:DocsTagGroupSizes

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupSizes.vue" code lang="vue" -->

```vue [DocsTagGroupSizes.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <div v-for="s in sizes" :key="s" class="flex items-center gap-3">
      <span class="text-muted-foreground w-6 text-xs font-medium uppercase">{{ s }}</span>
      <UiTagGroup :aria-label="`${s} tags`" :size="s" color="blue">
        <UiTagGroupItem value="design" dot>Design</UiTagGroupItem>
        <UiTagGroupItem value="dev" color="green" dot>Development</UiTagGroupItem>
        <UiTagGroupItem value="qa" color="amber" removable>QA</UiTagGroupItem>
      </UiTagGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md", "lg"] as const;
</script>
```

<!-- /automd -->

::

### Shapes

Use `shape="pill"` (default) or `shape="rounded"`.

::prose-show-case

:DocsTagGroupShapes

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupShapes.vue" code lang="vue" -->

```vue [DocsTagGroupShapes.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <UiTagGroup aria-label="Pill tags" shape="pill" color="violet">
      <UiTagGroupItem value="a">Pill</UiTagGroupItem>
      <UiTagGroupItem value="b" color="pink">Pill</UiTagGroupItem>
      <UiTagGroupItem value="c" color="sky">Pill</UiTagGroupItem>
    </UiTagGroup>

    <UiTagGroup aria-label="Rounded tags" shape="rounded" color="violet">
      <UiTagGroupItem value="a">Rounded</UiTagGroupItem>
      <UiTagGroupItem value="b" color="pink">Rounded</UiTagGroupItem>
      <UiTagGroupItem value="c" color="sky">Rounded</UiTagGroupItem>
    </UiTagGroup>

    <!-- A tag can override the shape of the group -->
    <UiTagGroup aria-label="Mixed tags" shape="rounded" variant="outline" color="emerald">
      <UiTagGroupItem value="a">Rounded</UiTagGroupItem>
      <UiTagGroupItem value="b" shape="pill">Pill</UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Icons

`icon` renders an icon before the text and `trailing-icon` one after it. For anything else use the `leading` and `trailing` slots.

::prose-show-case

:DocsTagGroupIcons

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupIcons.vue" code lang="vue" -->

```vue [DocsTagGroupIcons.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <UiTagGroup aria-label="Leading icons">
      <UiTagGroupItem value="verified" color="green" icon="lucide:badge-check"
        >Verified</UiTagGroupItem
      >
      <UiTagGroupItem value="pending" color="amber" icon="lucide:clock">Pending</UiTagGroupItem>
      <UiTagGroupItem value="failed" color="red" icon="lucide:circle-alert">Failed</UiTagGroupItem>
      <UiTagGroupItem value="new" color="purple" icon="lucide:sparkles">New</UiTagGroupItem>
    </UiTagGroup>

    <UiTagGroup aria-label="Trailing icons" variant="outline">
      <UiTagGroupItem value="docs" color="blue" trailing-icon="lucide:arrow-up-right">
        Docs
      </UiTagGroupItem>
      <UiTagGroupItem value="pro" color="amber" trailing-icon="lucide:crown">Pro</UiTagGroupItem>
      <UiTagGroupItem
        value="beta"
        color="pink"
        icon="lucide:flask-conical"
        trailing-icon="lucide:chevron-down"
      >
        Beta
      </UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Dots

The `modern` variant shows a colored dot by default. Add `dot` to show one on any other variant (an avatar or icon replaces the default dot of `modern`).

::prose-show-case

:DocsTagGroupDots

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupDots.vue" code lang="vue" -->

```vue [DocsTagGroupDots.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <UiTagGroup aria-label="Status" variant="modern">
      <UiTagGroupItem value="online" color="green">Online</UiTagGroupItem>
      <UiTagGroupItem value="away" color="amber">Away</UiTagGroupItem>
      <UiTagGroupItem value="busy" color="red">Busy</UiTagGroupItem>
      <UiTagGroupItem value="offline" color="gray">Offline</UiTagGroupItem>
    </UiTagGroup>

    <!-- The `dot` prop adds a dot to any variant -->
    <UiTagGroup aria-label="Environments" size="lg">
      <UiTagGroupItem value="prod" color="emerald" dot>Production</UiTagGroupItem>
      <UiTagGroupItem value="staging" color="orange" dot>Staging</UiTagGroupItem>
      <UiTagGroupItem value="dev" color="sky" dot>Development</UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Avatars

Use `avatar` to show an image before the text.

::prose-show-case

:DocsTagGroupAvatars

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupAvatars.vue" code lang="vue" -->

```vue [DocsTagGroupAvatars.vue]
<template>
  <UiTagGroup aria-label="Reviewers" class="mx-auto max-w-md" color="gray" variant="modern">
    <UiTagGroupItem v-for="p in people" :key="p.name" :value="p.name" :avatar="p.avatar" removable>
      {{ p.name }}
    </UiTagGroupItem>
  </UiTagGroup>
</template>

<script lang="ts" setup>
  const people = [
    { name: "Kelly King", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Ryan Author", avatar: "https://i.pravatar.cc/150?img=4" },
    { name: "Mia Chen", avatar: "https://i.pravatar.cc/150?img=5" },
  ];
</script>
```

<!-- /automd -->

::

### Single selection

Set `selection-mode="single"` and bind a value with `v-model`. Selected tags show a check mark and a stronger ring. Press Escape to clear the selection, or add `disallow-empty-selection` to prevent it.

::prose-show-case

:DocsTagGroupSingleSelection

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupSingleSelection.vue" code lang="vue" -->

```vue [DocsTagGroupSingleSelection.vue]
<template>
  <div class="mx-auto max-w-md space-y-3">
    <!-- `selection-mode="single"` makes the value a single item. Clicking it again deselects it. -->
    <UiTagGroup
      v-model="size"
      aria-label="Size"
      selection-mode="single"
      color="indigo"
      variant="outline"
    >
      <UiTagGroupItem v-for="s in sizes" :key="s" :value="s">{{ s }}</UiTagGroupItem>
    </UiTagGroup>

    <p class="text-muted-foreground text-sm">
      Selected: <span class="text-foreground font-medium">{{ size ?? "(none)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["XS", "S", "M", "L", "XL"];
  const size = ref<string | undefined>("M");
</script>
```

<!-- /automd -->

::

### Multiple selection

With `selection-mode="multiple"` the `v-model` is an array. Space and Enter toggle the focused tag.

::prose-show-case

:DocsTagGroupMultipleSelection

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupMultipleSelection.vue" code lang="vue" -->

```vue [DocsTagGroupMultipleSelection.vue]
<template>
  <div class="mx-auto max-w-md space-y-3">
    <!-- `disallow-empty-selection` keeps at least one tag selected -->
    <UiTagGroup v-model="selected" aria-label="Topics" selection-mode="multiple" variant="soft">
      <UiTagGroupItem
        v-for="t in topics"
        :key="t.value"
        :value="t.value"
        :color="t.color"
        :icon="t.icon"
      >
        {{ t.label }}
      </UiTagGroupItem>
    </UiTagGroup>

    <p class="text-muted-foreground text-sm">
      Selected:
      <span class="text-foreground font-medium">{{ selected.join(", ") || "(none)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const topics = [
    { value: "design", label: "Design", color: "pink", icon: "lucide:palette" },
    { value: "code", label: "Code", color: "blue", icon: "lucide:code" },
    { value: "music", label: "Music", color: "violet", icon: "lucide:music" },
    { value: "travel", label: "Travel", color: "emerald", icon: "lucide:plane" },
    { value: "food", label: "Food", color: "orange", icon: "lucide:utensils" },
    { value: "games", label: "Games", color: "red", icon: "lucide:gamepad-2" },
  ] as const;

  const selected = ref<string[]>(["code"]);
</script>
```

<!-- /automd -->

::

### Add and remove

A tag group can be selectable and removable at once. When the focused tag is selected, Delete removes every selected tag.

::prose-show-case

:DocsTagGroupRemovable

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupRemovable.vue" code lang="vue" -->

```vue [DocsTagGroupRemovable.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <form class="flex gap-2" @submit.prevent="add">
      <UiInput v-model="draft" placeholder="Add a tag and press Enter" aria-label="New tag" />
      <UiButton type="submit" variant="outline">Add</UiButton>
    </form>

    <!-- Selectable and removable: Delete removes every selected tag when the focused one is selected -->
    <UiTagGroup
      v-model="selected"
      aria-label="Tags"
      selection-mode="multiple"
      variant="solid"
      @remove="remove"
    >
      <UiTagGroupItem v-for="t in tags" :key="t.name" :value="t.name" :color="t.color" removable>
        {{ t.name }}
      </UiTagGroupItem>
    </UiTagGroup>

    <p v-if="!tags.length" class="text-muted-foreground text-sm">No tags left.</p>
    <p v-else class="text-muted-foreground text-sm">
      Select several tags, then press Delete or Backspace to remove them together.
    </p>
  </div>
</template>

<script lang="ts" setup>
  const palette = [
    "red",
    "orange",
    "amber",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
  ] as const;

  const tags = ref<{ name: string; color: (typeof palette)[number] }[]>([
    { name: "urgent", color: "red" },
    { name: "frontend", color: "blue" },
    { name: "bug", color: "orange" },
    { name: "docs", color: "teal" },
  ]);
  const selected = ref<string[]>([]);
  const draft = ref("");

  const add = () => {
    const name = draft.value.trim();
    if (!name || tags.value.some((t) => t.name === name)) return;
    tags.value.push({ name, color: palette[tags.value.length % palette.length]! });
    draft.value = "";
  };

  const remove = (values: unknown[]) => {
    tags.value = tags.value.filter((t) => !values.includes(t.name));
  };
</script>
```

<!-- /automd -->

::

### Custom content

The `leading`, `trailing` and `delete` slots receive `{ selected, disabled }`, so the content can react to the state of the tag.

::prose-show-case

:DocsTagGroupCustom

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupCustom.vue" code lang="vue" -->

```vue [DocsTagGroupCustom.vue]
<template>
  <div class="mx-auto max-w-md">
    <UiTagGroup
      v-model="selected"
      aria-label="Plans"
      selection-mode="single"
      variant="outline"
      shape="rounded"
      size="lg"
    >
      <UiTagGroupItem v-for="p in plans" :key="p.value" :value="p.value" :color="p.color">
        <!-- `leading`, `trailing` and `delete` slots receive `{ selected, disabled }` -->
        <template #leading="{ selected: isSelected }">
          <Icon :name="isSelected ? 'lucide:circle-check-big' : p.icon" class="size-4 shrink-0" />
        </template>

        <span class="font-semibold">{{ p.label }}</span>

        <template #trailing>
          <span class="text-xs opacity-70">{{ p.price }}</span>
        </template>
      </UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>

<script lang="ts" setup>
  const plans = [
    { value: "free", label: "Free", price: "$0", icon: "lucide:leaf", color: "emerald" },
    { value: "pro", label: "Pro", price: "$12", icon: "lucide:rocket", color: "violet" },
    { value: "team", label: "Team", price: "$40", icon: "lucide:users", color: "sky" },
  ] as const;

  const selected = ref<string | undefined>("pro");
</script>
```

<!-- /automd -->

::

### Disabled

Disable the whole group with `disabled`, or single tags. Disabled tags are skipped by keyboard navigation.

::prose-show-case

:DocsTagGroupDisabled

#code

<!-- automd:file src="../../app/components/content/Docs/TagGroup/DocsTagGroupDisabled.vue" code lang="vue" -->

```vue [DocsTagGroupDisabled.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <!-- Disable the whole group -->
    <UiTagGroup aria-label="Locked tags" disabled color="blue" @remove="() => {}">
      <UiTagGroupItem value="a" removable>Locked</UiTagGroupItem>
      <UiTagGroupItem value="b" color="green" removable>Locked</UiTagGroupItem>
    </UiTagGroup>

    <!-- Or only some tags. Disabled tags are skipped by the keyboard. -->
    <UiTagGroup
      v-model="selected"
      aria-label="Options"
      selection-mode="multiple"
      variant="outline"
      color="purple"
    >
      <UiTagGroupItem value="a">Available</UiTagGroupItem>
      <UiTagGroupItem value="b" disabled>Sold out</UiTagGroupItem>
      <UiTagGroupItem value="c">Available</UiTagGroupItem>
      <UiTagGroupItem value="d" disabled>Coming soon</UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>

<script lang="ts" setup>
  const selected = ref<string[]>(["a"]);
</script>
```

<!-- /automd -->

::

## Props

### TagGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `T \| T[]` | | The selected tag(s). An array when `selection-mode` is `multiple`. |
| `default-value` | `T \| T[]` | | Initial selection when uncontrolled. |
| `selection-mode` | `"none" \| "single" \| "multiple"` | `"none"` | Whether tags can be selected. |
| `disallow-empty-selection` | `boolean` | `false` | Prevent the user from deselecting the last selected tag. |
| `escape-key-behavior` | `"clearSelection" \| "none"` | `"clearSelection"` | What the Escape key does. |
| `color` | `TagGroupColor` | | Default color of the tags. |
| `variant` | `"soft" \| "solid" \| "outline" \| "modern"` | | Default variant of the tags. |
| `size` | `"sm" \| "md" \| "lg"` | | Default size of the tags. |
| `shape` | `"pill" \| "rounded"` | | Default shape of the tags. |
| `by` | `string \| ((a: T, b: T) => boolean)` | | Property name or comparator used to compare object values. |
| `loop` | `boolean` | `true` | Wrap keyboard navigation from the last tag to the first and vice versa. |
| `disabled` | `boolean` | | Prevents interaction with the group and all of its tags. |
| `dir` | `"ltr" \| "rtl"` | | Reading direction. |
| `aria-label` | `string` | | Accessible name of the group. Required unless `aria-labelledby` is used. |

The group emits `update:modelValue` and `remove`. The slot receives `modelValue`.

### TagGroupItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `T` | | The unique value of the tag. Required. |
| `color` | `TagGroupColor` | group, then `"gray"` | Color of the tag. |
| `variant` | `TagGroupVariant` | group, then `"soft"` | Variant of the tag. |
| `size` | `TagGroupSize` | group, then `"md"` | Size of the tag. |
| `shape` | `TagGroupShape` | group, then `"pill"` | Shape of the tag. |
| `icon` | `string` | | Icon shown before the text. |
| `trailing-icon` | `string` | | Icon shown after the text. |
| `dot` | `boolean` | `false` | Show a colored dot before the text. |
| `avatar` | `string` | | Image shown before the text. |
| `removable` | `boolean` | `false` | Show the remove button. The group must listen to `@remove`. |
| `delete-icon` | `string` | `"lucide:x"` | Icon of the remove button. |
| `show-check` | `boolean` | `true` | Replace the leading content with a check mark while selected. |
| `disabled` | `boolean` | | Prevents interaction with the tag. |
| `text-value` | `string` | | Plain text used for typeahead and the accessible name. Defaults to the text of the tag. |

The leading content is chosen in this order: check mark (when selected), dot, avatar, icon. The `modern` variant shows a dot by default, unless an avatar or icon is set.

| Slot | Props | Description |
| --- | --- | --- |
| `default` | `{ selected, disabled }` | The text of the tag. Defaults to the `value`. |
| `leading` | `{ selected, disabled }` | Content before the text. |
| `trailing` | `{ selected, disabled }` | Content after the text. |
| `delete` | `{ selected, disabled }` | Replaces the remove button. Only rendered when `removable`. |

### TagGroupItemDelete

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `string` | `"lucide:x"` | Icon shown inside the button. |
| `aria-label` | `string` | `"Remove"` | Override to translate the accessible name. The tag name is appended. |

## Accessibility

The group has the `grid` role (or `group` while it is empty) and every tag is a `row`. Focus moves with a roving tabindex, so the whole group is a single tab stop. Selected tags set `aria-selected`, and additions to the group are announced politely while it has focus.

| Key | Description |
| --- | --- |
| `Tab` | Moves focus into the group, then to the remove button of the focused tag, then out. |
| `ArrowRight` / `ArrowDown` | Moves to the next tag. |
| `ArrowLeft` / `ArrowUp` | Moves to the previous tag. |
| `Home` / `End` | Moves to the first or last tag. |
| `Space` / `Enter` | Toggles the focused tag when the group is selectable. |
| `Delete` / `Backspace` | Removes the focused tag, or all selected tags if it is selected. Needs `@remove`. |
| `Escape` | Clears the selection. |
| Any character | Moves to the next tag that starts with the typed text. |
