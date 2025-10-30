---
title: Code Collapse
description: A collapsible code block wrapper, perfect for showing long code examples without overwhelming your documentation.
---

## Overview

The `ProseCodeCollapse` component wraps code blocks and provides a toggle button to expand or collapse content. It's ideal for lengthy code examples that would take up too much vertical space, starting at a fixed height with a gradient fade effect.

::prose-callout{variant="info" title="Features"}

- **Clean Toggle** - Simple expand/collapse functionality
- **Gradient Fade** - Visual indicator when content is collapsed
- **Customizable Labels** - Configure button text and labels
- **Accessible** - Proper ARIA attributes for screen readers
- **Smart Defaults** - Works great out of the box with sensible defaults

::

## Basic Usage

Wrap any code block to make it collapsible:

:::ShowCase{prose}

::prose-code-collapse
::prose-code-snippet{file="/plugins/mermaid.client.ts" language="ts" title="Mermaid Plugin"}
::
::

#code

```mdc
::prose-code-collapse
::prose-code-snippet{file="/plugins/mermaid.client.ts" language="ts" title="Mermaid Plugin"}
::
::
```

:::

## Custom Labels

Customize the button text and name:

:::ShowCase{prose}

::prose-code-collapse{name="Implementation" openText="Show" closeText="Hide"}

```vue
<script setup lang="ts">
  import { computed, ref } from "vue";
  import type { User } from "@/types";

  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const activeUsers = computed(() => users.value.filter((u) => u.role !== "guest"));

  const totalUsers = computed(() => users.value.length);

  async function fetchUsers() {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch");
      users.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Unknown error";
    } finally {
      loading.value = false;
    }
  }

  async function deleteUser(id: string) {
    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      users.value = users.value.filter((u) => u.id !== id);
    } catch (e) {
      console.error("Delete failed:", e);
    }
  }

  onMounted(() => {
    fetchUsers();
  });
</script>

<template>
  <div class="user-manager">
    <h2>Users ({{ totalUsers }})</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="user-grid">
      <UserCard v-for="user in activeUsers" :key="user.id" :user="user" @delete="deleteUser" />
    </div>
  </div>
</template>
```

::

#code

````mdc
::prose-code-collapse{name="Implementation" openText="Show" closeText="Hide"}

```vue
<script setup lang="ts">
  import { computed, ref } from "vue";
  import type { User } from "@/types";

  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const activeUsers = computed(() => users.value.filter((u) => u.role !== "guest"));

  const totalUsers = computed(() => users.value.length);

  async function fetchUsers() {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch");
      users.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Unknown error";
    } finally {
      loading.value = false;
    }
  }

  async function deleteUser(id: string) {
    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      users.value = users.value.filter((u) => u.id !== id);
    } catch (e) {
      console.error("Delete failed:", e);
    }
  }

  onMounted(() => {
    fetchUsers();
  });
</script>

<template>
  <div class="user-manager">
    <h2>Users ({{ totalUsers }})</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="user-grid">
      <UserCard v-for="user in activeUsers" :key="user.id" :user="user" @delete="deleteUser" />
    </div>
  </div>
</template>
```

::

````

:::

## With Code Snippet

Combine with `::prose-code-snippet` to show actual source files:

:::ShowCase{prose}

::prose-code-collapse{name="Full Source"}
::prose-code-snippet{file="/composables/useFormField.ts" language="ts" title="useFormField Composable"}
::
::

#code

```mdc
::prose-code-collapse{name="Full Source"}
::prose-code-snippet{file="/composables/useFormField.ts" language="typescript" title="useFormField Composable"}
::
::
```

:::

## Custom Icon

Change the toggle icon:

:::ShowCase{prose}

::prose-code-collapse{icon="lucide:code" name="Example"}
::prose-code-snippet{file="/components/Ui/Chip.vue" language="vue" title="Chip Component"}
::
::

#code

```mdc
::prose-code-collapse{icon="lucide:code" name="Example"}
::prose-code-snippet{file="/components/Ui/Chip.vue" language="vue" title="Chip Component"}
::
::
```

:::

## Props

| Prop        | Type     | Default                 | Description                                              |
| :---------- | :------- | :---------------------- | :------------------------------------------------------- |
| `icon`      | `string` | `"lucide:chevron-down"` | Icon displayed on the toggle button                      |
| `name`      | `string` | `"Code"`                | Name/label shown in the button text                      |
| `openText`  | `string` | `"Expand"`              | Text shown when code is collapsed (clickable to expand)  |
| `closeText` | `string` | `"Collapse"`            | Text shown when code is expanded (clickable to collapse) |
| `class`     | `string` | -                       | Additional CSS classes for the root container            |

## Behavior

### Initial State

- Code starts **collapsed** at 200px height
- Gradient fade overlay indicates more content below
- Button shows: "{openText} {name}" (e.g., "Expand Code")

### Expanded State

- Code expands to full height (max 80vh)
- Gradient fade removed
- Button shows: "{closeText} {name}" (e.g., "Collapse Code")

## Accessibility

The component includes proper accessibility features:

- **ARIA Attributes**: `aria-expanded` indicates current state
- **ARIA Labels**: `aria-label` provides context for screen readers
- **Keyboard Support**: Button is focusable and clickable via keyboard
- **Icon Decoration**: Chevron icon is marked `aria-hidden="true"`
- **Semantic HTML**: Uses proper button element for interaction

## Use Cases

::prose-callout{variant="tip" title="When to Use Code Collapse"}

- **Long Examples** - Code snippets over ~30 lines
- **Complete Files** - Full component implementations
- **Optional Details** - Advanced examples users can expand if needed
- **Tutorial Code** - Progressive disclosure of complex solutions
- **API References** - Full endpoint implementations

::

## Best Practices

1. **Use Descriptive Names** - Make it clear what's being collapsed

   ```mdc
   ::prose-code-collapse{name="Full Implementation"}
   ```

2. **Customize Button Text** - Match your documentation tone

   ```mdc
   ::prose-code-collapse{openText="Show" closeText="Hide"}
   ```

3. **Combine with Snippets** - Keep docs in sync with source

   ```mdc
   ::prose-code-collapse
   ::prose-code-snippet{file="/path/to/file.vue"}
   ::
   ::
   ```

4. **Use Sparingly** - Don't collapse everything; save for truly long code

5. **Consider Context** - Some readers want full code upfront, others prefer collapsed

## Related Components

::prose-icon-list
[**ProseCodeSnippet**](/prose/code-snippet) - Import code from files or URL

[**ProseCodeGroup**](/prose/code-group) - Tabbed code snippets

[**ProseCodeTree**](/prose/code-tree) - Interactive file tree with code preview

::
