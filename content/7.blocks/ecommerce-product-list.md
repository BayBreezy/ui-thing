---
title: Ecommerce - Product List
description: "Product listing blocks for a storefront, with a wishlist and quick add grid, sidebar filters with sorting and pagination, a top filter bar, a grid and list toggle, collection tiles, a quick view dialog, a recommendations carousel and a load more grid with skeleton loading."
---

Every block takes a typed `products` array with `name`, `category`, `price`, an optional `compareAt` price, `rating`, `reviews`, an optional `badge`, `colors`, `image` and `href`, so you can pass your own catalog without touching the markup. The filter, sort, wishlist and quantity state lives inside each block, so wire the handlers to your store or API when you copy one.

The products are fictional and the photos are placeholders from Unsplash. Replace the `image` URLs with your own product shots. Prices are formatted with `Intl.NumberFormat`, so change the currency in one place.

## Style One

Four column grid with new and sale badges, compare at pricing, star ratings, a wishlist heart and an add to cart button that slides in on hover.

:BlockShowcase{blockPath="Ecommerce/ProductList/BlockProductList1" component="BlockProductList1" iframeHeight="1000px"}

## Style Two

Listing with sidebar filters. Category checkboxes with counts, a price range slider, an on sale filter, a sort select and pagination that resets when the filters change.

:BlockShowcase{blockPath="Ecommerce/ProductList/BlockProductList2" component="BlockProductList2" iframeHeight="1000px"}

## Style Three

Top filter bar with category chips, an on sale toggle and a sort select. Cards show their color options and the discount percentage.

:BlockShowcase{blockPath="Ecommerce/ProductList/BlockProductList3" component="BlockProductList3" iframeHeight="1000px"}

## Style Four

Switch between a three column grid and a detailed list. List rows add colors and a buy button, and the layout change is animated.

:BlockShowcase{blockPath="Ecommerce/ProductList/BlockProductList4" component="BlockProductList4" iframeHeight="1000px"}

## Style Five

Shop by collection. An asymmetric bento grid of image tiles with item counts and an arrow that nudges on hover.

:BlockShowcase{blockPath="Ecommerce/ProductList/BlockProductList5" component="BlockProductList5" iframeHeight="800px"}

## Style Six

Quick view dialog. Open any product to pick a color and size, set a quantity and add it to the cart without leaving the page.

:BlockShowcase{blockPath="Ecommerce/ProductList/BlockProductList6" component="BlockProductList6" iframeHeight="1000px"}

## Style Seven

Recommendations carousel. A draggable row with arrows that disable at the ends and compact cards with rating and price.

:BlockShowcase{blockPath="Ecommerce/ProductList/BlockProductList7" component="BlockProductList7" iframeHeight="520px"}

## Style Eight

Grid with a load more button. Skeleton cards show while the next batch loads, with a progress bar and polite screen reader updates. Swap the timeout for a real request.

:BlockShowcase{blockPath="Ecommerce/ProductList/BlockProductList8" component="BlockProductList8" iframeHeight="1250px"}
