---
title: Credit Card
description: A visual credit card component with 13 style variants, optional scaling, and a card-network detection utility.
label: New
---

## Credits

This component was designed by [Untitled UI](https://www.untitledui.com/react/components/credit-cards). I just made it compatible with UI Thing.

## Source code

Click :SourceCodeLink{component="CreditCard.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add credit-card"}

## Usage

Import `getCardType` alongside the component when you need to detect the card network from a number entered by the user.

```ts
import { getCardType } from "~/components/Ui/CreditCard.vue";

const network = getCardType("4111 1111 1111 1111"); // "visa"
```

## Variants

### Normal

::ShowCase

:DocsCreditCardDefault

#code

<!-- automd:file src="../../app/components/content/Docs/CreditCard/DocsCreditCardDefault.vue" code lang="vue" -->

```vue [DocsCreditCardDefault.vue]
<template>
  <div class="flex flex-wrap justify-center gap-6 p-4">
    <UiCreditCard variant="brand-dark" />
    <UiCreditCard variant="gray-dark" />
    <UiCreditCard variant="gray-light" />
    <UiCreditCard variant="brand-light" />
    <UiCreditCard variant="transparent" />
    <UiCreditCard variant="transparent-gradient" />
  </div>
</template>
```

<!-- /automd -->

::

### Horizontal Strip

The bottom half of the card becomes a dark strip — common in designs that separate the number area from the brand area.

::ShowCase

:DocsCreditCardStrip

#code

<!-- automd:file src="../../app/components/content/Docs/CreditCard/DocsCreditCardStrip.vue" code lang="vue" -->

```vue [DocsCreditCardStrip.vue]
<template>
  <div class="flex flex-wrap justify-center gap-6 p-4">
    <UiCreditCard variant="gray-strip" />
    <UiCreditCard variant="gradient-strip" />
    <UiCreditCard variant="salmon-strip" />
    <UiCreditCard variant="transparent-strip" />
  </div>
</template>
```

<!-- /automd -->

::

### Vertical Strip

A dark panel occupies the left portion of the card, leaving a coloured accent stripe on the right.

::ShowCase

:DocsCreditCardVerticalStrip

#code

<!-- automd:file src="../../app/components/content/Docs/CreditCard/DocsCreditCardVerticalStrip.vue" code lang="vue" -->

```vue [DocsCreditCardVerticalStrip.vue]
<template>
  <div class="flex flex-wrap justify-center gap-6 p-4">
    <UiCreditCard variant="gray-strip-vertical" />
    <UiCreditCard variant="gradient-strip-vertical" />
    <UiCreditCard variant="salmon-strip-vertical" />
  </div>
</template>
```

<!-- /automd -->

::

### Scaled

Pass a `width` prop to scale the card proportionally from its native 316 × 190 px dimensions.

::ShowCase

:DocsCreditCardScaled

#code

<!-- automd:file src="../../app/components/content/Docs/CreditCard/DocsCreditCardScaled.vue" code lang="vue" -->

```vue [DocsCreditCardScaled.vue]
<template>
  <div class="flex flex-wrap items-end justify-center gap-6 p-4">
    <UiCreditCard variant="brand-dark" :width="200" />
    <UiCreditCard variant="brand-dark" :width="260" />
    <UiCreditCard variant="brand-dark" />
  </div>
</template>
```

<!-- /automd -->

::

## Props

| Prop              | Type                      | Default                 | Description                                                                                                                             |
| ----------------- | ------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`         | `CreditCardVariant`       | `"brand-dark"`          | Visual style of the card.                                                                                                               |
| `company`         | `string`                  | `"UI Thing."`           | Brand or company name shown at the top-left.                                                                                            |
| `cardNumber`      | `string`                  | `"1234 1234 1234 1234"` | Formatted card number.                                                                                                                  |
| `cardHolder`      | `string`                  | `"JOHN DOE"`            | Cardholder name shown in the footer.                                                                                                    |
| `cardExpiration`  | `string`                  | `"06/36"`               | Expiration date shown in the footer.                                                                                                    |
| `width`           | `number`                  | —                       | Target render width in px. The card scales proportionally when provided.                                                                |
| `networkIcon`     | `string`                  | —                       | Icon name for the network logo (e.g. `"logos:visa"`). Falls back to Mastercard based on variant. Overridden by the `network-icon` slot. |
| `contactlessIcon` | `string`                  | —                       | Icon name for the contactless symbol. Defaults to `"mdi:contactless-payment"`. Overridden by the `contactless-icon` slot.               |
| `class`           | `HTMLAttributes["class"]` | —                       | Extra classes applied to the outer wrapper element.                                                                                     |

## Slots

| Slot               | Description                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `company`          | Replaces the company name in the top-left corner.                                                 |
| `contactless-icon` | Replaces the contactless symbol in the top-right corner. Takes precedence over `contactlessIcon`. |
| `card-holder`      | Replaces the cardholder name in the footer.                                                       |
| `card-expiration`  | Replaces the expiration date in the footer.                                                       |
| `card-number`      | Replaces the card number in the footer.                                                           |
| `network-icon`     | Replaces the network logo in the bottom-right corner. Takes precedence over `networkIcon`.        |

## Variants reference

| Variant                   | Style                                       |
| ------------------------- | ------------------------------------------- |
| `brand-dark`              | Solid primary gradient                      |
| `brand-light`             | Light primary tint                          |
| `gray-dark`               | Dark gray gradient                          |
| `gray-light`              | Light gray                                  |
| `transparent`             | Frosted-glass (blur + white overlay)        |
| `transparent-gradient`    | Frosted-glass with coloured diffuse glows   |
| `gray-strip`              | Light gray top, dark strip bottom           |
| `gradient-strip`          | Blue→pink gradient top, dark strip bottom   |
| `salmon-strip`            | Salmon top, dark strip bottom               |
| `transparent-strip`       | Frosted top, dark strip bottom              |
| `gray-strip-vertical`     | Dark panel left, glass right                |
| `gradient-strip-vertical` | Dark panel left, pink→purple gradient right |
| `salmon-strip-vertical`   | Dark panel left, salmon right               |
