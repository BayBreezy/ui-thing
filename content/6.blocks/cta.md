---
title: Call To Action (CTA)
description: On this page you will find different ways in which you can style the Call To Action (CTA) parts of your website.
---

## Note

In order to see the full(Desktop) view, please click on the `External View` button ( :icon{name="lucide:square-arrow-out-up-right"} ) at the top of the style.

## Style One

:BlockShowcase{blockPath="CTA/BlockCTA1" component="BlockCTA1" iframeHeight="350px"}

## Style Two

This one shows the actions on the right and the text on the left.

On smaller screens it shows the text at the top and the actions at the bottom.

:BlockShowcase{blockPath="CTA/BlockCTA2" component="BlockCTA2" iframeHeight="350px"}

## Style Three

:BlockShowcase{blockPath="CTA/BlockCTA3" component="BlockCTA3"}

## Style Four

This one requires the [Nuxt Swiper Module](https://github.com/cpreston321/nuxt-swiper?tab=readme-ov-file#features).

```bash
npx nuxi@latest module add swiper
```

Then add it to your `nuxt.config` file.

```ts
export default defineNuxtConfig({
  modules: ["nuxt-swiper"],
  swiper: {
    /* module options */
  },
});
```

:BlockShowcase{blockPath="CTA/BlockCTA4" component="BlockCTA4"}

## Style Five

:BlockShowcase{blockPath="CTA/BlockCTA5" component="BlockCTA5"}
