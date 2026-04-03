---
title: Package Manager
description: Display commands for multiple package managers with automatic syncing and switching.
---

## Source code

Click :SourceCodeLink{component="PackageManager" folder="content/prose"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Overview

The Package Manager components automatically generate code blocks showing the equivalent command across different package managers (npm, pnpm, bun, and yarn). This makes your documentation more accessible to users regardless of their preferred package manager.

## Components

There are three main components for different command types:

- **ProsePmInstall** - For installing packages
- **ProsePmRun** - For running scripts
- **ProsePmX** - For executing packages (npx, pnpm dlx, etc.)

All components support syncing, which allows users to switch between package managers once and have all command blocks update automatically.

---

## ProsePmInstall

Use this component to show package installation commands across all package managers.

### Basic Installation

Install a package

:::ShowCase{prose}

:prose-pm-install{name="vue"}

#code

```mdc
:prose-pm-install{name="vue"}
```

:::

### Install Multiple Packages

:::ShowCase{prose}

:prose-pm-install{name="vue vue-router pinia"}

#code

```mdc
:prose-pm-install{name="vue vue-router pinia"}
```

:::

### Dev Dependencies

Install packages as dev dependencies using the `save-dev` prop

:::ShowCase{prose}

:prose-pm-install{name="typescript" save-dev}

#code

```mdc
:prose-pm-install{name="typescript" save-dev}
```

:::

### Multiple Dev Dependencies

::ShowCase{prose}
:prose-pm-install{name="@types/node @typescript-eslint/parser eslint" save-dev}

#code

```mdc
:prose-pm-install{name="@types/node @typescript-eslint/parser eslint" save-dev}
```

::

### Install All Dependencies

Show the install command without a package name

::ShowCase{prose}
:prose-pm-install

#code

```mdc
:prose-pm-install
```

::

### Without Syncing

Disable syncing for standalone examples:

::ShowCase{prose}
:prose-pm-install{name="lodash" no-sync}

#code

```mdc
:prose-pm-install{name="lodash" no-sync}
```

::

### Custom Sync Key

Use a custom sync key to create separate sync groups

:::ShowCase{prose}

::prose-pm-install{name="react" sync="react-group"}
::

::prose-pm-install{name="react-dom" sync="react-group"}
::

#code

```mdc
::prose-pm-install{name="react" sync="react-group"}
::

::prose-pm-install{name="react-dom" sync="react-group"}
::

```

:::

## ProsePmRun

Use this component to show script execution commands.

### Run Development Server

::ShowCase{prose}
:prose-pm-run{script="dev"}

#code

```mdc
:prose-pm-run{script="dev"}
```

::

### Run Build

::prose-pm-run{script="build"}
::

### Run Tests

::prose-pm-run{script="test"}
::

### Run Custom Scripts

::prose-pm-run{script="lint"}
::

::prose-pm-run{script="format"}
::

### Run with Arguments

::ShowCase{prose}

:prose-pm-run{script="test -- --watch"}

#code

```mdc
:prose-pm-run{script="test -- --watch"}
```

::

### Without Syncing

::prose-pm-run{script="preview" no-sync}
::

## ProsePmX

Use this component for package execution commands (npx, pnpm dlx, bun x, yarn dlx).

### Create New Project

::ShowCase{prose}
:prose-pm-x{command="create-vue@latest my-app"}

#code

```mdc
:prose-pm-x{command="create-vue@latest my-app"}
```

::

### Initialize Nuxt Project

::prose-pm-x{command="nuxi init my-nuxt-app"}
::

### Run Create Next App

::prose-pm-x{command="create-next-app@latest"}
::

### Execute CLI Tools

::prose-pm-x{command="prettier --write ."}
::

::prose-pm-x{command="eslint --fix src/"}
::

### TypeScript Init

::prose-pm-x{command="tsc --init"}
::

### Without Syncing

::prose-pm-x{command="vite build" no-sync}
::

## In-Stack Layout

All components support the `in-stack` prop for use within code groups or when you want a more compact display.

### Installation in Stack

::prose-pm-install{name="axios" in-stack}
::

### Run Script in Stack

::prose-pm-run{script="start" in-stack}
::

### Execute Command in Stack

::prose-pm-x{command="create-vite@latest" in-stack}
::

## Complete Setup Example

Here's a complete example showing a typical project setup workflow:

::prose-callout{variant="tip" title="Getting Started"}
Follow these steps to set up your new project:
::

### Step 1: Create Project

::prose-pm-x{command="create-vue@latest my-project"}
::

### Step 2: Navigate to Directory

```bash
cd my-project
```

### Step 3: Install Dependencies

::prose-pm-install
::

### Step 4: Install Additional Packages

::prose-pm-install{name="axios pinia"}
::

### Step 5: Install Dev Dependencies

::prose-pm-install{name="@types/node typescript" save-dev}
::

### Step 6: Run Development Server

::prose-pm-run{script="dev"}
::

## Props Reference

### ProsePmInstall Props

| Prop       | Type      | Default | Description                                            |
| :--------- | :-------- | :------ | :----------------------------------------------------- |
| `name`     | `string`  | -       | Package name(s) to install. Omit for `install` command |
| `save-dev` | `boolean` | `false` | Install as dev dependency                              |
| `in-stack` | `boolean` | `false` | Use stack layout                                       |
| `sync`     | `string`  | `"_pm"` | Sync group identifier                                  |
| `no-sync`  | `boolean` | `false` | Disable syncing                                        |

### ProsePmRun Props

| Prop       | Type      | Default  | Description           |
| :--------- | :-------- | :------- | :-------------------- |
| `script`   | `string`  | Required | Script name to run    |
| `in-stack` | `boolean` | `false`  | Use stack layout      |
| `sync`     | `string`  | `"_pm"`  | Sync group identifier |
| `no-sync`  | `boolean` | `false`  | Disable syncing       |

### ProsePmX Props

| Prop       | Type      | Default  | Description           |
| :--------- | :-------- | :------- | :-------------------- |
| `command`  | `string`  | Required | Command to execute    |
| `in-stack` | `boolean` | `false`  | Use stack layout      |
| `sync`     | `string`  | `"_pm"`  | Sync group identifier |
| `no-sync`  | `boolean` | `false`  | Disable syncing       |

---

## Package Manager Differences

The components handle package manager-specific syntax automatically:

### Install Command

| Package Manager | Install    | Install (empty) | Save Dev |
| :-------------- | :--------- | :-------------- | :------- |
| npm             | `npm i`    | `npm install`   | `-D`     |
| pnpm            | `pnpm i`   | `pnpm install`  | `-D`     |
| bun             | `bun add`  | `bun install`   | `-d`     |
| yarn            | `yarn add` | `yarn install`  | `-D`     |

### Run Command

| Package Manager | Run Script |
| :-------------- | :--------- |
| npm             | `npm run`  |
| pnpm            | `pnpm run` |
| bun             | `bun run`  |
| yarn            | `yarn run` |

### Execute Command

| Package Manager | Execute    |
| :-------------- | :--------- |
| npm             | `npx`      |
| pnpm            | `pnpm dlx` |
| bun             | `bun x`    |
| yarn            | `yarn dlx` |

## Syncing Behavior

By default, all package manager components within a page share the same sync group (`_pm`). When a user selects a package manager in one component, all other synced components update automatically.

### Default Sync Group

These will sync together:

::prose-pm-install{name="vue"}
::

::prose-pm-run{script="dev"}
::

::prose-pm-x{command="vite build"}
::

### Custom Sync Groups

Create separate sync groups for different contexts:

::prose-callout{variant="info" title="Frontend Dependencies"}
::

::prose-pm-install{name="react react-dom" sync="frontend"}
::

::prose-pm-install{name="@types/react" save-dev sync="frontend"}
::

::prose-callout{variant="info" title="Backend Dependencies"}
::

::prose-pm-install{name="express" sync="backend"}
::

::prose-pm-install{name="@types/express" save-dev sync="backend"}
::

### Disable Syncing

Use `no-sync` for standalone examples:

::prose-pm-install{name="standalone-package" no-sync}
::

## Real-World Examples

### React Project Setup

::prose-callout{variant="example" title="Setting up a React + TypeScript Project"}
::

Create a new Vite project:

::prose-pm-x{command="create-vite@latest my-react-app -- --template react-ts"}
::

Install additional dependencies:

::prose-pm-install{name="react-router-dom zustand"}
::

Install dev tools:

::prose-pm-install{name="@types/node eslint prettier" save-dev}
::

Start the development server:

::prose-pm-run{script="dev"}
::

### Vue Project Setup

::prose-callout{variant="example" title="Setting up a Vue 3 Project"}
::

Create a new Vue project:

::prose-pm-x{command="create-vue@latest my-vue-app"}
::

Install Vue Router and Pinia:

::prose-pm-install{name="vue-router pinia"}
::

Install dev dependencies:

::prose-pm-install{name="@vue/test-utils vitest" save-dev}
::

Run the dev server:

::prose-pm-run{script="dev"}
::

### Nuxt Project Setup

::prose-callout{variant="example" title="Setting up a Nuxt 3 Project"}
::

Initialize a new Nuxt project:

::prose-pm-x{command="nuxi init my-nuxt-app"}
::

Navigate to the project:

```bash
cd my-nuxt-app
```

Install dependencies:

::prose-pm-install
::

Add UI library:

::prose-pm-install{name="@nuxt/ui"}
::

Start development:

::prose-pm-run{script="dev"}
::

## Tips

::prose-callout{variant="tip" title="Best Practices"}

- Use syncing to provide a consistent experience across your documentation
- Disable syncing for isolated examples or tutorials with different contexts
- Use custom sync groups when you have multiple unrelated command sequences on the same page
- Always show the installation command when introducing new dependencies

::

::prose-callout{variant="note" title="Note"}
The package manager selection is persisted in the user's browser, so their preference is remembered across pages and sessions.
::
