---
title: Collapsible
description: Hide and reveal content with a collapsible component featuring customizable icons and labels.
---

## Overview

The `ProseCollapsible` component allows you to show and hide content with a clickable trigger. It's perfect for FAQ sections, progressive disclosure, hiding lengthy content, or creating expandable code examples.

## Basic Usage

::ShowCase{prose}

::prose-collapsible
This content is hidden by default and can be revealed by clicking the trigger.
::

#code

```mdc
::prose-collapsible
This content is hidden by default and can be revealed by clicking the trigger.
::
```

::

### With Custom Text

::ShowCase{prose}

::prose-collapsible{open-title="Read more" close-title="Read less"}
You can customize the trigger text to match your content. This makes it clear what action the user will take.
::

#code

```mdc
::prose-collapsible{open-title="Read more" close-title="Read less"}
You can customize the trigger text to match your content. This makes it clear what action the user will take.
::
```

::

## Default Open

Start with the content expanded:

::ShowCase{prose}

::prose-collapsible{default-open}
This content is visible by default. Users can collapse it if they want.
::

#code

```mdc
::prose-collapsible{default-open}
This content is visible by default. Users can collapse it if they want.
::
```

::

## Custom Icons

Change the icons to match your design:

::ShowCase{prose}

::prose-collapsible{open-icon="lucide:chevron-down" close-icon="lucide:chevron-right"}
Using chevron icons provides a different visual style that some users might prefer.
::

::prose-collapsible{open-icon="lucide:eye" close-icon="lucide:eye-off" open-title="Reveal answer" close-title="Hide answer"}
Use icons that match the semantic meaning of your content.
::

#code

```mdc
::prose-collapsible{open-icon="lucide:chevron-down" close-icon="lucide:chevron-right"}
Using chevron icons provides a different visual style that some users might prefer.
::

::prose-collapsible{open-icon="lucide:eye" close-icon="lucide:eye-off" open-title="Reveal answer" close-title="Hide answer"}
Use icons that match the semantic meaning of your content.
::
```

::

## Common Use Cases

### FAQ Section

::prose-callout{variant="info" title="Frequently Asked Questions"}
::

**How do I install this library?**

::prose-collapsible{open-title="Show installation steps" close-title="Hide installation steps"}

1. Install the package:

::prose-pm-install{name="my-library"}
::

2. Import in your app:

```ts
import { MyComponent } from "my-library";
```

3. Use the component:

```vue
<template>
  <MyComponent />
</template>
```

::

**What are the system requirements?**

::prose-collapsible

- Node.js 18 or higher
- Vue 3.3 or higher
- TypeScript 5.0 or higher (optional but recommended)

::

**Is it compatible with Nuxt 3?**

::prose-collapsible
Yes! This library is fully compatible with Nuxt 3. Simply install it as a dependency and import the components you need.
::

### Code Examples

Show additional code without overwhelming the page:

::prose-collapsible{open-title="Show complete example" close-title="Hide example"}

```vue
<script setup lang="ts">
  import { computed, ref } from "vue";

  const count = ref(0);
  const doubled = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
  button {
    padding: 0.5rem 1rem;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  button:hover {
    background: #35495e;
  }
</style>
```

::

### Long Content

Hide lengthy explanations until needed:

::prose-collapsible{open-title="Read full explanation" close-title="Collapse explanation"}
**Understanding Reactivity in Vue 3**

Vue 3 introduces a new reactivity system based on JavaScript Proxies. This provides several advantages over Vue 2's Object.defineProperty-based system:

1. **Better Performance**: Proxies allow Vue to track dependencies more efficiently
2. **Full Array Support**: No need for special array methods
3. **New Property Detection**: Adding new properties is automatically reactive
4. **Map and Set Support**: Works with built-in JavaScript collections

The `ref()` function creates a reactive reference to a value:

```ts
const count = ref(0);
console.log(count.value); // 0
count.value++; // triggers reactivity
```

