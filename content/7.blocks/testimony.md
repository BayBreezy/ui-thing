---
title: Testimony
description: Customer testimonial section examples with various layouts. Features carousel sliders, grid layouts, company logos, ratings, and customer quotes to build trust and credibility.
---

## Style One

Carousel testimonial slider with auto-rotation. Features centered quotes, customer avatars, star ratings, and company information. Uses Nuxt Swiper Module for smooth transitions between testimonials.

This one requires the [Nuxt Swiper Module](https://github.com/cpreston321/nuxt-swiper?tab=readme-ov-file#features).

:prose-pm-x{command="nuxi@latest module add swiper"}

Then add it to your `nuxt.config` file.

```ts
export default defineNuxtConfig({
  modules: ["nuxt-swiper"],
  swiper: {
    /* module options */
  },
});
```

:BlockShowcase{blockPath="Testimony/BlockTestimony1" component="BlockTestimony1" components="container avatar"}

## Style Two

Single centered testimonial with company logos. Features large quote display, customer details with avatar, star rating, and brand logos below for social proof.

:BlockShowcase{blockPath="Testimony/BlockTestimony2" component="BlockTestimony2" components="container avatar"}

## Style Three

Side-by-side testimonial with customer image. Features large customer photo on the left, star rating at top, quote, and customer details. Responsive layout stacks vertically on mobile.

:BlockShowcase{blockPath="Testimony/BlockTestimony3" component="BlockTestimony3" components="container"}

## Style Four

Split layout with testimonial carousel. Combines static quote section with background image carousel slider. Features decorative SVG element and glass-morphism cards. Requires Nuxt Swiper Module.

This one requires the [Nuxt Swiper Module](https://github.com/cpreston321/nuxt-swiper?tab=readme-ov-file#features).

:BlockShowcase{blockPath="Testimony/BlockTestimony4" component="BlockTestimony4" iframeHeight="750px" components="container"}

## Style Five

Three-column testimonial grid with cards. Features equal-height cards with star ratings, quotes, and customer avatars. Clean grid layout perfect for showcasing multiple testimonials.

:BlockShowcase{blockPath="Testimony/BlockTestimony5" component="BlockTestimony5" iframeHeight="600px" components="container avatar"}

## Style Six

Two-column layout with stats and testimonials. Left side shows overall rating (4.9/5) and customer count with visual divider. Right side displays stacked testimonial cards with compact layout.

:BlockShowcase{blockPath="Testimony/BlockTestimony6" component="BlockTestimony6" iframeHeight="550px" components="container avatar"}

## Style Seven

Large card container with four testimonials. Features bordered card wrapper with centered heading and 2x2 grid layout of detailed testimonials including company names.

:BlockShowcase{blockPath="Testimony/BlockTestimony7" component="BlockTestimony7" iframeHeight="700px" components="container avatar"}

## Style Eight

Masonry grid layout with compact testimonial cards. Uses CSS columns for Pinterest-style staggered layout. Features multiple short testimonials with avatars and ratings in card format.

:BlockShowcase{blockPath="Testimony/BlockTestimony8" component="BlockTestimony8" iframeHeight="650px" components="container avatar"}
