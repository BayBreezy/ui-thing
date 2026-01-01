---
title: Flip Clock
description: Animated split-flap clock that supports live time and countdown modes.
label: New
---

## Source code

Click :SourceCodeLink{component="FlipClock"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Credits

This port is based on the 8 Star Labs UI flip clock — thanks to [8 Star Labs UI](https://ui.8starlabs.com/docs/components/flip-clock) for the original design.

## Installation

:prose-pm-x{command="ui-thing@latest add flip-clock"}

## Usage

### Live clock and countdown

::ShowCase

:DocsFlipClockBasic

#code

<!-- automd:file src="../../app/components/content/Docs/FlipClock/DocsFlipClockBasic.vue" code lang="vue" -->

```vue [DocsFlipClockBasic.vue]
<template>
  <div class="flex flex-col gap-10">
    <section class="space-y-3">
      <p class="text-sm text-muted-foreground">Live clock</p>
      <UiFlipClock size="lg" />
    </section>

    <section class="space-y-3">
      <p class="text-sm text-muted-foreground">Countdown (shows days, violet variant)</p>
      <UiFlipClock countdown show-days="always" :target-date="targetDate" variant="violet" />
    </section>
  </div>
</template>

<script lang="ts" setup>
  const targetDate = ref(new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 45));
</script>
```

<!-- /automd -->

::

### Sizes

::ShowCase

:DocsFlipClockSizes

#code

<!-- automd:file src="../../app/components/content/Docs/FlipClock/DocsFlipClockSizes.vue" code lang="vue" -->

```vue [DocsFlipClockSizes.vue]
<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center gap-6">
      <div class="space-y-2">
        <p class="text-sm text-muted-foreground">Size: sm</p>
        <UiFlipClock size="sm" />
      </div>
      <div class="space-y-2">
        <p class="text-sm text-muted-foreground">Size: md</p>
        <UiFlipClock size="md" />
      </div>
      <div class="space-y-2">
        <p class="text-sm text-muted-foreground">Size: lg</p>
        <UiFlipClock size="lg" />
      </div>
      <div class="space-y-2">
        <p class="text-sm text-muted-foreground">Size: xl</p>
        <UiFlipClock size="xl" />
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Variants

::ShowCase

:DocsFlipClockVariants

#code

<!-- automd:file src="../../app/components/content/Docs/FlipClock/DocsFlipClockVariants.vue" code lang="vue" -->

```vue [DocsFlipClockVariants.vue]
<template>
  <div class="flex flex-col gap-6">
    <div class="grid gap-4 md:grid-cols-2">
      <div v-for="variant in variants" :key="variant" class="space-y-2">
        <p class="text-sm text-muted-foreground">Variant: {{ variant }}</p>
        <UiFlipClock size="sm" :variant="variant" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const variants = [
    "default",
    "secondary",
    "destructive",
    "outline",
    "muted",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ] as const;
</script>
```

<!-- /automd -->

::

### Day display modes

::ShowCase

:DocsFlipClockShowDays

#code

<!-- automd:file src="../../app/components/content/Docs/FlipClock/DocsFlipClockShowDays.vue" code lang="vue" -->

```vue [DocsFlipClockShowDays.vue]
<template>
  <div class="grid gap-6">
    <div class="space-y-2">
      <p class="text-sm text-muted-foreground">show-days="auto" (only when days > 0)</p>
      <UiFlipClock countdown show-days="auto" :target-date="targetDate" />
    </div>
    <div class="space-y-2">
      <p class="text-sm text-muted-foreground">show-days="always"</p>
      <UiFlipClock countdown show-days="always" :target-date="targetDate" variant="emerald" />
    </div>
    <div class="space-y-2">
      <p class="text-sm text-muted-foreground">show-days="never"</p>
      <UiFlipClock countdown show-days="never" :target-date="targetDate" variant="fuchsia" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const targetDate = computed(() => {
    return dayjs().add(2, "day").add(5, "hour").add(30, "minute").toDate();
  });
</script>
```

<!-- /automd -->

::

## Props

- `countdown` (boolean, default `false`): when `true`, counts down toward `targetDate`; otherwise shows the current time.
- `targetDate` (Date | string | number): future point in time to count down to. Ignored when `countdown` is `false`.
- `showDays` (`auto` | `always` | `never`, default `auto`): controls when the days column is rendered.
- `size` (`sm` | `md` | `lg` | `xl`): adjusts digit dimensions and spacing.
- `variant`: supports `default`, `secondary`, `destructive`, `outline`, `muted`, plus Tailwind color hues (`red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`).

## Accessibility

- The wrapping element uses `aria-live="polite"` and includes a visually hidden time string for screen readers.
- Digits update individually to avoid excessive announcements while keeping time changes detectable.
