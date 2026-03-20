---
title: Changelog
description: See what has changed recently in UI Thing.
---

## March 20, 2026

### Component Updates

- [**Sidebar**](/components/sidebar): Fixed an issue where the `SidebarProvider` was not persisting the open or closed state correctly with cookies. The provider now restores the saved state properly and keeps the cookie in sync with controlled updates.
- **Class Overrides**: Updated component and prose style builders to normalize Vue class bindings with `normalizeClass(...)` before passing them into `tv()`. This removes the TypeScript errors introduced by the recent Vue class type change without narrowing the public `class` prop API.
- [**Scrollspy**](/components/scrollspy): Added a shared `mode="multiple"` option so docs and app layouts can mark every visible heading as active at once. The docs TOC rail now follows those active headings with a segmented zigzag highlight instead of a single active branch.

### Developer Experience

- **Agent Skills**: Added a new local `uithing` Codex skill for UI Thing workflows. It covers real CLI usage, component/docs/generator/MCP authoring inside this repo, and React or shadcn-style snippet conversion into native Vue, Nuxt, and UI Thing composition.

### Form Updates

- [**VeeSwitch**](/forms/veeswitch): Added a dedicated Vee-Validate switch wrapper with docs and examples, including settings and preferences card patterns. The wrapper now also aligns with the current Reka Switch value model so initial values and custom true/false values display correctly in the UI.

## January 24, 2026

### New Component

- **Color Picker**: A versatile color picker component that supports multiple color formats (HEX, RGB, HSL) and includes features like alpha transparency, preset swatches, and a user-friendly interface. Check out the documentation [here](/components/color-picker).

## January 3, 2026

### Component Updates

- [**Alert**](/components/alert): The Alert component has been updated to adjust the icon alignment when there is no title provided. Check out the updated documentation [here](/components/alert).
- [**Sheet**](/components/sheet): The Sheet component has been updated to include a new `variant` prop that allows for different visual styles. A `fullscreen` prop was also introduced that will determine if the sheet takes up the entire screen or not. The default variant has been preserved, and additional variants can be explored in the documentation [here](/components/sheet).

## January 2, 2026

### Component Updates

- [**Tanstack Table**](/components/tanstacktable): The Tanstack Table component has been updated to fix an issue with column pinning styles. Pinned columns now have the correct background color applied. Check out the updated documentation [here](/components/tanstacktable).

## January 1, 2026

### New Component

- **Flip Clock**: An animated split-flap clock that supports live time and countdown modes. Check out the documentation [here](/components/flip-clock).

## December 29, 2025

### New Components

- **QR Code**: A component for generating and displaying QR codes with customizable styling and frame handles. Check out the documentation [here](/components/qrcode).
- **Avatar Label Group**: A component for displaying an Avatar with associated title and subtitle. Check out the documentation [here](/components/avatar).

## December 25, 2025

🎄 Happy Holidays 🎄

### MCP Server

UI Thing now has an MCP server that powers its AI capabilities. This allows AI assistants like Claude Desktop, Cursor, and VS Code to access component source code, documentation, installation instructions, and more.

Learn more about it at [Getting Started - MCP Server](/getting-started/mcp).

### Component Updates

- [**Fancy Icon**](/components/fancyicon): The fancy icon component has been updated to closer resemble the one from Untitled UI. From the start, it should have looked like that but I was too lazy. This update comes with some breaking changes. Be sure to check the docs [here](/components/fancyicon) for usage examples.
- [**Icon**](/components/icon): The icon component has always been in the repo but there was no documentation for it. This was built because of an issue Where the Datatable component could not render icons from the official Nuxt Icon module.
- [**Iframe (Lazy)**](/components/iframelazy): The Iframe Lazy component is another one that has always been buried in the codebase with no documentation lol. This component allows you to lazy load iframes only when they come into view. Check out the docs [here](/components/iframelazy).
- [**Tanstack Table**](/components/tanstacktable): The Tanstack Table component has been updated. No breaking changes but new examples were added to showcase the updates. I am lazy, so I wanted a table that would just take an array of objects and generate the table for me. I also asked Claude to implement the server side pagination part. I may update this later to include other stuff... who knows.

### Component API

The component API now includes an endpoint to get a component by name.

The response now includes a `docsPath` property that contains the path to the documentation page for that component.

**Endpoints:**

- Get all components: [`/api/components`](/api/components)
  - You can also filter with a search query
- Get a component by name: [`/api/components/{name}`](/api/components/{name})

### Blocks API

A new API endpoint has been added to get all blocks.

**Endpoints:**

- Get all blocks: [`/api/blocks`](/api/blocks)
  - You can also filter with a search query
