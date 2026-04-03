---
title: Steps
description: Display numbered sequential steps with auto-incrementing counters, perfect for tutorials, installation guides, and multi-step processes.
---

## Source code

Click :SourceCodeLink{component="Step" folder="content/prose"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Overview

The `Steps` and `Step` components work together to create visually appealing numbered step sequences. Using CSS counters, each step automatically increments without manual numbering. The components are ideal for tutorials, setup guides, migration instructions, and any sequential process documentation.

## Basic Usage

:::Steps

::Step

### First Step

This is the content of the first step. The number is automatically generated.

::

::Step

### Second Step

Each subsequent step increments the counter automatically.

::

::Step

### Third Step

You can include any markdown content inside a step.

::

:::

## Installation Guide Example

:::Steps

::Step

### Install Dependencies

Install the required packages for your project:

::prose-pm-install{name="vue"}
::

::

::Step

### Create Configuration File

Create a `vue.config.js` file in your project root:

```js
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
};
```

::

::Step

### Update Package.json

Add scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

::

::Step

### Start Development Server

Run the development server:

:prose-pm-run{script="dev"}

::

:::

## Tutorial Example

:::Steps

::Step

### Create Component File

Create a new file `MyButton.vue` in your components directory.

::

::Step

### Add Template

Define your component's structure:

```vue
<template>
  <button class="btn">Click me</button>
</template>
```

::

::Step

### Add Script Setup

Add your component logic:

```vue
<script setup lang="ts">
  const handleClick = () => {
    console.log("Button clicked!");
  };
</script>
```

::

::Step

### Add Styles

Style your button:

```vue
<style scoped>
  .btn {
    padding: 0.5rem 1rem;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .btn:hover {
    background: #35495e;
  }
</style>
```

::

::Step

### Import and Use

Import your component in `App.vue`:

```vue
<script setup>
  import MyButton from "./components/MyButton.vue";
</script>

<template>
  <MyButton @click="handleClick" />
</template>
```

::

:::

## With Lists and Code

:::Steps

::Step

### Prerequisites

Before you begin, ensure you have:

- Node.js 18 or higher
- A package manager (npm, pnpm, yarn, or bun)
- Basic knowledge of Vue 3
- A code editor (VS Code recommended)

::

::Step

### Project Setup

Initialize a new project:

::prose-pm-x{command="create-vue@latest my-project"}
::

Navigate to the project:

```bash
cd my-project
```

::

::Step

### Install Additional Packages

Add the UI library:

::prose-pm-install{name="@ui-thing/components" saveDev}
::

::

::Step

### Configure Tailwind

Update your `tailwind.config.js`:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@ui-thing/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

::

:::

## Migration Guide Example

:::Steps

::Step

### Backup Your Project

Before making changes, create a backup:

```bash
git add .
git commit -m "Backup before v2 migration"
git branch backup-v1
```

::

::Step

### Update Dependencies

Update to the latest versions:

::prose-pm-install{name="ui-thing@latest"}
::

::prose-callout{variant="warning" title="Breaking Changes"}
Version 2.0 includes breaking changes. Review the changelog before proceeding.
::

::

::Step

### Update Component Imports

Change old import syntax:

```ts
// Before

// After
import { UiButton } from "ui-thing/components";
import { Button } from "ui-thing/v1";
```

::

::Step

### Update Props

Several components have renamed props:

| Component | Old Prop   | New Prop              |
| :-------- | :--------- | :-------------------- |
| Button    | `variant`  | `appearance`          |
| Input     | `onChange` | Use `v-model` instead |
| Modal     | `visible`  | `open`                |

::

::Step

### Test Your Application

Run your test suite:

::prose-pm-run{script="test"}
::

Fix any failing tests based on the new API.

::

::Step

### Update Styles

Some class names have changed:

```diff
- <UiButton class="btn-primary">
+ <UiButton appearance="primary">
```

::

::Step

### Deploy

Once everything is working, deploy your updated application:

::prose-pm-run{script="build"}
::

Deploy to your hosting provider

::prose-pm-run{script="deploy"}
::

::

:::

## API Setup Example

:::Steps

::Step

### Install Server Framework

Install Express and required middleware:

::prose-pm-install{name="express cors dotenv"}
::

::

::Step

### Create Server File

Create `server.js`:

```js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

::

::Step

### Configure Environment

Create `.env` file:

```bash
PORT=3000
DATABASE_URL=postgresql://localhost:5432/mydb
JWT_SECRET=your-secret-key
```

::

::Step

### Add Database

Install Prisma for database management:

::prose-pm-install{name="@prisma/client" saveDev}
::

::prose-pm-install{name="prisma" saveDev}
::

::

::Step

### Initialize Prisma

Set up your database schema:

::prose-pm-x{command="prisma init"}
::

::

::Step

### Create Schema

Define your data models in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

::

::Step

### Run Migrations

Create and apply database migrations:

::prose-pm-x{command="prisma migrate dev --name init"}
::

::

::Step

### Start Server

Run your API server:

:prose-pm-run{script="dev"}

::

:::

## Nested Content

:::Steps

::Step

### Understanding Components

Components are reusable pieces of UI. They can contain:

1. **Template** - The HTML structure
2. **Script** - The component logic
3. **Style** - The component styling

::prose-callout{variant="info" title="Single File Components"}
Vue uses SFC (Single File Components) that combine all three parts in one `.vue` file.
::

::

::Step

### Component Communication

Components communicate through

:::prose-icon-list

::prose-li{icon="lucide:arrow-down"}
**Props**: Pass data from parent to child
::
::prose-li{icon="lucide:arrow-up"}
**Emits**: Send events from child to parent
::
::prose-li{icon="lucide:git-branch"}
**Provide/Inject**: Share data across component tree
::
::prose-li{icon="lucide:link-2"}
**State Management**: Global state (Pinia, Vuex)
::

:::

::

::Step

### Best Practices

::prose-callout{variant="tip" title="Component Guidelines"}
Follow these best practices:

- Keep components small and focused
- Use TypeScript for type safety
- Document props and emits
- Write unit tests
- Follow naming conventions

::

::prose-collapsible{open-title="Show example" close-title="Hide example"}

```vue
<script setup lang="ts">
  interface Props {
    title: string;
    count?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    count: 0,
  });

  const emit = defineEmits<{
    increment: [];
  }>();
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <p>Count: {{ count }}</p>
    <button @click="emit('increment')">+</button>
  </div>
