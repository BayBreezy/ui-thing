---
title: Call To Action (CTA)
description: Compelling call-to-action sections with animated entrances, testimonials, and conversion-focused designs. Features newsletter signups, app downloads, feature showcases, and testimonial carousels to drive user engagement.
---

## Style One - Centered CTA

Simple centered call-to-action with dual buttons and staggered animations.

:BlockShowcase{blockPath="CTA/BlockCTA1" component="BlockCTA1" iframeHeight="450px" components="container button"}

## Style Two - Horizontal Split CTA

Text and buttons arranged side-by-side with responsive stacking on mobile.

:BlockShowcase{blockPath="CTA/BlockCTA2" component="BlockCTA2" iframeHeight="350px" components="container button"}

## Style Three - Feature List with Image

CTA with feature checklist and decorative image in two-column layout.

:BlockShowcase{blockPath="CTA/BlockCTA3" component="BlockCTA3" components="container button"}

## Style Four - Testimonial Carousel

Swiper-powered testimonial slider with customer reviews and feature list. Requires [Nuxt Swiper Module](https://github.com/cpreston321/nuxt-swiper).

:prose-pm-x{command="nuxi@latest module add swiper"}

Then add it to your `nuxt.config` file:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-swiper"],
  swiper: {
    /* module options */
  },
});
```

:BlockShowcase{blockPath="CTA/BlockCTA4" component="BlockCTA4" components="container button"}

## Style Five - App Download CTA

Mobile app showcase with platform download buttons and phone mockup.

:BlockShowcase{blockPath="CTA/BlockCTA5" component="BlockCTA5" components="container button"}

## Style Six - Gradient with Statistics

Full-width gradient background with statistics badges and animated blobs.

:BlockShowcase{blockPath="CTA/BlockCTA6" component="BlockCTA6" components="container button"}

## Style Seven - Newsletter Signup

Email newsletter subscription with inline input and submit button.

:BlockShowcase{blockPath="CTA/BlockCTA7" component="BlockCTA7" iframeHeight="500px" components="container badge input button"}

## Style Eight - Feature Card CTA

Centered card design with feature grid, icon badges, and shadow effects.

:BlockShowcase{blockPath="CTA/BlockCTA8" component="BlockCTA8" components="container card button"}

## Style Nine - Customer Testimonials

Swiper carousel with customer quotes, avatars, and rating stars. Requires [Nuxt Swiper Module](https://github.com/cpreston321/nuxt-swiper).

:BlockShowcase{blockPath="CTA/BlockCTA9" component="BlockCTA9" components="container card avatar button"}
