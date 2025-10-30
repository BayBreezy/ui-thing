---
title: Callout
description: Display important information with icons and variants for different message types.
---

## Usage

The `ProseCallout` component is used to highlight important information, tips, warnings, and other contextual messages. It supports multiple variants, optional icons, and can even be turned into a clickable link.

## Basic Example

:::ShowCase{prose}

::prose-callout
This is a default callout with auto-generated icon.
::

::prose-callout{icon="lucide:star"}
This is a callout with a custom icon.
::

#code

```mdc
::prose-callout
This is a default callout with auto-generated icon.
::

::prose-callout{icon="lucide:star"}
This is a callout with a custom icon.
::

```

:::

## Variants

The callout component comes with several pre-styled variants, each with its own default icon and color scheme.

### Info

:::ShowCase{prose}

::prose-callout{variant="info"}
This is an informational message. Use this variant for general information or helpful tips.
::

::prose-callout{variant="info" title="Did you know?"}
You can combine the variant with a title to make the callout more prominent and easier to scan.
::

#code

```mdc
::prose-callout{variant="info"}
This is an informational message. Use this variant for general information or helpful tips.
::

::prose-callout{variant="info" title="Did you know?"}
You can combine the variant with a title to make the callout more prominent and easier to scan.
::
```

:::

### Success

:::ShowCase{prose}

::prose-callout{variant="success"}
Operation completed successfully! Your changes have been saved.
::

::prose-callout{variant="success" title="Well done!"}
You've successfully completed all the required steps. You can now proceed to the next section.
::

#code

```mdc
::prose-callout{variant="success"}
Operation completed successfully! Your changes have been saved.
::

::prose-callout{variant="success" title="Well done!"}
You've successfully completed all the required steps. You can now proceed to the next section.
::
```

:::

### Warning

:::ShowCase{prose}

::prose-callout{variant="warning"}
Please review your changes carefully before proceeding. This action may have side effects.
::

::prose-callout{variant="warning" title="Heads up!"}
Make sure to backup your data before running this command. It will modify files in your project.
::

#code

```mdc
::prose-callout{variant="warning"}
Please review your changes carefully before proceeding. This action may have side effects.
::

::prose-callout{variant="warning" title="Heads up!"}
Make sure to backup your data before running this command. It will modify files in your project.
::
```

:::

### Error

:::ShowCase{prose}

::prose-callout{variant="error"}
An error occurred while processing your request. Please try again later.
::

::prose-callout{variant="error" title="Something went wrong"}
The build failed due to syntax errors. Check the console output for more details.
::

#code

```mdc
::prose-callout{variant="error"}
An error occurred while processing your request. Please try again later.
::

::prose-callout{variant="error" title="Something went wrong"}
The build failed due to syntax errors. Check the console output for more details.
::
```

:::

### Tip

:::ShowCase{prose}

::prose-callout{variant="tip"}
Here's a helpful tip: You can use keyboard shortcuts to speed up your workflow.
::

::prose-callout{variant="tip" title="Pro Tip"}
Press `Cmd+K` to open the command palette and quickly navigate to any file in your project.
::

#code

```mdc
::prose-callout{variant="tip"}
Here's a helpful tip: You can use keyboard shortcuts to speed up your workflow.
::

::prose-callout{variant="tip" title="Pro Tip"}
Press `Cmd+K` to open the command palette and quickly navigate to any file in your project.
::
```

:::

### Note

:::ShowCase{prose}

::prose-callout{variant="note"}
This is a general note. Use this variant for supplementary information.
::

::prose-callout{variant="note" title="Note"}
The API behavior may vary depending on your subscription plan. Check your plan details for more information.
::

#code

```mdc
::prose-callout{variant="note"}
This is a general note. Use this variant for supplementary information.
::

::prose-callout{variant="note" title="Note"}
The API behavior may vary depending on your subscription plan. Check your plan details for more information.
::
```

:::

### Example

:::ShowCase{prose}

::prose-callout{variant="example"}
Here's a practical example of how to use this feature in your code.
::