</template>
```

::

::

:::

## Troubleshooting Guide

:::Steps

::Step

### Identify the Issue

First, gather information about the problem:

- What error message do you see?
- When did the issue start?
- What were you doing when it occurred?
- Can you reproduce it consistently?

::

::Step

### Check the Console

Open browser DevTools (F12) and look for:

:::prose-icon-list{variant="error"}

::prose-li{icon="lucide:x-circle"}
Red error messages
::
::prose-li{icon="lucide:alert-triangle"}
Warning messages
::
::prose-li{icon="lucide:wifi-off"}
Network failures
::

:::

::

::Step

### Review Recent Changes

Use git to check recent modifications:

```bash
git log --oneline -10
git diff HEAD~1
```

::

::Step

### Search Documentation

Check if this is a known issue:

1. Search the official docs
2. Check GitHub issues
3. Look for related discussions
4. Review the changelog

::

::Step

### Try Basic Solutions

Common fixes:

:::prose-collapsible{open-title="Show solutions" close-title="Hide solutions"}

**Clear cache and reinstall:**

```bash
rm -rf node_modules package-lock.json
```

::prose-pm-install
::

**Update dependencies:**

::prose-pm-install{name="ui-thing@latest"}
::

**Restart dev server:**

:prose-pm-run{script="dev"}

:::

::

::Step

### Ask for Help

If you're still stuck, ask for help with:

- A clear description of the problem
- Steps to reproduce
- Your environment details (OS, Node version, etc.)
- Relevant code snippets
- Error messages and stack traces

::prose-callout{variant="info" title="Get Help"}
Post your issue on:

- GitHub Issues
- Discord community
- Stack Overflow

::

::

:::

## Props

### Steps

| Prop    | Type  | Default | Description                              |
| :------ | :---- | :------ | :--------------------------------------- |
| `class` | `any` | -       | Additional CSS classes for the container |

### Step

| Prop    | Type  | Default | Description                              |
| :------ | :---- | :------ | :--------------------------------------- |
| `class` | `any` | -       | Additional CSS classes for the step item |

## How It Works

The components use CSS counters to automatically number steps:

1. **`Steps`** - Initializes the counter with `[counter-reset:_step]`
2. **`Step`** - Displays and increments the counter with `before:content-[counter(step)]` and `before:[counter-increment:_step]`

This means you don't need to manually number your steps - the browser handles it automatically!

## Styling

The step indicator is created using CSS `::before` pseudo-element:

- **Size**: 32px x 32px (8 Tailwind units)
- **Background**: Secondary color
- **Text**: Secondary foreground color
- **Position**: Absolute, left of the step content
- **Border**: Left border connects all steps

### Custom Styling

You can customize the appearance with the `class` prop:

:::Steps{class="border-primary"}

::Step

### Customized Step

This step has a primary colored indicator.

::

:::

## Vue Component Usage

```vue
<template>
  <div>
    <!-- Basic usage -->
    <Steps>
      <Step>
        <h3>First Step</h3>
        <p>Step content goes here</p>
      </Step>
      <Step>
        <h3>Second Step</h3>
        <p>More content</p>
      </Step>
    </Steps>

    <!-- With custom classes -->
    <Steps class="border-primary">
      <Step class="before:bg-primary">
        <h3>Custom Styled Step</h3>
        <p>Custom indicator color</p>
      </Step>
    </Steps>
  </div>
</template>
```

## Best Practices

::prose-callout{variant="tip" title="Tips for Using Steps"}

- Use clear, action-oriented headings (e.g., "Install Dependencies" not "Dependencies")
- Keep each step focused on one task
- Include code examples where appropriate
- Add visual elements (callouts, icons) to enhance clarity
- Consider using collapsibles for optional or advanced content
- Test the flow to ensure steps are in logical order
- Use consistent heading levels (usually `###` for step titles)

::

## Accessibility

The components provide a clear visual hierarchy:

- Numbers help users track progress
- Vertical line shows connection between steps
- Clear spacing between steps
- Works with keyboard navigation
- Compatible with screen readers

## Common Patterns

### Installation + Configuration

Perfect for documenting software setup:

:::Steps

::Step

### Install

::prose-pm-install{name="package-name"}
::

::

::Step

### Configure

Add to your config file...

::

::Step

### Use

Import and use the package...

::

:::

### Problem → Solution

Document troubleshooting workflows:

:::Steps

::Step

### Identify Issue

Check error messages...

::

::Step

### Find Cause

Debug the problem...

::

::Step

### Apply Fix

Implement the solution...

::

::Step

### Verify

Test that it works...

::

:::

### Before → During → After

Show transformation processes:

:::Steps

::Step

### Preparation

Set up your environment...
::

::Step

### Execution

Run the migration...
::

::Step

### Validation

Verify the changes...
::

:::
