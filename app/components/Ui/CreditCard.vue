<template>
  <div
    data-slot="credit-card"
    :style="{ width: `${scaledDims.width}px`, height: `${scaledDims.height}px` }"
    :class="['relative flex', normalizeClass(props.class) || undefined]"
  >
    <div
      data-slot="credit-card-inner"
      :style="{
        transform: `scale(${scaledDims.scale})`,
        width: `${ORIGINAL_WIDTH}px`,
        height: `${ORIGINAL_HEIGHT}px`,
      }"
      :class="variantStyles.root()"
    >
      <!-- Horizontal strip -->
      <div
        v-if="isStripType"
        class="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2 bg-gray-800"
      />
      <!-- Vertical strip -->
      <div
        v-if="isVerticalStripType"
        class="pointer-events-none absolute inset-y-0 right-22 left-0 z-0 bg-gray-800"
      />
      <!-- Gradient diffusor -->
      <div
        v-if="variant === 'transparent-gradient'"
        class="absolute -top-4 -left-4 grid grid-cols-2 blur-3xl"
      >
        <div class="size-20 rounded-tl-full bg-pink-500 opacity-30 mix-blend-normal" />
        <div class="size-20 rounded-tr-full bg-orange-500 opacity-50 mix-blend-normal" />
        <div class="size-20 rounded-bl-full bg-blue-500 opacity-30 mix-blend-normal" />
        <div class="size-20 rounded-br-full bg-green-500 opacity-30 mix-blend-normal" />
      </div>

      <!-- Header -->
      <div class="relative flex items-start justify-between px-1 pt-1">
        <div data-slot="credit-card-company" :class="variantStyles.company()">
          <slot name="company">{{ company }}</slot>
        </div>
        <div data-slot="credit-card-contactless" :class="variantStyles.paypassIcon()">
          <slot name="contactless-icon">
            <Icon :name="contactlessIcon ?? 'mdi:contactless-payment'" class="size-full" />
          </slot>
        </div>
      </div>

      <!-- Footer -->
      <div class="relative flex items-end justify-between gap-3">
        <div class="flex min-w-0 flex-col gap-2">
          <div class="flex items-end gap-1">
            <p
              data-slot="credit-card-holder"
              :class="[
                'text-xs leading-snug font-semibold tracking-[0.6px] wrap-break-word uppercase',
                variantStyles.footerText(),
              ]"
            >
              <slot name="card-holder">{{ cardHolder }}</slot>
            </p>
            <p
              data-slot="credit-card-expiration"
              :class="[
                'ml-auto text-right text-xs leading-normal font-semibold tracking-[0.6px] tabular-nums',
                variantStyles.footerText(),
              ]"
            >
              <slot name="card-expiration">{{ cardExpiration }}</slot>
            </p>
          </div>
          <div
            data-slot="credit-card-number"
            :class="[
              'text-md leading-normal font-semibold tracking-[1px] tabular-nums',
              variantStyles.footerText(),
            ]"
          >
            <slot name="card-number">{{ cardNumber }}</slot>
            <!-- Placeholder to preserve space when card number is empty -->
            <span class="pointer-events-none invisible inline-block w-0 max-w-0 opacity-0">1</span>
          </div>
        </div>

        <div data-slot="credit-card-network" :class="variantStyles.cardTypeRoot()">
          <slot name="network-icon">
            <Icon v-if="networkIcon" :name="networkIcon" class="size-8" />
            <Icon
              v-else
              :name="showColorLogo ? 'logos:mastercard' : 'simple-icons:mastercard'"
              :class="['size-8', !showColorLogo && 'text-white']"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  /** Card network detected from a card number. */
  export type CardNetworkType = "visa" | "mastercard" | "amex" | "discover" | "unknown";

  /**
   * Detect the card network from a card number string.
   * Accepts raw digits or formatted strings (spaces/dashes are stripped).
   */
  export function getCardType(cardNumber: string): CardNetworkType {
    const cleaned = cardNumber.replace(/\D/g, "");
    if (/^4/.test(cleaned)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    if (/^6(011|5)/.test(cleaned)) return "discover";
    return "unknown";
  }

  export const STRIP_TYPES = [
    "transparent-strip",
    "gray-strip",
    "gradient-strip",
    "salmon-strip",
  ] as const;

  export const VERTICAL_STRIP_TYPES = [
    "gray-strip-vertical",
    "gradient-strip-vertical",
    "salmon-strip-vertical",
  ] as const;

  export const CARD_WITH_COLOR_LOGO = [
    "brand-dark",
    "brand-light",
    "gray-dark",
    "gray-light",
  ] as const;

  export type CreditCardVariant =
    | "transparent"
    | "transparent-gradient"
    | "brand-dark"
    | "brand-light"
    | "gray-dark"
    | "gray-light"
    | (typeof STRIP_TYPES)[number]
    | (typeof VERTICAL_STRIP_TYPES)[number];
</script>

<script lang="ts" setup>
  const ORIGINAL_WIDTH = 316;
  const ORIGINAL_HEIGHT = 190;

  const cardStyles = tv({
    slots: {
      root: "absolute top-0 left-0 flex origin-top-left flex-col justify-between overflow-hidden rounded-2xl p-4",
      company: "text-md leading-normal font-semibold",
      footerText: "",
      paypassIcon: "size-6",
      cardTypeRoot: "flex h-8 w-[46px] shrink-0 items-center justify-center rounded",
    },
    variants: {
      variant: {
        transparent: {
          root: "bg-black/10 bg-linear-to-br from-white/30 to-transparent backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-border before:ring-inset dark:before:ring-white/30",
          company: "text-muted-foreground dark:text-white",
          footerText: "text-muted-foreground dark:text-white",
          paypassIcon: "text-muted-foreground dark:text-white",
          cardTypeRoot: "bg-muted/50 dark:bg-white/10",
        },
        "transparent-gradient": {
          root: "bg-black/10 bg-linear-to-br from-white/30 to-transparent backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
          company: "text-muted-foreground dark:text-white",
          footerText: "text-muted-foreground dark:text-white",
          paypassIcon: "text-muted-foreground dark:text-white",
          cardTypeRoot: "bg-muted/50 dark:bg-white/10",
        },
        "brand-dark": {
          root: "bg-linear-to-tr from-primary/90 to-primary before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
          company: "text-white",
          footerText: "text-white",
          paypassIcon: "text-white",
          cardTypeRoot: "bg-white/10",
        },
        "brand-light": {
          root: "bg-primary/10 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-primary/10 before:ring-inset dark:bg-primary/70 dark:before:ring-white/20",
          company: "text-primary dark:text-foreground",
          footerText: "text-primary dark:text-foreground",
          paypassIcon: "text-primary dark:text-foreground",
          cardTypeRoot: "bg-white dark:bg-white/10",
        },
        "gray-dark": {
          root: "bg-linear-to-tr from-gray-900 to-gray-700 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
          company: "text-white",
          footerText: "text-white",
          paypassIcon: "text-white",
          cardTypeRoot: "bg-white/10",
        },
        "gray-light": {
          root: "bg-gray-100 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-black/10 before:ring-inset",
          company: "text-gray-700",
          footerText: "text-gray-700",
          paypassIcon: "text-gray-400",
          cardTypeRoot: "bg-white",
        },
        "transparent-strip": {
          root: "bg-linear-to-br from-white/30 to-transparent backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-border/50 before:ring-inset dark:before:ring-white/30",
          company: "text-muted-foreground dark:text-white",
          footerText: "text-white",
          paypassIcon: "text-muted-foreground dark:text-white",
          cardTypeRoot: "bg-white/10",
        },
        "gray-strip": {
          root: "bg-gray-100 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
          company: "text-gray-700",
          footerText: "text-white",
          paypassIcon: "text-gray-400",
          cardTypeRoot: "bg-white/10",
        },
        "gradient-strip": {
          root: "bg-linear-to-b from-[#A5C0EE] to-[#FBC5EC] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
          company: "text-white",
          footerText: "text-white",
          paypassIcon: "text-white",
          cardTypeRoot: "bg-white/10",
        },
        "salmon-strip": {
          root: "bg-[#F4D9D0] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
          company: "text-gray-700",
          footerText: "text-white",
          paypassIcon: "text-white",
          cardTypeRoot: "bg-white/10",
        },
        "gray-strip-vertical": {
          root: "bg-linear-to-br from-white/30 to-transparent before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
          company: "text-white",
          footerText: "text-white",
          paypassIcon: "text-muted-foreground dark:text-white",
          cardTypeRoot: "bg-white/10",
        },
        "gradient-strip-vertical": {
          root: "bg-linear-to-b from-[#FBC2EB] to-[#A18CD1] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
          company: "text-white",
          footerText: "text-white",
          paypassIcon: "text-white",
          cardTypeRoot: "bg-white/10",
        },
        "salmon-strip-vertical": {
          root: "bg-[#F4D9D0] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
          company: "text-white",
          footerText: "text-white",
          paypassIcon: "text-white",
          cardTypeRoot: "bg-white/10",
        },
      },
    },
    defaultVariants: {
      variant: "brand-dark",
    },
  });

  const props = withDefaults(
    defineProps<{
      /** Additional class(es) applied to the outer wrapper. */
      class?: HTMLAttributes["class"];
      /** Brand / company name shown at the top-left of the card. */
      company?: string;
      /** Formatted card number, e.g. "1234 1234 1234 1234". */
      cardNumber?: string;
      /** Cardholder name shown above the card number. */
      cardHolder?: string;
      /** Expiration date shown top-right of the footer row, e.g. "06/28". */
      cardExpiration?: string;
      /** Visual variant of the card. */
      variant?: CreditCardVariant;
      /**
       * Desired render width in pixels. The card scales proportionally from
       * its native 316×190 px dimensions. Omit to use native size.
       */
      width?: number;
      /**
       * Icon name for the network logo, e.g. `"logos:visa"`.
       * Falls back to Mastercard (colored or white depending on variant).
       * Overridden entirely by the `network-icon` slot.
       */
      networkIcon?: string;
      /**
       * Icon name for the contactless symbol.
       * Defaults to `"mdi:contactless-payment"`.
       * Overridden entirely by the `contactless-icon` slot.
       */
      contactlessIcon?: string;
    }>(),
    {
      company: "UI Thing.",
      cardNumber: "1234 1234 1234 1234",
      cardHolder: "JOHN DOE",
      cardExpiration: "06/36",
      variant: "brand-dark",
    }
  );

  const scaledDims = computed(() => {
    if (!props.width) return { scale: 1, width: ORIGINAL_WIDTH, height: ORIGINAL_HEIGHT };
    const scale = props.width / ORIGINAL_WIDTH;
    return { scale, width: props.width, height: ORIGINAL_HEIGHT * scale };
  });

  const variantStyles = computed(() => cardStyles({ variant: props.variant }));

  const isStripType = computed(() =>
    STRIP_TYPES.includes(props.variant as (typeof STRIP_TYPES)[number])
  );
  const isVerticalStripType = computed(() =>
    VERTICAL_STRIP_TYPES.includes(props.variant as (typeof VERTICAL_STRIP_TYPES)[number])
  );
  const showColorLogo = computed(() =>
    CARD_WITH_COLOR_LOGO.includes(props.variant as (typeof CARD_WITH_COLOR_LOGO)[number])
  );

  defineSlots<{
    /** Replaces the company name in the top-left corner. */
    company(): unknown;
    /** Replaces the contactless symbol in the top-right corner. */
    "contactless-icon"(): unknown;
    /** Replaces the cardholder name in the footer. */
    "card-holder"(): unknown;
    /** Replaces the expiration date in the footer. */
    "card-expiration"(): unknown;
    /** Replaces the card number in the footer. */
    "card-number"(): unknown;
    /** Replaces the network logo in the bottom-right corner. */
    "network-icon"(): unknown;
  }>();
</script>