::prose-callout{variant="example" title="Code Example"}
The following snippet demonstrates how to implement authentication in your application.
::

#code

```mdc
::prose-callout{variant="example"}
Here's a practical example of how to use this feature in your code.
::

::prose-callout{variant="example" title="Code Example"}
The following snippet demonstrates how to implement authentication in your application.
::
```

:::

## Filled Style

Use the `filled` prop to create a more prominent callout with solid background colors:

:::ShowCase{prose}

::prose-callout{variant="info" filled title="Filled Info"}
This is a filled info callout with solid colors.
::

::prose-callout{variant="success" filled title="Filled Success"}
This is a filled success callout with solid colors.
::

::prose-callout{variant="warning" filled title="Filled Warning"}
This is a filled warning callout with solid colors.
::

::prose-callout{variant="error" filled title="Filled Error"}
This is a filled error callout with solid colors.
::

#code

```mdc
::prose-callout{variant="info" filled title="Filled Info"}
This is a filled info callout with solid colors.
::

::prose-callout{variant="success" filled title="Filled Success"}
This is a filled success callout with solid colors.
::

::prose-callout{variant="warning" filled title="Filled Warning"}
This is a filled warning callout with solid colors.
::

::prose-callout{variant="error" filled title="Filled Error"}
This is a filled error callout with solid colors.
::

```

:::

## Custom Icons

Override the default icon for any variant:

:::ShowCase{prose}

::prose-callout{variant="info" icon="lucide:rocket"}
Custom icon callouts let you match the icon to your specific use case.
::

::prose-callout{variant="success" icon="lucide:trophy" title="Achievement Unlocked"}
You've earned a new badge! Keep up the great work.
::

::prose-callout{variant="tip" icon="lucide:zap" title="Performance Tip"}
Enable caching to improve your application's load time by up to 70%.
::

#code

```mdc
::prose-callout{variant="info" icon="lucide:rocket"}
Custom icon callouts let you match the icon to your specific use case.
::

::prose-callout{variant="success" icon="lucide:trophy" title="Achievement Unlocked"}
You've earned a new badge! Keep up the great work.
::

::prose-callout{variant="tip" icon="lucide:zap" title="Performance Tip"}
Enable caching to improve your application's load time by up to 70%.
::
```

:::

## With Title and Description

:::ShowCase{prose}
::prose-callout{variant="info" title="Getting Started" description="Follow these steps to set up your development environment and start building your application."}
::

::prose-callout{variant="warning" title="Breaking Change" description="Version 2.0 introduces breaking changes. Please review the migration guide before upgrading."}
::

#code

```mdc
::prose-callout{variant="info" title="Getting Started" description="Follow these steps to set up your development environment and start building your application."}
::

::prose-callout{variant="warning" title="Breaking Change" description="Version 2.0 introduces breaking changes. Please review the migration guide before upgrading."}
::
```

:::

## Clickable Callouts

Make callouts clickable by adding a `url` prop

:::ShowCase{prose}

::prose-callout{variant="info" title="Documentation" url="/components/accordion" description="Click to view the complete documentation."}
::

::prose-callout{variant="tip" title="Learn More" url="https://example.com" target="\_blank" description="Visit our website for tutorials and guides."}
::

#code

```mdc
::prose-callout{variant="info" title="Documentation" url="/components/accordion" description="Click to view the complete documentation."}
::

::prose-callout{variant="tip" title="Learn More" url="https://example.com" target="\_blank" description="Visit our website for tutorials and guides."}
::
```

:::

## Complex Content

Callouts support rich content including lists, code, and formatting

:::ShowCase{prose}

::prose-callout{variant="example" title="Installation Steps"}
Follow these steps to install the package:

1. Install the package: `npm install my-package`
2. Import in your app: `import { MyComponent } from 'my-package'`
3. Use the component: `<MyComponent />`

**Note:** Make sure you have Node.js 18+ installed.
::

::prose-callout{variant="tip" title="Best Practices"}
Here are some recommendations:

- Keep your components small and focused
- Write tests for critical functionality
- Use TypeScript for better type safety
- Document your code with JSDoc comments

