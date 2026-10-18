---
title: Ecommerce - Cart
description: "Shopping cart blocks with a slide in drawer, a full cart page with an order summary, free shipping progress with a promo code, an empty cart with suggestions, a header mini cart popover and a cart with add on suggestions."
---

Every block takes a typed `items` array with `id`, `name`, `variant`, `price`, `quantity`, `image` and `href`. Each block copies it into local state, so quantity changes, removals and totals work out of the box. Wire the handlers to your cart store or API when you copy one.

Shipping, tax and promo rules are props such as `freeShippingAt`, `shippingFee`, `taxRate` and `promoCodes`. They are demo values. Always calculate real totals and validate promo codes on your server.

## Style One

Cart drawer that slides in from the right, opened from a header button with a live item count. Includes quantity steppers, remove buttons, a subtotal and an empty state.

:BlockShowcase{blockPath="Ecommerce/Cart/BlockCart1" component="BlockCart1" iframeHeight="640px"}

## Style Two

Full cart page with photos, variants, quantity fields and line totals, plus a sticky order summary with shipping, estimated tax and accepted payment icons.

:BlockShowcase{blockPath="Ecommerce/Cart/BlockCart2" component="BlockCart2" iframeHeight="820px"}

## Style Three

Free shipping progress bar that counts down as items are added, and a promo code field with an inline error for invalid codes. Try `AUTUMN10` or `WELCOME15`.

:BlockShowcase{blockPath="Ecommerce/Cart/BlockCart3" component="BlockCart3" iframeHeight="900px"}

## Style Four

Empty cart with an icon, clear next steps, category chips and a row of popular products so shoppers always have somewhere to go.

:BlockShowcase{blockPath="Ecommerce/Cart/BlockCart4" component="BlockCart4" iframeHeight="980px"}

## Style Five

Mini cart popover for a site header. A bag button with a count badge opens a scrollable list with remove buttons, a live subtotal and view cart and checkout actions.

:BlockShowcase{blockPath="Ecommerce/Cart/BlockCart5" component="BlockCart5" iframeHeight="560px"}

## Style Six

Cart with an add to your order row. Suggested products move into the cart with one click and the summary updates straight away.

:BlockShowcase{blockPath="Ecommerce/Cart/BlockCart6" component="BlockCart6" iframeHeight="1000px"}