The `reactive()` function creates a reactive object:

```ts
const state = reactive({ count: 0 });
console.log(state.count); // 0
state.count++; // triggers reactivity
```

**When to use `ref` vs `reactive`:**

- Use `ref` for primitive values (numbers, strings, booleans)
- Use `reactive` for objects and arrays
- `ref` requires `.value` to access/modify
- `reactive` can be used directly but loses reactivity when destructured

::

### Progressive Disclosure

Reveal information step by step:

::prose-callout{variant="tip" title="Tutorial: Building Your First Component"}
::

**Step 1: Create the Component File**

::prose-collapsible{default-open open-title="Show details" close-title="Hide details"}
Create a new file `MyButton.vue`:

```vue
<template>
  <button>Click me</button>
</template>
```

::

**Step 2: Add Props**

::prose-collapsible{open-title="Show details" close-title="Hide details"}
Add props to make your button customizable:

```vue
<script setup lang="ts">
  defineProps<{
    label: string;
    variant?: "primary" | "secondary";
  }>();
</script>

<template>
  <button :class="variant">
    {{ label }}
  </button>
</template>
```

::

**Step 3: Add Emits**

::prose-collapsible{open-title="Show details" close-title="Hide details"}
Define events your component can emit:

```vue
<script setup lang="ts">
  const props = defineProps<{
    label: string;
    variant?: "primary" | "secondary";
  }>();

  const emit = defineEmits<{
    click: [];
  }>();
</script>

<template>
  <button :class="variant" @click="emit('click')">
    {{ label }}
  </button>
</template>
```

::

### Spoiler Content

Hide spoilers or answers:

::prose-callout{variant="warning" title="Quiz Question"}
What is the time complexity of accessing an element in a hash table?
::

::prose-collapsible{open-icon="lucide:lock-open" close-icon="lucide:lock" open-title="Reveal answer" close-title="Hide answer"}
**Answer:** O(1) on average

Hash tables provide constant-time average case for insertions, deletions, and lookups. However, in the worst case (when many collisions occur), operations can degrade to O(n).
::

## Props

| Prop           | Type      | Default          | Description                                           |
| :------------- | :-------- | :--------------- | :---------------------------------------------------- |
| `openTitle`    | `string`  | `"Show more"`    | Text shown when content is hidden (trigger to open)   |
| `closeTitle`   | `string`  | `"Show less"`    | Text shown when content is visible (trigger to close) |
| `openIcon`     | `string`  | `"lucide:minus"` | Icon displayed when content is open                   |
| `closeIcon`    | `string`  | `"lucide:plus"`  | Icon displayed when content is closed                 |
| `defaultOpen`  | `boolean` | `false`          | Whether content is expanded by default                |
| `triggerClass` | `string`  | -                | Additional CSS classes for trigger button             |
| `contentClass` | `string`  | -                | Additional CSS classes for content area               |

## Icon Options

Popular icon combinations:

| Open Icon             | Close Icon             | Use Case                 |
| :-------------------- | :--------------------- | :----------------------- |
| `lucide:minus`        | `lucide:plus`          | Default, general purpose |
| `lucide:chevron-up`   | `lucide:chevron-down`  | Vertical expansion       |
| `lucide:chevron-left` | `lucide:chevron-right` | Horizontal flow          |
| `lucide:eye-off`      | `lucide:eye`           | Show/hide content        |
| `lucide:lock-open`    | `lucide:lock`          | Reveal secrets/spoilers  |
| `lucide:x`            | `lucide:maximize-2`    | Collapse/expand          |

## Vue Component Usage

You can also use this component in your Vue files:

