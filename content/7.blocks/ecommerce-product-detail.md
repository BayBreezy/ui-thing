---
title: Ecommerce - Product Detail
description: "Product page blocks with a thumbnail gallery and variant pickers, a sticky buy box with accordion details, a photo mosaic with tabs, a quantity stepper with cart confirmation, customer reviews with a rating breakdown, related products, a frequently bought together bundle and a size guide with a sticky mobile bar."
---

The product page blocks take a typed `product` object with `name`, `category`, `price`, an optional `compareAt` price, `rating`, `reviews`, `description`, `colors`, `sizes` with an `inStock` flag, `images` with `src` and `alt`, `highlights` and `details`. Size, color and quantity state lives inside each block, so wire the add to cart handler to your store or API when you copy one.

The product and the reviews are fictional and the photos are placeholders from Unsplash. The detail photos are crops of a single image, so replace the `images` with your own shots. Selecting a color only changes the selection, so map each color to its own images if your product has them.

## Style One

Swipeable gallery with thumbnails that stay in sync, breadcrumbs, color swatches and a size picker with out of stock sizes. Adding to the cart without a size shows an error.

:BlockShowcase{blockPath="Ecommerce/ProductDetail/BlockProductDetail1" component="BlockProductDetail1" iframeHeight="1000px"}

## Style Two

Stacked photo grid that scrolls while the buy box stays in view. Includes a quantity stepper, a running total and accordion sections for materials, fit and shipping.

:BlockShowcase{blockPath="Ecommerce/ProductDetail/BlockProductDetail2" component="BlockProductDetail2" iframeHeight="900px"}

## Style Three

Header with price and rating, a four photo mosaic, tabs for details, fit and reviews, and a sticky purchase card with a size select.

:BlockShowcase{blockPath="Ecommerce/ProductDetail/BlockProductDetail3" component="BlockProductDetail3" iframeHeight="1150px"}

## Style Four

Size select and quantity stepper with a live subtotal. Adding to the cart reveals an inline confirmation with view cart and continue shopping actions, and the cart counter updates.

:BlockShowcase{blockPath="Ecommerce/ProductDetail/BlockProductDetail4" component="BlockProductDetail4" iframeHeight="900px"}

## Style Five

Customer reviews with an average score and star distribution bars that double as filters. Includes sorting, helpful votes, show more, and a write a review dialog validated with vee-validate that adds your review to the list. Pass your real totals as `distribution`.

:BlockShowcase{blockPath="Ecommerce/ProductDetail/BlockProductDetail5" component="BlockProductDetail5" iframeHeight="1000px"}

## Style Six

Complete the look. Choosing a size on a card adds it straight to the cart, sizes stay visible on touch screens and items without sizes get a plain add button.

:BlockShowcase{blockPath="Ecommerce/ProductDetail/BlockProductDetail6" component="BlockProductDetail6" iframeHeight="720px"}

## Style Seven

Frequently bought together. Photos joined by plus signs, a checklist that recalculates the bundle price as you tick items, size selects for apparel and an automatic bundle discount.

:BlockShowcase{blockPath="Ecommerce/ProductDetail/BlockProductDetail7" component="BlockProductDetail7" iframeHeight="680px"}

## Style Eight

Size guide dialog that switches between inches and centimeters, plus a sticky add to cart bar that appears on small screens once the main button scrolls out of view.

:BlockShowcase{blockPath="Ecommerce/ProductDetail/BlockProductDetail8" component="BlockProductDetail8" iframeHeight="900px"}