For more details, check the [style guide](/docs/style-guide).
::

#code

```mdc
::prose-callout{variant="example" title="Installation Steps"}
Follow these steps to install the package:

1. Install the package: `npm install my-package`
2. Import in your app: `import { MyComponent } from 'my-package'`
3. Use the component: `<MyComponent />`

**Note:** Make sure you have Node.js 18+ installed.
::

::prose-callout{variant="tip" title="Best Practices"}
Here are some recommendations:

- Keep your components small and focused
- Write tests for critical functionality
- Use TypeScript for better type safety
- Document your code with JSDoc comments

For more details, check the [style guide](/docs/style-guide).
::
```

:::

## Props

### Component Props

| Prop               | Type                                                                                       | Default     | Description                                                |
| :----------------- | :----------------------------------------------------------------------------------------- | :---------- | :--------------------------------------------------------- |
| `variant`          | `"default" \| "info" \| "success" \| "warning" \| "error" \| "tip" \| "note" \| "example"` | `"default"` | Visual style variant                                       |
| `filled`           | `boolean`                                                                                  | `false`     | Use filled/solid background style                          |
| `title`            | `string`                                                                                   | -           | Title text for the callout                                 |
| `description`      | `string`                                                                                   | -           | Description text (can also use default slot)               |
| `icon`             | `string`                                                                                   | Auto        | Icon name (auto-selected based on variant if not provided) |
| `url`              | `string`                                                                                   | -           | Make the callout clickable with this URL                   |
| `target`           | `"_self" \| "_blank" \| "_parent" \| "_top"`                                               | `"_self"`   | Link target (use `_blank` for external links)              |
| `class`            | `string`                                                                                   | -           | Additional CSS classes for wrapper                         |
| `titleClass`       | `string`                                                                                   | -           | Additional CSS classes for title                           |
| `descriptionClass` | `string`                                                                                   | -           | Additional CSS classes for description                     |
| `iconClass`        | `string`                                                                                   | -           | Additional CSS classes for icon                            |

### Default Icons by Variant

| Variant   | Icon                    |
| :-------- | :---------------------- |
| `default` | `lucide:info`           |
| `info`    | `lucide:info`           |
| `success` | `lucide:circle-check`   |
| `warning` | `lucide:triangle-alert` |
| `error`   | `lucide:circle-x`       |
| `tip`     | `lucide:lightbulb`      |
| `note`    | `lucide:sticky-note`    |
| `example` | `lucide:code-2`         |

## Slots

The component provides three slots for maximum flexibility:

| Slot      | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | Main content area (overrides `description` prop)      |
| `title`   | Title content (overrides `title` prop)                |
| `icon`    | Icon content (overrides `icon` prop and variant icon) |

## Vue Component Usage

You can also use the Callout component in your Vue files:

:::ShowCase{prose}

:DocsCallout

#code

<!-- automd:file src="../../app/components/content/Docs/Callout/DocsCallout.vue" code lang="vue" -->

