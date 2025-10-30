---
title: Code Snippet
description: Dynamically import and display code from your project files or external URLs without duplicating content in your documentation.
---

## Overview

The `ProseCodeSnippet` component allows you to reference actual source files from your project or external URLs, ensuring your documentation always shows the latest code without manual updates. Perfect for keeping docs in sync with your codebase.

::prose-callout{variant="info" title="Features"}

- **Dynamic Imports** - Load code directly from your project files
- **External URLs** - Fetch code from GitHub, GitLab, or any URL
- **Line Extraction** - Show specific line ranges from large files
- **Syntax Highlighting** - Full language support via Shiki
- **Auto-sync** - Documentation updates automatically when source code changes
- **Performance** - Lazy loads files only when needed

::

::prose-callout{variant="warning" title="Build Consideration"}
Files must match the `import.meta.glob` patterns in the component. The current setup includes all `.vue`, `.ts`, `.css`, and `.json` files from `/app/**` (excluding test files). Adjust patterns as needed for your use case.

::

## Basic Usage

Import a component from your project:

:::ShowCase{prose}

::prose-code-snippet{file="/components/Ui/Button.vue" language="vue" title="Button Component"}
::

#code

```mdc
::prose-code-snippet{file="/components/Ui/Button.vue" language="vue" title="Button Component"}
::
```

:::

## Import Project Files

### Vue Components

Show your actual component code:

:::ShowCase{prose}

::prose-code-snippet{file="/components/Ui/Card/Card.vue" language="vue" title="Card.vue"}
::

#code

```mdc
::prose-code-snippet{file="/components/Ui/Card/Card.vue" language="vue" title="Card.vue"}
::
```

:::

### TypeScript Utilities

Reference utility functions:

:::ShowCase{prose}

::prose-code-snippet{file="/utils/colors.ts" language="ts" title="Color Utilities"}
::

#code

```mdc
::prose-code-snippet{file="/utils/colors.ts" language="ts" title="Color Utilities"}
::
```

:::

### Composables

Display your composable logic:

:::ShowCase{prose}

::prose-code-snippet{file="/composables/usePm.ts" language="ts" title="usePm Composable" meta="noFormat"}
::

#code

```mdc
::prose-code-snippet{file="/composables/usePm.ts" language="ts" title="usePm Composable" meta="noFormat"}
::
```

:::

## Extract Specific Lines

Use `start` and `offset` to show only relevant portions of large files:

:::ShowCase{prose}

::prose-code-snippet{file="/components/Ui/Button.vue" language="vue" title="Button Props" start="137" offset="31"}
::

#code

```mdc
::prose-code-snippet{file="/components/Ui/Button.vue" language="vue" title="Button Props" start="137" offset="31"}
::
```

:::

The example above starts at line 137 and shows the next 31 lines.

## Highlight Lines

Combine with the `highlights` prop to emphasize important code:

:::ShowCase{prose}

::prose-code-snippet{file="/components/Ui/Button.vue" language="vue" title="Button Props" start="137" offset="31" highlights="2,4-6,10" meta="lines"}
::

#code

```mdc
::prose-code-snippet{file="/components/Ui/Button.vue" language="vue" title="Button Props" start="137" offset="31" highlights="2,4-6,10" meta="lines"}
::
```

:::

## External URLs

### GitHub Raw Content

Load code directly from GitHub:

:::ShowCase{prose}

::prose-code-snippet{url="https://raw.githubusercontent.com/nuxt/nuxt/refs/heads/main/packages/nuxt/src/app/composables/state.ts" language="ts" title="Nuxt useState Source" meta="lines noFormat"}
::

#code

```mdc
::prose-code-snippet{url="https://raw.githubusercontent.com/nuxt/nuxt/refs/heads/main/packages/nuxt/src/app/composables/state.ts" language="ts" title="Nuxt useState Source" meta="lines noFormat"}
::
```

:::

### External Examples

Pull examples from documentation sites or CDNs.

This example fetches the Vue 3 ESM build from a CDN and displays lines 1-20:

:::ShowCase{prose}

::prose-code-snippet{url="https://unpkg.com/vue@3/dist/vue.esm-browser.js" language="js" title="Vue 3 ESM Build" start="1" offset="20" meta="lines"}
::

#code

```mdc
::prose-code-snippet{url="https://unpkg.com/vue@3/dist/vue.esm-browser.js" language="js" title="Vue 3 ESM Build" start="1" offset="20" meta="lines"}
::
```