- Get a block by name: [`/api/blocks/{name}`](/api/blocks/{name})
- Get all block categories: [`/api/blocks/categories`](/api/blocks/categories)
- Get blocks by category: [`/api/blocks/categories/{name}`](/api/blocks/categories/{name})

### Prose API

A new API endpoint has been added to get all prose components.

**Endpoints:**

- Get all prose components: [`/api/prose`](/api/prose)
  - You can also filter with a search query
- Get a prose component by name: [`/api/prose/{name}`](/api/prose/{name})

### Block Paths

The URL for several block paths have been updated to be more consistent. Some dashes were added here and there. This is only breaking if you were hardcoding the paths somewhere or add them bookmarked 👀...

### Landing Page Example

A new landing page example has been added to the [Examples](/examples/landing) section.

## October 31, 2025

### New Field Components

Added new interactive field components to enhance user input experiences:

- **DocsFieldHear** - A hearing-style interactive field component
- **DocsFieldNotionPrompt** - Notion-style prompt field with mentions and context

### Home Page Refactor

Refactored the home page layout and added new HomeCards components for improved visual presentation.

### Utilities

Added `no-scrollbar` utility class for improved user experience on scrollable elements.

## October 20, 2025

### Prose Components

Added a comprehensive collection of prose components for enhanced content rendering and documentation:

#### Typography Components

- **ProseH1-H6** - Heading components with anchor link support and customizable styles
- **ProseP** - Paragraph component with customizable classes
- **ProseLead** - Lead paragraph component for introductory text
- **ProseStrong** - Strong text rendering component
- **ProseEm** - Emphasized text component
- **ProseBlockquote** - Styled blockquote component
- **ProseA** - Customizable anchor links with styling
- **ProseHr** - Horizontal rule component

#### List Components

- **ProseUl, ProseOl, ProseLi** - List components with customizable styles
- **ProseIconList** - Lists with icons and multiple variants

#### Table Components

- Added complete table prose components for documentation tables

#### Code Components

- **ProseCodeGroup** - Tabbed interface for multiple code snippets
- **ProseCodeSnippet** - Dynamic code imports with syntax highlighting
- **ProsePre** - Enhanced code blocks with file name display and meta parsing
- **ProseCodeTree** - Interactive file navigation component
- Code collapse functionality
- Copy button for code blocks

#### Documentation Components

- **ProseField & ProseFieldGroup** - Enhanced documentation for component props
- **ProseCallout** - Callout component with various styles and variants
- **ProseCard** - Card component with animated border effects
- **ProseCollapsible** - Collapsible content with customizable icons
- **ProseTabs** - Tabbed content for documentation
- **ProseImage** - Custom image with zoom functionality
- **ProseColorModeImage** - Adaptive images for light/dark modes
- **ProseSmartIcon** - Smart icon component

#### Package Manager Components

- **ProsePmInstall** - Package installation commands
- **ProsePmRun** - Package manager script execution
- **ProsePmX** - Package manager command execution
- Added `usePm` composable for package manager integration

#### Typography Documentation

Added comprehensive typography documentation showcasing all prose components and their usage.

## October 30, 2025

### New Block Components

Expanded the blocks section with multiple new component categories:

#### Testimonial Blocks

Added 8 new testimonial block variations featuring:

- Carousel sliders with auto-rotation
- Grid layouts with customer avatars
- Star ratings and company logos
- Masonry/Pinterest-style layouts

#### Sign Up Blocks

Added 4 new sign up page designs:

- Two-column layouts with feature showcases
- Password confirmation fields
- Social authentication options
- Compact and minimal card designs

#### Pricing Blocks

Added 4 new pricing section layouts:

- Interactive annual/monthly toggles
- Feature comparison grids
- Popular plan badges
- Four-tier pricing with custom options

#### Login Blocks

Added 4 new login page designs:

- Two-column layouts with security messages
- Minimal card designs with icon headers
- Social-first authentication layouts
- Compact designs with terms notices

#### Metric Blocks

Added 6 new metric display styles:

- Icon-based compact layouts
- Card-based designs with badges
- Two-column contextual sections
- Business metrics with growth indicators

#### Newsletter Blocks

Created 5 new newsletter signup blocks:

- Centered layouts with badges
- Card-based split designs
- Multi-field forms with checkboxes
- Feature showcase grids

### Documentation Updates

Enhanced documentation across multiple sections:

- Updated sidebar documentation with detailed descriptions
- Improved navigation documentation
- Enhanced header section documentation with style descriptions

### Component Updates

- **Tiptap Editor**: Added new Tiptap editor block with toolbar and formatting options
- **Nav Component**: Removed client-only wrapper for better performance
- **Animated Tooltip**: Added new component with mouse tracking and animations

