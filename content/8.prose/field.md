---
title: Field & Field Group
description: Display component props or configuration options in a beautiful, readable format instead of traditional tables.
---

## Introduction

The `Field` and `Field Group` components provide an elegant way to document component props, configuration options, or any structured data. Instead of cramped tables, these components offer a spacious, readable layout with support for markdown content, badges, and flexible styling options.

## Source code

Click :SourceCodeLink{component="Field" folder="content/prose"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Field

The `ProseField` component displays a single property or configuration item with its name, type, description, and default value.

### Basic Usage

::ShowCase{prose}

::prose-field{name="variant" type="string" required default-value="default" description="The visual style variant of the component." tip="This prop is required." tip-icon="lucide:info"}
::

#code

```mdc
::prose-field{name="variant" type="string" required default-value="default" description="The visual style variant of the component." tip="This prop is required." tip-icon="lucide:info"}
::
```

::

### Required Field

Mark important fields as required with the `required` prop.

::ShowCase{prose}

::prose-field{name="onSubmit" type="() => void" required}
Callback function called when the form is submitted.
::

#code

```mdc
::prose-field{name="onSubmit" type="() => void" required}
Callback function called when the form is submitted.
::
```

::

### Complex Type

Display complex types like unions or function signatures.

::ShowCase{prose}

::prose-field{name="size" type="sm | md | lg | xl" default-value="md"}
Controls the size of the component. Accepts predefined size values.
::

#code

```mdc
::prose-field{name="size" type="sm | md | lg | xl" default-value="md"}
Controls the size of the component. Accepts predefined size values.
::
```

::

### With Markdown Description

Use the default slot to provide rich markdown content as the description.

::ShowCase{prose}

::prose-field{name="theme" type="object" default-value="{}"}

The theme configuration object. You can customize:

- `primaryColor` - Main theme color
- `borderRadius` - Corner radius (0-20px)
- `fontFamily` - Custom font stack

Example:

```ts
{
  primaryColor: '#3b82f6',
  borderRadius: 8,
  fontFamily: 'Inter, sans-serif'
}
```

::

#code

````mdc
::prose-field{name="theme" type="object" default-value="{}"}

The theme configuration object. You can customize:

- `primaryColor` - Main theme color
- `borderRadius` - Corner radius (0-20px)
- `fontFamily` - Custom font stack

Example:

```ts
{
  primaryColor: '#3b82f6',
  borderRadius: 8,
  fontFamily: 'Inter, sans-serif'
}
```

::

````

::

### Tooltip

Provide additional context with a tooltip using the `tip` prop.

You can display a custom icon in the tooltip using the `tip-icon` prop.

::ShowCase{prose}

::prose-field{name="isOpen" type="boolean" default-value="false" tip="Controls whether the modal is open or closed." tip-icon="lucide:info"}
Indicates if the modal dialog is currently open.
::

#code

```mdc
::prose-field{name="isOpen" type="boolean" default-value="false" tip="Controls whether the modal is open or closed." tip-icon="lucide:info"}
Indicates if the modal dialog is currently open.
::
```

::

### Custom Name Slot

Override the name display with custom content using the `#name` slot.

::ShowCase{prose}

::prose-field{type="boolean" default-value="false"}
Controlled open state of the dialog component.
#name
<code class="text-emerald-500">v-model:open</code>
::

#code

```mdc
::prose-field{type="boolean" default-value="false"}
Controlled open state of the dialog component.
#name
<code class="text-emerald-500">v-model:open</code>
::
```

::

### Custom Default Value Slot

Provide custom rendering for default values using the `#default-value` slot.

::ShowCase{prose}

::prose-field{name="colors"}
An example of using a custom default value slot.
#default-value

<div>
<span class="size-2.5 rounded-full bg-red-500 inline-block"></span>
<span class="size-2.5 rounded-full bg-blue-500 inline-block mx-2"></span>
<span class="size-2.5 rounded-full bg-green-500 inline-block"></span>
</div>

::

#code

```mdc
::prose-field{name="colors"}
An example of using a custom default value slot.
#default-value

<div>
<span class="size-2.5 rounded-full bg-red-500 inline-block"></span>
<span class="size-2.5 rounded-full bg-blue-500 inline-block mx-2"></span>
<span class="size-2.5 rounded-full bg-green-500 inline-block"></span>
</div>

::
```

::

## Field Group

The `ProseFieldGroup` component is a container for multiple `ProseField` components, providing consistent layout and optional styling variants.

### Basic Field Group

Group related fields together in a clean column layout.

:::ShowCase{prose}

::prose-field-group

:prose-field{name="variant" type="string" default-value="default" description="The visual style variant of the button."}

:prose-field{name="size" type="string" default-value="md" description="Controls the size of the button."}

:prose-field{name="disabled" type="boolean" default-value="false" description="Whether the button is disabled."}

::
#code

```mdc
::prose-field-group

:prose-field{name="variant" type="string" default-value="default" description="The visual style variant of the button."}

:prose-field{name="size" type="string" default-value="md" description="Controls the size of the button."}

:prose-field{name="disabled" type="boolean" default-value="false" description="Whether the button is disabled."}

::
```

:::

### Bordered Fields

Add visual separators between fields using the `bordered` variant.

:::ShowCase{prose}

::prose-field-group{variant="bordered"}

::prose-field{name="open" type="boolean" default-value="false"}
Controls the open state of the dialog.
::

::prose-field{name="modal" type="boolean" default-value="true"}
Whether the dialog should be modal.
::

::prose-field{name="onClose" type="() => void"}
Callback when the dialog closes.
::

::

#code

```mdc
::prose-field-group{variant="bordered"}

::prose-field{name="open" type="boolean" default-value="false"}
Controls the open state of the dialog.
::

::prose-field{name="modal" type="boolean" default-value="true"}
Whether the dialog should be modal.
::

::prose-field{name="onClose" type="() => void"}
Callback when the dialog closes.
::

::
```

:::

### Striped Background

Use alternating backgrounds to improve readability with the `striped` variant.

:::ShowCase{prose}

::prose-field-group{variant="striped"}

::prose-field{name="placeholder" type="string"}
Placeholder text for the input.
::

::prose-field{name="value" type="string"}
The input value.
::

::prose-field{name="onChange" type="(value: string) => void"}
Callback when value changes.
::

::prose-field{name="disabled" type="boolean" default-value="false"}
Whether the input is disabled.
::

::

#code

```mdc
::prose-field-group{variant="striped"}

::prose-field{name="placeholder" type="string"}
Placeholder text for the input.
::

::prose-field{name="value" type="string"}
The input value.
::

::prose-field{name="onChange" type="(value: string) => void"}
Callback when value changes.
::

::prose-field{name="disabled" type="boolean" default-value="false"}
Whether the input is disabled.
::

::
```

:::

### All Variants Combined

Combine `bordered`, `divided`, and `striped` for maximum visual organization with the `all` variant.

:::ShowCase{prose}

::prose-field-group{variant="all"}

::prose-field{name="items" type="Array<Item>" required}
Array of items to display in the list.
::

::prose-field{name="selectedId" type="string | null" default-value="null"}
The ID of the currently selected item.
::

::prose-field{name="onSelect" type="(item: Item) => void"}
Callback when an item is selected.
::

::prose-field{name="loading" type="boolean" default-value="false"}
Whether the list is in a loading state.
::

::prose-field{name="emptyMessage" type="string" default-value="No items found"}
Message to show when the list is empty.
::

::

#code

```mdc
::prose-field-group{variant="all"}

::prose-field{name="items" type="Array<Item>" required}
Array of items to display in the list.
::

::prose-field{name="selectedId" type="string | null" default-value="null"}
The ID of the currently selected item.
::

::prose-field{name="onSelect" type="(item: Item) => void"}
Callback when an item is selected.
::

::prose-field{name="loading" type="boolean" default-value="false"}
Whether the list is in a loading state.
::

::prose-field{name="emptyMessage" type="string" default-value="No items found"}
Message to show when the list is empty.
::

::
```

:::

## Real-World Example

Here's how you might document a complete component API:

:::ShowCase{prose}

<h3 class="mt-0">Button Props</h3>

::prose-field-group{variant="bordered"}

::prose-field{name="variant" type="default | destructive | outline | ghost | link" default-value="default"}
The visual style variant of the button.

- `default` - Standard button appearance
- `destructive` - Red/danger styling for destructive actions
- `outline` - Outlined button with transparent background
- `ghost` - Minimal styling with hover effect
- `link` - Styled as a hyperlink

::

::prose-field{name="size" type="sm | md | lg | icon" default-value="md"}
Controls the size and padding of the button.
::

::prose-field{name="disabled" type="boolean" default-value="false"}
When `true`, the button cannot be interacted with and appears visually disabled.
::

::prose-field{name="loading" type="boolean" default-value="false"}
Shows a loading spinner and disables the button while an async action is in progress.
::

::prose-field{name="onClick" type="(event: MouseEvent) => void"}
Callback function triggered when the button is clicked.
::

::

#code

```mdc
<h3 class="mt-0">Button Props</h3>

::prose-field-group{variant="bordered"}

::prose-field{name="variant" type="default | destructive | outline | ghost | link" default-value="default"}
The visual style variant of the button.

- `default` - Standard button appearance
- `destructive` - Red/danger styling for destructive actions
- `outline` - Outlined button with transparent background
- `ghost` - Minimal styling with hover effect
- `link` - Styled as a hyperlink

::

::prose-field{name="size" type="sm | md | lg | icon" default-value="md"}
Controls the size and padding of the button.
::

::prose-field{name="disabled" type="boolean" default-value="false"}
When `true`, the button cannot be interacted with and appears visually disabled.
::

::prose-field{name="loading" type="boolean" default-value="false"}
Shows a loading spinner and disables the button while an async action is in progress.
::

::prose-field{name="onClick" type="(event: MouseEvent) => void"}
Callback function triggered when the button is clicked.
::

::
```

:::

## Use Cases

The Field and Field Group components are perfect for:

- **Component Props Documentation** - Document Vue/React component props in a readable format
- **API Configuration** - Show configuration options for libraries or APIs
- **Function Parameters** - Document function signatures and parameters
- **Type Definitions** - Display TypeScript interface or type properties
- **CLI Options** - Document command-line interface options and flags
- **Environment Variables** - List and explain required environment variables

## Best Practices

### 1. Use Descriptive Types

Be specific with type definitions to help users understand what values are valid:

```md
<!-- ❌ Too vague -->

::prose-field{name="color" type="string"}

<!-- ✅ Better -->

::prose-field{name="color" type="'red' | 'blue' | 'green' | hex string"}
```

### 2. Provide Context in Descriptions

Use the default slot to add examples, lists, or additional context:

```md
::prose-field{name="items" type="Array<Item>" required}
Array of items to display. Each item should have:

- `id` - Unique identifier
- `label` - Display text
- `icon` - Optional icon name
  ::
```

### 3. Group Related Fields

Use Field Groups to organize props by category:

```md
### Style Props

::prose-field-group

<!-- Style-related fields -->

::

### Behavior Props

::prose-field-group

<!-- Behavior-related fields -->

::
```

### 4. Combine Variants Wisely

- Use `divided` for clear separation
- Use `striped` for long lists
- Use `bordered` to make sections distinct
- Combine `all` three for maximum organization in complex documentation

### 5. Mark Required Fields Consistently

Always use the `required` prop for mandatory fields to help users identify what's necessary at a glance.