:::

### Style Guide

Show your actual CSS/Tailwind configuration:

:::ShowCase{prose}

::prose-code-snippet{file="/assets/css/tailwind.css" language="css" title="Tailwind Base Styles"}
::

:::

### Migration Guides

Show before and after by referencing different file versions or branches:

```mdc
## Migration from v1 to v2

### Old API (v1)

::prose-code-snippet{url="https://raw.githubusercontent.com/yourorg/yourrepo/v1/src/api.ts" language="typescript" title="Old API"}
::

### New API (v2)

::prose-code-snippet{file="/app/utils/api.ts" language="typescript" title="New API"}
::

### Changes

The new API uses fetch instead of axios and includes better error handling.
```

### Tutorial Series

Create step-by-step tutorials showing progressive code changes:

```mdc
## Step 1: Create Basic Component

::prose-code-snippet{file="/app/components/Tutorial/Step1.vue" language="vue" title="Step 1: Basic Setup"}
::

## Step 2: Add Props

::prose-code-snippet{file="/app/components/Tutorial/Step2.vue" language="vue" title="Step 2: With Props"}
::

## Step 3: Add State Management

::prose-code-snippet{file="/app/components/Tutorial/Step3.vue" language="vue" title="Step 3: Complete"}
::
```

## Advanced Meta Options

Use the `meta` prop to pass additional options to the code block:

:::ShowCase{prose}

::prose-code-snippet{file="/composables/useDocPage.ts" language="ts" title="useDocPage Composable" meta="icon=lucide:package noFormat lines"}
::

#code

```mdc
::prose-code-snippet{file="/composables/useDocPage.ts" language="ts" title="useDocPage Composable" meta="icon=lucide:package noFormat lines"}
::
```

:::

Available meta options:

- `icon=<name>` - Custom file icon
- `noFormat` - Disable code formatting
- `lines` - Show line numbers
- `noHeader` - Hide title header

## Extract Function Definitions

Show just a specific function from a large file:

:::ShowCase{prose}

::prose-code-snippet{file="/utils/colors.ts" language="ts" title="hexToRgb Function" start="45" offset="8"}
::

#code

```mdc
::prose-code-snippet{file="/utils/colors.ts" language="ts" title="hexToRgb Function" start="45" offset="8"}
::
```

:::

## Multiple File Comparison

Compare related files side by side using tabs:

:::ShowCase{prose}

:::prose-tabs{variant="line"}

::div{label="Button Component"}
::prose-code-snippet{file="/components/Ui/Button.vue" language="vue" title="Button Component"}
::
::
::div{label="Badge Component"}
::prose-code-snippet{file="/components/Ui/Badge.vue" language="vue" title="Badge Component"}
::
::
::div{label="Divider Component"}
::prose-code-snippet{file="/components/Ui/Divider.vue" language="vue" title="Divider Component"}
::
::

:::

#code

```mdc
:::prose-tabs{variant="line"}

::div{label="Button Component"}
::prose-code-snippet{file="/components/Ui/Button.vue" language="vue" title="Button Component"}
::
::
::div{label="Badge Component"}
::prose-code-snippet{file="/components/Ui/Badge.vue" language="vue" title="Badge Component"}
::
::
::div{label="Divider Component"}
::prose-code-snippet{file="/components/Ui/Divider.vue" language="vue" title="Divider Component"}
::
::

:::
```

:::

## Props

| Prop         | Type     | Default      | Description                                                          |
| :----------- | :------- | :----------- | :------------------------------------------------------------------- |
| `file`       | `string` | -            | Relative path to a file in your project (must match glob patterns)   |
| `url`        | `string` | -            | External URL to fetch code from                                      |
| `language`   | `string` | **required** | Programming language for syntax highlighting                         |
| `title`      | `string` | -            | Optional title displayed above the code block                        |
| `highlights` | `string` | -            | Line numbers or ranges to highlight (e.g., `"1,3-5,10"`)             |
| `meta`       | `string` | -            | Additional metadata passed to ProsePre (e.g., `"icon=vue noFormat"`) |
| `start`      | `number` | -            | Starting line number to extract (1-indexed)                          |
| `offset`     | `number` | -            | Number of lines to extract from the starting line                    |

## Syntax

### Basic Import

```mdc
::prose-code-snippet{file="/app/components/Button.vue" language="vue"}
::
```