## October 27, 2025

### New Block Components

#### Password Recovery & Reset

Implemented password recovery and reset components with enhanced layouts and validation.

#### Footer Components

Enhanced footer components with multiple layouts and styles.

#### Feature Blocks

Added multiple feature blocks with animations and responsive design.

#### FAQ Components

Enhanced FAQ components with multiple layouts and animations.

#### Error Pages

Added custom error pages (404, 500, etc.) with animations and helpful suggestions.

#### CTA Components

Enhanced call-to-action components with animations and new styles.

### Infrastructure

- Added Dockerfile for building and running the application
- Updated to Nuxt v4.2

## September 4, 2023

### UI Thing V2 Launch 🚀

Launched version 2 of UI Thing with a complete rebuild featuring:

- Modern component architecture
- Enhanced documentation
- Improved developer experience
- New component library built on Reka UI
- Update to Tailwind CSS v4
- Comprehensive examples and blocks

## February 27, 2025

### Timeline

In this update, the [`Timeline`](/components/timeline) component was added.

You can add it by running

```bash
npx ui-thing@latest add timeline
```

## February 9, 2025

### Progress

In this update, the [`Progress`](/components/progress) component was updated.

There was an issue with how the transform value was being calculated.

You can update it by running

```bash
npx ui-thing@latest add progress
```

### Description List

The [`Description List`](/components/description-list) component was added.

You can try it out by running

```bash
npx ui-thing@latest add description-list
```

### Native Checkbox

The [`Native Checkbox`](/forms/veecheckbox-native) component was added.

It was added because of some array issues I had with the Checkbox from Radix Vue.

You can try it out by running

```bash
npx ui-thing@latest add vee-native-checkbox
```

## February 7, 2025

### Loader

In this update, I added the [`Loader`](/components/loader) component.

