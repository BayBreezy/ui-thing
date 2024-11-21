---
title: Testimony
description: On this page you will find different ways in which you can style the Testimony sections of your website.
---

## Note

In order to see the full(Desktop) view, please click on the `External View` button ( :icon{name="lucide:square-arrow-out-up-right"} ) at the top of the style.

## Style One

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

:BlockShowcase{blockPath="Testimony/BlockTestimony1" component="BlockTestimony1" }

## Style Two

:BlockShowcase{blockPath="Testimony/BlockTestimony2" component="BlockTestimony2" }

## Style Three

:BlockShowcase{blockPath="Testimony/BlockTestimony3" component="BlockTestimony3" }

## Style Four

This one requires the [Nuxt Swiper Module](https://github.com/cpreston321/nuxt-swiper?tab=readme-ov-file#features).

:BlockShowcase{blockPath="Testimony/BlockTestimony4" component="BlockTestimony4" }
