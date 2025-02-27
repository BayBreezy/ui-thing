---
title: Changelog
description: See what has changed recently in UI Thing.
---

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
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [{ label: "Databases" }, { slot: "select" }];
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

Yes, there is an existing `Slider` component provided [here](/components/slider). The problem with this component is that the `v-model` directive returns an array. ALWAYS! This is coming from the implementation provided by Radix-Vue.

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