```vue [DocsCallout.vue]
<template>
  <div class="space-y-6">
    <div>
      <h3 class="mt-0">All Variants</h3>
      <div class="space-y-4">
        <ProseCallout variant="default" title="Default" description="This is a default callout." />
        <ProseCallout variant="info" title="Info" description="This is an info callout." />
        <ProseCallout variant="success" title="Success" description="This is a success callout." />
        <ProseCallout variant="warning" title="Warning" description="This is a warning callout." />
        <ProseCallout variant="error" title="Error" description="This is an error callout." />
        <ProseCallout variant="tip" title="Tip" description="This is a tip callout." />
        <ProseCallout variant="note" title="Note" description="This is a note callout." />
        <ProseCallout variant="example" title="Example" description="This is an example callout." />
      </div>
    </div>

    <div>
      <h3>Filled Style</h3>
      <div class="space-y-4">
        <ProseCallout
          variant="info"
          title="Filled Info"
          description="This uses the filled style."
          filled
        />
        <ProseCallout
          variant="success"
          title="Filled Success"
          description="This uses the filled style."
          filled
        />
        <ProseCallout
          variant="warning"
          title="Filled Warning"
          description="This uses the filled style."
          filled
        />
        <ProseCallout
          variant="error"
          title="Filled Error"
          description="This uses the filled style."
          filled
        />
      </div>
    </div>

    <div>
      <h3>With Slots</h3>
      <ProseCallout variant="tip">
        <template #icon>
          <Icon name="lucide:sparkles" />
        </template>
        <template #title> Custom Slotted Title </template>
        <template #default>
          <p>This callout uses slots for maximum flexibility.</p>
          <ul class="mt-2 list-inside list-disc space-y-1">
            <li>Custom icon slot</li>
            <li>Custom title slot</li>
            <li>Custom content slot</li>
          </ul>
        </template>
      </ProseCallout>
    </div>

    <div>
      <h3>Clickable Callout</h3>
      <ProseCallout
        variant="info"
        title="Learn More"
        description="Click this callout to navigate to the documentation."
        url="/docs"
      />
    </div>

    <div>
      <h3>Custom Icons</h3>
      <div class="space-y-4">
        <ProseCallout
          variant="success"
          icon="lucide:trophy"
          title="Achievement Unlocked"
          description="You've earned a new badge!"
        />
        <ProseCallout
          variant="info"
          icon="lucide:rocket"
          title="Launch Ready"
          description="Your application is ready to deploy."
        />
        <ProseCallout
          variant="tip"
          icon="lucide:zap"
          title="Performance Boost"
          description="Enable caching for better performance."
        />
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

:::

## Styling

The component uses Tailwind Variants for styling. You can override any part using the class props:

```vue
<Callout
  variant="info"
  title="Custom Styles"
  class="rounded-xl shadow-lg"
  title-class="text-xl font-bold"
  description-class="text-base"
  icon-class="size-6"
>
  Fully customizable styling
</Callout>
```

## Examples in Context

### Documentation Page

:::ShowCase{prose}
::prose-callout{variant="info" title="Before You Begin"}
This guide assumes you have basic knowledge of Vue.js and TypeScript. If you're new to these technologies, we recommend reviewing the official documentation first.
::

#code

```mdc
::prose-callout{variant="info" title="Before You Begin"}
This guide assumes you have basic knowledge of Vue.js and TypeScript. If you're new to these technologies, we recommend reviewing the official documentation first.
::

```

:::

### Migration Guide

:::ShowCase{prose}

::prose-callout

### Breaking Changes in v2.0

The following breaking changes require updates to your code:

- `theme` prop renamed to `variant`
- `color` prop removed (use `variant` instead)
- Default icon size changed from 20px to 24px

::

#### API Documentation

::prose-callout{variant="note" title="Rate Limiting"}
This endpoint is rate-limited to 100 requests per minute per API key. Exceeding this limit will result in a 429 error.
::

#### Tutorial

::prose-callout{variant="tip" icon="lucide:sparkles" title="Quick Tip"}
You can use the keyboard shortcut `Cmd + /` to quickly toggle comments in your code editor.
::

#### Error Handling

::prose-callout{variant="error" title="Authentication Failed" url="https://example.com" target="\_blank"}
Your session has expired. Please log in again to continue.
::

#code

```mdc
::prose-callout

### Breaking Changes in v2.0

The following breaking changes require updates to your code:

- `theme` prop renamed to `variant`
- `color` prop removed (use `variant` instead)
- Default icon size changed from 20px to 24px

::

#### API Documentation

::prose-callout{variant="note" title="Rate Limiting"}
This endpoint is rate-limited to 100 requests per minute per API key. Exceeding this limit will result in a 429 error.
::

#### Tutorial

::prose-callout{variant="tip" icon="lucide:sparkles" title="Quick Tip"}
You can use the keyboard shortcut `Cmd + /` to quickly toggle comments in your code editor.
::

#### Error Handling

::prose-callout{variant="error" title="Authentication Failed" url="https://example.com" target="\_blank"}
Your session has expired. Please log in again to continue.
::
```

:::
