---
title: Ecommerce - Checkout
description: "Checkout blocks with a single page form, a multi step flow with a stepper, a payment form with a live card preview, delivery method cards, express checkout with guest and sign in, a country aware address form, an order review and a two column layout with a collapsible mobile summary."
---

::prose-callout{variant="warning" title="Demo forms, not a payment integration"}
These blocks validate and format input, then simulate a request with a timeout. They never send card data anywhere. Use your payment provider's hosted fields or payment element to collect real card details, and replace the simulated submit functions with calls to your server.
::

Every block takes a typed `items` array with `id`, `name`, `variant`, `price`, `quantity`, `image` and `href`, plus props for the tax rate and delivery options. Forms use vee-validate with yup, and the card fields are masked with `v-maska`. The card number check uses the Luhn algorithm, so `4242 4242 4242 4242` passes with any future expiry date.

Totals, shipping and tax are demo values. Calculate the real amounts on your server.

## Style One

Single page checkout with contact, shipping address, delivery cards and card payment. Errors show inline, the delivery choice updates the total, and a confirmation replaces the form after paying.

:BlockShowcase{blockPath="Ecommerce/Checkout/BlockCheckout1" component="BlockCheckout1" iframeHeight="1500px"}

## Style Two

Three step checkout with a numbered stepper that blocks skipping ahead. Each step validates before continuing, answers are kept when going back and a recap shows earlier choices.

:BlockShowcase{blockPath="Ecommerce/Checkout/BlockCheckout2" component="BlockCheckout2" iframeHeight="780px"}

## Style Three

Payment form with a card preview that updates as you type and detects the network. Includes masked fields, Luhn and expiry validation and a fill test card shortcut.

:BlockShowcase{blockPath="Ecommerce/Checkout/BlockCheckout3" component="BlockCheckout3" iframeHeight="680px"}

## Style Four

Delivery method step with radio cards, live arrival dates, a free shipping threshold and a gift wrap switch. The order summary updates with every choice.

:BlockShowcase{blockPath="Ecommerce/Checkout/BlockCheckout4" component="BlockCheckout4" iframeHeight="820px"}

## Style Five

Express checkout buttons for Apple Pay, Google Pay and PayPal, followed by tabs for guest checkout and signing in. Each tab validates different fields.

:BlockShowcase{blockPath="Ecommerce/Checkout/BlockCheckout5" component="BlockCheckout5" iframeHeight="700px"}

## Style Six

Address form that adapts to the selected country. The region and postal code labels, region options and validation pattern change with the country, and countries without a region list get a free text field. Add your own markets through the `countries` prop.

:BlockShowcase{blockPath="Ecommerce/Checkout/BlockCheckout6" component="BlockCheckout6" iframeHeight="860px"}

## Style Seven

Order review with contact, address, delivery and payment recaps. Each Edit button emits an `edit` event, and a required terms checkbox gates the place order button.

:BlockShowcase{blockPath="Ecommerce/Checkout/BlockCheckout7" component="BlockCheckout7" iframeHeight="780px"}

## Style Eight

Two column checkout with a shaded summary panel. On phones the summary collapses behind a bar that shows the total.

:BlockShowcase{blockPath="Ecommerce/Checkout/BlockCheckout8" component="BlockCheckout8" iframeHeight="1100px"}
