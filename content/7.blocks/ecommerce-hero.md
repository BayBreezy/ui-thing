---
title: Ecommerce - Hero
description: "Storefront hero blocks with a product photo collage, centered headline with category tiles, a full bleed image, a featured product spotlight with add to cart, a sale countdown and an auto rotating promo slider."
---

The hero blocks take plain props for the headline, description and images, so you can reword them or pass your own photos without touching the markup. The spotlight block takes a typed `product` object with `name`, `price`, an optional `compareAt` price, `rating`, `reviews`, `colors` and `image`, and keeps its color and wishlist state locally.

The photos are placeholders from Unsplash and the store is fictional. Replace the image URLs with your own, and swap the add to cart handler for a call to your cart.

## Style One

Headline and calls to action on the left with three staggered product photos, a floating customer rating card and a row of shipping, returns and warranty perks.

:BlockShowcase{blockPath="Ecommerce/ShopHero/BlockShopHero1" component="BlockShopHero1" iframeHeight="700px"}

## Style Two

Centered headline with a promo pill and two buttons, followed by four image tiles that link straight into your main categories.

:BlockShowcase{blockPath="Ecommerce/ShopHero/BlockShopHero2" component="BlockShopHero2" iframeHeight="880px"}

## Style Three

Edge to edge photo with a dark gradient scrim so the headline stays readable on any image. Includes a small promo ribbon and a scroll cue.

:BlockShowcase{blockPath="Ecommerce/ShopHero/BlockShopHero3" component="BlockShopHero3" iframeHeight="700px"}

## Style Four

Product of the week spotlight with a large photo, discount tag, rating, compare at price, color swatches, add to cart with confirmation and a wishlist toggle.

:BlockShowcase{blockPath="Ecommerce/ShopHero/BlockShopHero4" component="BlockShopHero4" iframeHeight="760px"}

## Style Five

Dark sale panel with a live countdown that ticks every second. Pass an ISO date as `endsAt`. Screen readers get a single summary instead of a ticking clock.

:BlockShowcase{blockPath="Ecommerce/ShopHero/BlockShopHero5" component="BlockShopHero5" iframeHeight="720px"}

## Style Six

Promo slider that rotates on its own. It pauses on hover, on focus and with a play and pause button, respects reduced motion and has arrows and dot navigation.

:BlockShowcase{blockPath="Ecommerce/ShopHero/BlockShopHero6" component="BlockShopHero6" iframeHeight="700px"}
