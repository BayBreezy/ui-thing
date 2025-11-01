---
title: Error
description: On this page you will find different ways in which you can styles your Error page.
---

## Background patterns

Here is one source for background patterns. https://bg.ibelick.com/

You can copy them and modify them as you see fit.

## Adding a custom error page

To add a custom error page, you can create a new file in the root of your nuxt app call `error.vue`. You can learn more about this in the [Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/error).

## Simple

Grid pattern background with left-aligned content and staggered entrance animations.

:BlockShowcase{blockPath="Error/BlockError" component="BlockError" iframeHeight="600px" components="button" }

## Centered

Radial dot pattern background with centered text layout and animated content reveal.

:BlockShowcase{blockPath="Error/BlockErrorCentered" component="BlockErrorCentered" iframeHeight="600px" components="button"}

## Image

Two-column split layout featuring decorative image with slide-in animation and responsive stacking.

:BlockShowcase{blockPath="Error/BlockErrorImage" component="BlockErrorImage" iframeHeight="600px" components="button"}

## Links

Grid background with helpful navigation links featuring staggered animations and hover effects.

:BlockShowcase{blockPath="Error/BlockErrorLinks" component="BlockErrorLinks" iframeHeight="600px" components="button"}

## Animated

Gradient background with floating blobs and GSAP timeline animations for smooth sequential reveals.

**Requires:** `npm install gsap`

::BlockShowcase{blockPath="Error/BlockError5" component="BlockError5" iframeHeight="700px"}

#components

The button component is used for the retry action.

:prose-pm-x{command="ui-thing@latest add button"}

This also needs gsap to be installed.
:prose-pm-install{name="gsap"}

::

## Suggestions carousel

Interactive carousel showcasing helpful resource cards with auto-play functionality.

**Requires:** Nuxt Swiper module.

:BlockShowcase{blockPath="Error/BlockError6" component="BlockError6" iframeHeight="700px" components="card button"}

## Minimal

Clean, minimal design with custom SVG illustration and spring-based entrance animations.

:BlockShowcase{blockPath="Error/BlockError7" component="BlockError7" iframeHeight="700px" components="button"}

## Dark / Stats

Dark-themed error page with status cards, error details in terminal style, and retry actions.

:BlockShowcase{blockPath="Error/BlockError8" component="BlockError8" iframeHeight="700px" components="card badge button"}

## Interactive Search

Feature-rich error page with inline search input and popular pages grid for easy navigation.

:BlockShowcase{blockPath="Error/BlockError9" component="BlockError9" iframeHeight="700px" components="card input button"}