### With Title

```mdc
::prose-code-snippet{file="/app/utils/helpers.ts" language="typescript" title="Helper Functions"}
::
```

### With Line Extraction

```mdc
::prose-code-snippet{file="/app/app.vue" language="vue" start="10" offset="5"}
::
```

### From URL

```mdc
::prose-code-snippet{url="https://example.com/code.js" language="javascript" title="External Example"}
::
```

::prose-callout{variant="tip" title="Extending Patterns"}
To include more directories, edit the `import.meta.glob` array in `ProseCodeSnippet.global.vue`.
::

## Performance Considerations

### Bundle Size Impact

The `import.meta.glob` pattern includes files in your build. Be strategic:

**✅ Good Practices:**

- Use specific file extensions: `*.{vue,ts}` instead of `*`
- Exclude test files: `!**/*.test.ts`
- Only include directories you'll reference in docs
- Use `eager: false` for lazy loading (already configured)

**❌ Avoid:**

- Overly broad patterns like `/app/**/*` (includes everything)
- Including asset files (images, videos)
- Globbing node_modules or build outputs

### Current Configuration Impact

With the default patterns (`/app/**/*.{vue,ts,css,json}`), expect:

- **Small projects** (<100 files): ~100-200KB added to bundle
- **Medium projects** (100-500 files): ~200KB-1MB added to bundle
- **Large projects** (500+ files): 1MB+ added to bundle

Files are lazy-loaded, so only referenced snippets are downloaded to the client.

### URL Fetching for Large Files

For very large files or files outside your project:

```mdc
::prose-code-snippet{url="/api/files/large-schema.json" language="json"}
::
```

This avoids bundling and fetches on-demand.

## Error Handling

The component handles errors gracefully:

### File Not Found

```mdc
::prose-code-snippet{file="/app/nonexistent.ts" language="typescript"}
::
```

Shows error callout: "Cannot load code: /app/nonexistent.ts"

::prose-callout{variant="error" title="Code Snippet Error"}
Cannot load code: `/app/nonexistent.ts`
::

### Invalid URL

```mdc
::prose-code-snippet{url="https://invalid-url-404.com/code.js" language="javascript"}
::
```

Shows error callout with the URL.
::prose-callout{variant="error" title="Code Snippet Error"}
Cannot load code: `https://invalid-url-404.com/code.js`
::

## Best Practices

::prose-callout{variant="tip" title="Documentation Tips"}

1. **Keep Docs in Sync** - Reference actual source files instead of copying code
2. **Show Relevant Code** - Use `start` and `offset` to show only what matters
3. **Add Context** - Always use `title` to explain what the code does
4. **Highlight Key Lines** - Use `highlights` to draw attention to important parts
5. **Version Control** - Reference specific branches/tags in URLs for stable examples
6. **Test Paths** - Ensure file paths match your glob patterns
7. **Performance** - For large apps, consider creating a `/docs-examples/` directory with curated files

::

## Common Patterns

### Tutorial with Progressive Examples

```mdc
## Build a User Card

### 1. Basic Structure

::prose-code-snippet{file="/app/examples/tutorial/UserCard-1.vue" language="vue" title="Step 1: Basic HTML"}
::

### 2. Add Styling

::prose-code-snippet{file="/app/examples/tutorial/UserCard-2.vue" language="vue" title="Step 2: With Tailwind"}
::

### 3. Make Interactive

::prose-code-snippet{file="/app/examples/tutorial/UserCard-3.vue" language="vue" title="Step 3: Complete Component"}
::
```

### API Endpoint Documentation

````mdc
## Users API

### List Users

::prose-code-snippet{file="/server/api/users/index.get.ts" language="typescript" title="GET /api/users"}
::

**Response:**

```json
{
"data": [...],
"total": 100,
"page": 1,
"limit": 10
}
```

### Get Single User

::prose-code-snippet{file="/server/api/users/[id].get.ts" language="typescript" title="GET /api/users/:id"}
::

````

### Component Anatomy

```mdc
## Understanding the Button Component

The button component consists of three main files:

::prose-code-snippet{file="/app/components/Ui/Button/Button.vue" language="vue" title="Component Implementation"}
::

::prose-code-snippet{file="/app/components/Ui/Button/types.ts" language="typescript" title="TypeScript Types"}
::

::prose-code-snippet{file="/app/components/Ui/Button/index.ts" language="typescript" title="Public API"}
::
```
