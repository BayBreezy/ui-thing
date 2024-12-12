---
title: Changelog
description: See what has changed recently in UI Thing.
---

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

## December 1, 2024 - VueForm Slider

Let me start by giving credit to the [VueForm Slider](https://github.com/vueform/slider) creators ❤️.

In this release, I added the [`VeeVueFormSlider`](/forms/vee-vueformslider) component to the forms section.

Yes, there is an existing `Slider` component provided [here](/components/slider). The problem with this component is that the `v-model` directive returns an array. ALWAYS! This is coming from the implementation provided by Radix-Vue.

Based on the issue raised here [#38](https://github.com/BayBreezy/ui-thing/issues/38), I decided to create a new slider component that returns a single value. This is the [`VeeVueFormSlider`](/forms/vee-vueformslider) component.

The cool thing is that this one has built in support for `vee-validate` 🙂.

You can try it out by running

```bash
npx ui-thing@latest add vee-vue-form-slider
```

## November 20, 2024 - Sidebar & Placeholder

In this release, the [`Sidebar`](/components/sidebar) component was added to the components section.

Thanks to this issue here [#32](https://github.com/BayBreezy/ui-thing/issues/32), I saw that shadcn-ui added a [`Sidebar`](/components/sidebar) component to their library.

The guys at shadcn-vue had already created a port of this, so I used most of that code to create the [`Sidebar`](/components/sidebar) component.

Thanks to all the great devs that made this component possible ❤️.

As for the [`Placeholder`](/components/placeholder) component, this one was taken from the guys at [Nuxt UI](https://ui.nuxt.com/) 🙏.

### Sidebar Blocks

If you want to copy and paste some Sidebar blocks, you can check out the [Sidebar Blocks](/blocks/sidebar) page.

The examples are taken from the shadcn-ui library 🙂.

## November 14, 2024 - Input Examples

In this update, a tonne of Input examples were added to the [Vee Input](/forms/veeinput) page.

Thanks to the maintainers of the [Origin UI](https://originui.com/) library for providing these examples 🙏.

Check them out & let me know what you think.

The [`Password Strength`](/forms/veeinput#input-with-password-strength-indicator) example is really cool 😎.

## October 31, 2024 - Button Styles

In this release, I added a few button styles to the [Button](/components/button) page.

The examples are taken from [Enhanced Button](https://enhanced-button.vercel.app/) ❤️.

Check them out & let me know what you think.