It was recommended in this [issue](https://github.com/BayBreezy/ui-thing/issues/77).

You can try it out by running

```bash
npx ui-thing@latest add loader
```

## February 2, 2025

### Form Builder

In this update, I added the [`Form Builder`](/forms/form-builder) component.

I stumbled across an example in the Vee Validate docs and thought it would be nice to have something like this at hand.

You can try it out by running

```bash
npx ui-thing@latest add vee-form-builder
```

## January 15, 2025

### Tabs

Im this update, I added some examples for the [`Tabs`](/components/tabs) component.

The examples are taken from the [Origin UI](https://originui.com/) library.

Thanks to the team over there for all the great free examples ❤️.

You can run this command to add the updated tabs component to your project

```bash
npx ui-thing@latest add tabs
```

## January 15, 2025

### Datatables

Im this update, I added some examples for the [`Datatables`](/components/datatable) component.

The examples are taken from the [Origin UI](https://originui.com/) library.

Thanks to the team over there for all the great free examples ❤️.

You can run this command to add the updated table component to your project

```bash
npx ui-thing@latest add datatable
```

## January 14, 2025

### Table

Im this update, I added some examples for the [`Table`](/components/table) component.

The examples are taken from the [Origin UI](https://originui.com/) library.

Thanks to the team over there for all the great free examples ❤️.

You can run this command to add the updated table component to your project

```bash
npx ui-thing@latest add table
```

## December 28, 2024

### Avatar

Im this update, I added some examples for the [`Avatar`](/components/avatar) component.

The examples are taken from the [Origin UI](https://originui.com/) library.

Thanks to the team over there for all the great free examples ❤️.

## December 27, 2024

### Input & Textarea

In this update, the [`Input`](/components/input) and [`Textarea`](/components/textarea) components were updated.

A new `pattern` & `maxlength` props was added to them both. Thanks to [arshx86](https://github.com/arshx86).

You can try them out by running

```bash
npx ui-thing@latest add input textarea
```

## December 23, 2024

### Breadcrumbs & Pagination

In this update the [`Breadcrumbs`](/components/breadcrumbs) component got a little update. You can now pass a `slot` in the array of items & customize what is displayed in that slot.

```html
<template>
  <UiBreadcrumbs :items="items" class="justify-center">
    <template #select>
      <UiSelect default-value="s1">
        <UiSelectTrigger class="h-9 w-36" />
        <UiSelectContent>
          <UiSelectItem value="s1">Orion</UiSelectItem>
          <UiSelectItem value="s2">Sigma</UiSelectItem>
          <UiSelectItem value="s3">Dorado</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </template>
  </UiBreadcrumbs>
</template>

<script lang="ts" setup>
  import type { BreadcrumbItem } from "~/components/Ui/Breadcrumbs.vue";

  const items: BreadcrumbItem[] = [{ label: "Databases" }, { slot: "select" }];
</script>
```

You can try it out by running

```bash
npx ui-thing@latest add breadcrumbs
```

### Pagination

The [`Pagination`](/components/pagination) component got a little update too. For the core components, only an additional import statement was added from the Vue Use library.

Some nice examples were copied over from the [Origin UI](https://originui.com/) library.

You can try it out by running

```bash
npx ui-thing@latest add pagination
```

## December 21, 2024

### Carousel

In this update, the `Carousel` component was added.

Thanks to the [Shadcn Vue](https://www.shadcn-vue.com/) team for doing the heavy lifting.

You can try it out by running

```bash
npx ui-thing@latest add carousel
```

## December 17, 2024

### Alert

In this update, the `Alert` component was updated.

Some cool examples were added from the [Origin UI](https://originui.com/) library.

To update just run this command in your project

```bash
npx ui-thing@latest add alert
```

### Vue Tippy

The Goodies section was updated with the [Vue Tippy](/goodies/vue-tippy) package.

You can create cool tooltips with it. The `Tooltip` component still works so now you have two options to choose from 🎉.

## December 15, 2024

### Sliders

In this update, the `Slider` component was updated to accommodate `vertical` orientation.

While adding some examples from the [Origin UI](https://originui.com/) library, I noticed that the `Slider` component was missing the necessary classes that would make it work in a vertical orientation.

### Vertical Slider

You can check out all the awesome examples here: [Sliders](/components/slider#origin-ui-examples).

### Checkboxes?

I also add some examples of checkboxes from the [Origin UI](https://originui.com/) library. You can check them out here: [Checkboxes](/forms/veecheckbox#origin-ui-examples).

## December 11, 2024 - More Examples & Refactor

### Refactor

In this update, I made some minor fixes to some components that were using `className` instead of `class`.

Some of the code examples were also updated:

- [Dropdown Menu](/components/dropdownmenu)
- [Navigation Menu](/components/navigationmenu)
- [Sidebar](/components/sidebar)
- [Stepper](/components/stepper)

### Button Examples

I added more button examples to the [Button](/components/button) page. Shoutout to the [Origin UI](https://originui.com/) team for providing these examples 🙏.

### Dialogs

Some dialog examples were added to the [Dialog](/components/dialog) page. These examples are taken from the [Origin UI](https://originui.com/) library as well. I hope to add some more examples soon.

## December 1, 2024

### VueForm Slider

Let me start by giving credit to the [VueForm Slider](https://github.com/vueform/slider) creators ❤️.

In this release, I added the [`VeeVueFormSlider`](/forms/vee-vueformslider) component to the forms section.

Yes, there is an existing `Slider` component provided [here](/components/slider). The problem with this component is that the `v-model` directive returns an array. ALWAYS! This is coming from the implementation provided by Reka UI.

Based on the issue raised here [#38](https://github.com/BayBreezy/ui-thing/issues/38), I decided to create a new slider component that returns a single value. This is the [`VeeVueFormSlider`](/forms/vee-vueformslider) component.

The cool thing is that this one has built in support for `vee-validate` 🙂.

You can try it out by running

```bash
npx ui-thing@latest add vee-vue-form-slider
```

## November 20, 2024

### Sidebar & Placeholder

In this release, the [`Sidebar`](/components/sidebar) component was added to the components section.

Thanks to this issue here [#32](https://github.com/BayBreezy/ui-thing/issues/32), I saw that shadcn-ui added a [`Sidebar`](/components/sidebar) component to their library.

The guys at shadcn-vue had already created a port of this, so I used most of that code to create the [`Sidebar`](/components/sidebar) component.

Thanks to all the great devs that made this component possible ❤️.

As for the [`Placeholder`](/components/placeholder) component, this one was taken from the guys at [Nuxt UI](https://ui.nuxt.com/) 🙏.

### Sidebar Blocks

If you want to copy and paste some Sidebar blocks, you can check out the [Sidebar Blocks](/blocks/sidebar) page.

The examples are taken from the shadcn-ui library 🙂.

## November 14, 2024

### Input Examples

In this update, a tonne of Input examples were added to the [Vee Input](/forms/veeinput) page.

Thanks to the maintainers of the [Origin UI](https://originui.com/) library for providing these examples 🙏.

Check them out & let me know what you think.

The [`Password Strength`](/forms/veeinput#input-with-password-strength-indicator) example is really cool 😎.

## October 31, 2024

### Button Styles

In this release, I added a few button styles to the [Button](/components/button) page.

The examples are taken from [Enhanced Button](https://enhanced-button.vercel.app/) ❤️.

Check them out & let me know what you think.