```vue
<template>
  <div>
    <!-- Basic usage -->
    <ProseCollapsible>
      <p>Hidden content goes here</p>
    </ProseCollapsible>

    <!-- With custom text -->
    <ProseCollapsible open-title="Show details" close-title="Hide details">
      <p>More detailed information</p>
    </ProseCollapsible>

    <!-- With custom icons -->
    <ProseCollapsible open-icon="lucide:chevron-up" close-icon="lucide:chevron-down">
      <p>Content with chevron icons</p>
    </ProseCollapsible>

    <!-- Default open -->
    <ProseCollapsible default-open>
      <p>This starts expanded</p>
    </ProseCollapsible>

    <!-- With custom classes -->
    <ProseCollapsible
      trigger-class="text-primary font-bold"
      content-class="bg-muted p-4 rounded-lg"
    >
      <p>Styled content</p>
    </ProseCollapsible>
  </div>
</template>
```

## Nested Collapsibles

You can nest collapsibles for hierarchical content:

::prose-collapsible{open-title="Show frameworks" close-title="Hide frameworks"}

**Frontend Frameworks**

::prose-collapsible{open-title="Vue.js details" close-title="Hide Vue.js"}
Vue.js is a progressive JavaScript framework for building user interfaces. Key features include:

- Reactive data binding
- Component-based architecture
- Virtual DOM
- Single-file components

::

::prose-collapsible{open-title="React details" close-title="Hide React"}
React is a JavaScript library for building user interfaces. Key features include:

- Component-based architecture
- Virtual DOM
- One-way data binding
- JSX syntax

::

::prose-collapsible{open-title="Svelte details" close-title="Hide Svelte"}
Svelte is a compiler that generates minimal JavaScript code. Key features include:

- No virtual DOM
- Reactive by default
- Smaller bundle sizes
- Easy to learn syntax

::

::

## Styling

The component uses sensible defaults but can be customized:

```vue
<ProseCollapsible
  trigger-class="text-lg font-semibold text-primary hover:text-primary/80"
  content-class="mt-4 p-4 bg-muted/50 rounded-lg border"
>
  Custom styled content
</ProseCollapsible>
```

## Accessibility

The component is built on top of `UiCollapsible` which handles:

- Proper ARIA attributes
- Keyboard navigation (Space/Enter to toggle)
- Focus management
- Screen reader support

## Best Practices

::prose-callout{variant="tip" title="Tips for Using Collapsibles"}

- Use descriptive trigger text that clearly indicates what will be revealed
- Don't hide critical information that users need to see immediately
- Consider starting important content expanded (`default-open`)
- Use consistent icon patterns across your application
- Avoid nesting collapsibles more than 2-3 levels deep
- Test with keyboard navigation to ensure accessibility

::

## Examples in Context

### API Documentation

::prose-callout{variant="info" title="API Reference"}
::

**`createUser(data: UserData): Promise<User>`**

Creates a new user in the system.

::prose-collapsible{open-title="Show parameters" close-title="Hide parameters"}
**Parameters:**

| Name         | Type                | Required | Description                 |
| :----------- | :------------------ | :------- | :-------------------------- |
| `data.name`  | `string`            | Yes      | User's full name            |
| `data.email` | `string`            | Yes      | User's email address        |
| `data.role`  | `'admin' \| 'user'` | No       | User role (default: 'user') |

::

::prose-collapsible{open-title="Show example" close-title="Hide example"}

```ts
const user = await createUser({
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
});
```

::

### Migration Guide

::prose-callout{variant="warning" title="Breaking Changes in v2.0"}
::

::prose-collapsible{open-title="Show affected components" close-title="Hide list"}
The following components have breaking changes:

- `Button` - `variant` prop renamed to `appearance`
- `Input` - `onChange` removed, use `v-model` instead
- `Select` - Now uses native select element
- `Modal` - `visible` prop renamed to `open`

::

::prose-collapsible{open-title="Show migration steps" close-title="Hide steps"}

1. Update all `variant` props to `appearance`
2. Replace `onChange` handlers with `v-model`
3. Test your components thoroughly
4. Update your tests to reflect the changes

::
