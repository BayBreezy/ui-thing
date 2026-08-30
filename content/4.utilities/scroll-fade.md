---
title: Scroll Fade
description: Utilities for adding a fade effect to the edges of a scroll container.

---

## Credits

Shout out to [Shadcn Vue](https://www.shadcn-vue.com/docs/utilities/scroll-fade) for the hard work on this utility.


::prose-show-case

:DocsScrollFade

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollFade/DocsScrollFade.vue" code lang="vue" -->

```vue [DocsScrollFade.vue]
<template>
  <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
    <div class="scroll-fade h-72 scrollbar-none overflow-y-auto">
      <div class="flex flex-col gap-1.5 p-1.5">
        <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`);
</script>
```

<!-- /automd -->

::


## Installation

Adding this to your project ensures that the scroll fade utility is available for use in your components.

```css [scroll-fade.css]
@property --scroll-fade-t {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-b {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-s {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-e {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-mask {
  syntax: "*";
  inherits: false;
}

@theme inline {
  @keyframes scroll-fade-reveal-t {
    from {
      --scroll-fade-t: 0px;
    }
    to {
      --scroll-fade-t: var(--_scroll-fade-size-t, var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10))));
    }
  }
  @keyframes scroll-fade-reveal-b {
    from {
      --scroll-fade-b: var(--_scroll-fade-size-b, var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10))));
    }
    to {
      --scroll-fade-b: 0px;
    }
  }
  @keyframes scroll-fade-reveal-s {
    from {
      --scroll-fade-s: 0px;
    }
    to {
      --scroll-fade-s: var(--_scroll-fade-size-s, var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10))));
    }
  }
  @keyframes scroll-fade-reveal-e {
    from {
      --scroll-fade-e: var(--_scroll-fade-size-e, var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10))));
    }
    to {
      --scroll-fade-e: 0px;
    }
  }
}

@utility scroll-fade {
  --_scroll-fade-size-t: var(
    --scroll-fade-t-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --_scroll-fade-size-b: var(
    --scroll-fade-b-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-block: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--scroll-fade-t, 0px),
    #000 calc(100% - var(--scroll-fade-b, 0px)),
    transparent 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
  mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation:
      scroll-fade-reveal-t 1ms ease-in-out,
      scroll-fade-reveal-b 1ms ease-in-out;
    animation-timeline: scroll(self y), scroll(self y);
    animation-range:
      0 var(--scroll-fade-reveal, calc(var(--spacing) * 24)),
      calc(100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))) 100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-t: var(--_scroll-fade-size-t);
    --scroll-fade-b: var(--_scroll-fade-size-b);
  }
}

@utility scroll-fade-y {
  --_scroll-fade-size-t: var(
    --scroll-fade-t-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --_scroll-fade-size-b: var(
    --scroll-fade-b-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-block: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--scroll-fade-t, 0px),
    #000 calc(100% - var(--scroll-fade-b, 0px)),
    transparent 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
  mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation:
      scroll-fade-reveal-t 1ms ease-in-out,
      scroll-fade-reveal-b 1ms ease-in-out;
    animation-timeline: scroll(self y), scroll(self y);
    animation-range:
      0 var(--scroll-fade-reveal, calc(var(--spacing) * 24)),
      calc(100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))) 100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-t: var(--_scroll-fade-size-t);
    --scroll-fade-b: var(--_scroll-fade-size-b);
  }
}

@utility scroll-fade-x {
  --_scroll-fade-size-s: var(
    --scroll-fade-s-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --_scroll-fade-size-e: var(
    --scroll-fade-e-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-inline: linear-gradient(
    to right,
    transparent 0,
    #000 var(--scroll-fade-s, 0px),
    #000 calc(100% - var(--scroll-fade-e, 0px)),
    transparent 100%
  );
  &:where([dir="rtl"], [dir="rtl"] *) {
    --scroll-fade-inline: linear-gradient(
      to left,
      transparent 0,
      #000 var(--scroll-fade-s, 0px),
      #000 calc(100% - var(--scroll-fade-e, 0px)),
      transparent 100%
    );
  }
  -webkit-mask-image: var(--scroll-fade-mask, var(--scroll-fade-inline));
  mask-image: var(--scroll-fade-mask, var(--scroll-fade-inline));
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation:
      scroll-fade-reveal-s 1ms ease-in-out,
      scroll-fade-reveal-e 1ms ease-in-out;
    animation-timeline: scroll(self inline), scroll(self inline);
    animation-range:
      0 var(--scroll-fade-reveal, calc(var(--spacing) * 24)),
      calc(100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))) 100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-s: var(--_scroll-fade-size-s);
    --scroll-fade-e: var(--_scroll-fade-size-e);
  }
}

@utility scroll-fade-t {
  --_scroll-fade-size-t: var(
    --scroll-fade-t-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--scroll-fade-t, 0px),
    #000 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-t 1ms ease-in-out;
    animation-timeline: scroll(self y);
    animation-range: 0 var(--scroll-fade-reveal, calc(var(--spacing) * 24));
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-t: var(--_scroll-fade-size-t);
  }
}

@utility scroll-fade-b {
  --_scroll-fade-size-b: var(
    --scroll-fade-b-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to bottom,
    #000 0,
    #000 calc(100% - var(--scroll-fade-b, 0px)),
    transparent 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-b 1ms ease-in-out;
    animation-timeline: scroll(self y);
    animation-range: calc(
        100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))
      )
      100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-b: var(--_scroll-fade-size-b);
  }
}

@utility scroll-fade-l {
  --_scroll-fade-size-s: var(
    --scroll-fade-s-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to right,
    transparent 0,
    #000 var(--scroll-fade-s, 0px),
    #000 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-s 1ms ease-in-out;
    animation-timeline: scroll(self x);
    animation-range: 0 var(--scroll-fade-reveal, calc(var(--spacing) * 24));
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-s: var(--_scroll-fade-size-s);
  }
}

@utility scroll-fade-r {
  --_scroll-fade-size-e: var(
    --scroll-fade-e-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to right,
    #000 0,
    #000 calc(100% - var(--scroll-fade-e, 0px)),
    transparent 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-e 1ms ease-in-out;
    animation-timeline: scroll(self x);
    animation-range: calc(
        100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))
      )
      100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-e: var(--_scroll-fade-size-e);
  }
}

@utility scroll-fade-s {
  --_scroll-fade-size-s: var(
    --scroll-fade-s-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to right,
    transparent 0,
    #000 var(--scroll-fade-s, 0px),
    #000 100%
  );
  &:where([dir="rtl"], [dir="rtl"] *) {
    --scroll-fade-mask: linear-gradient(
      to left,
      transparent 0,
      #000 var(--scroll-fade-s, 0px),
      #000 100%
    );
  }
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-s 1ms ease-in-out;
    animation-timeline: scroll(self inline);
    animation-range: 0 var(--scroll-fade-reveal, calc(var(--spacing) * 24));
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-s: var(--_scroll-fade-size-s);
  }
}

@utility scroll-fade-e {
  --_scroll-fade-size-e: var(
    --scroll-fade-e-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to right,
    #000 0,
    #000 calc(100% - var(--scroll-fade-e, 0px)),
    transparent 100%
  );
  &:where([dir="rtl"], [dir="rtl"] *) {
    --scroll-fade-mask: linear-gradient(
      to left,
      #000 0,
      #000 calc(100% - var(--scroll-fade-e, 0px)),
      transparent 100%
    );
  }
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-e 1ms ease-in-out;
    animation-timeline: scroll(self inline);
    animation-range: calc(
        100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))
      )
      100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-e: var(--_scroll-fade-size-e);
  }
}

@utility scroll-fade-* {
  --scroll-fade-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-size: --value([length], [percentage]);
}

@utility scroll-fade-t-* {
  --scroll-fade-t-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-t-size: --value([length], [percentage]);
}

@utility scroll-fade-b-* {
  --scroll-fade-b-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-b-size: --value([length], [percentage]);
}

@utility scroll-fade-s-* {
  --scroll-fade-s-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-s-size: --value([length], [percentage]);
}

@utility scroll-fade-e-* {
  --scroll-fade-e-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-e-size: --value([length], [percentage]);
}

@utility scroll-fade-none {
  --scroll-fade-mask: none;
}
```

## Usage

| Class | Styles|
| --- | --- |
| `scroll-fade`                     | `mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));` <br /> `animation-timeline: scroll(self y);`       |
| `scroll-fade-y`                   | `mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));` <br /> `animation-timeline: scroll(self y);`       |
| `scroll-fade-x`                   | `mask-image: var(--scroll-fade-mask, var(--scroll-fade-inline));` <br /> `animation-timeline: scroll(self inline);` |
| `scroll-fade-t`                   | Fade mask on the top edge. <br /> `animation-timeline: scroll(self y);`                                             |
| `scroll-fade-b`                   | Fade mask on the bottom edge. <br /> `animation-timeline: scroll(self y);`                                          |
| `scroll-fade-l`                   | Fade mask on the left edge. <br /> `animation-timeline: scroll(self x);`                                            |
| `scroll-fade-r`                   | Fade mask on the right edge. <br /> `animation-timeline: scroll(self x);`                                           |
| `scroll-fade-s`                   | Fade mask on the start edge, mirrors in RTL. <br /> `animation-timeline: scroll(self inline);`                      |
| `scroll-fade-e`                   | Fade mask on the end edge, mirrors in RTL. <br /> `animation-timeline: scroll(self inline);`                        |
| `scroll-fade-<number>`            | `--scroll-fade-size: calc(var(--spacing) * <number>);`                                                              |
| `scroll-fade-[<value>]`           | `--scroll-fade-size: <value>;`                                                                                      |
| `scroll-fade-{t,b,s,e}-<number>`  | `--scroll-fade-{t,b,s,e}-size: calc(var(--spacing) * <number>);`                                                    |
| `scroll-fade-{t,b,s,e}-[<value>]` | `--scroll-fade-{t,b,s,e}-size: <value>;`                                                                            |
| `scroll-fade-none`                | `--scroll-fade-mask: none;`                                                                                         |

Add `scroll-fade` or `scroll-fade-y` to the scroll container, i.e. the element that has `overflow-y-auto`.

```vue
<template>
  <div class="scroll-fade overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

The fade is scroll-aware and tracks the scroll position:

- At rest, the top edge is crisp and the bottom edge fades to hint at more content.
- As you scroll, a fade appears at the top and both edges stay faded mid-scroll.
- At the end, the bottom edge sharpens to show you have reached the last item.

The fade is applied with `mask-image`, so it dissolves the content itself rather than overlaying a color. The mask uses a linear fade from transparent to black, so it adapts to any background without configuration. If your scroll area sits inside a card, put the background and border on a wrapper and `scroll-fade` on the inner scroller, so the fade dissolves the content and not the card.

The [`ScrollArea`](/docs/components/scroll-area) and [`MessageScroller`](/docs/components/message-scroller) components can use `scroll-fade` on their scrollable viewport.

## No Overflow, No Fade

If the content does not overflow, no fade is shown. You can apply `scroll-fade` to any list without checking whether it scrolls.

::prose-show-case

:DocsScrollFadeOverflow

#code


<!-- automd:file src="../../app/components/content/Docs/ScrollFade/DocsScrollFadeOverflow.vue" code lang="vue" -->

```vue [DocsScrollFadeOverflow.vue]
<script setup lang="ts">
  const items = Array.from({ length: 3 }, (_, index) => `Item ${index + 1}`);
</script>

<template>
  <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
    <div class="scroll-fade scrollbar-none overflow-y-auto">
      <div class="flex flex-col gap-1.5 p-1.5">
        <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

## Horizontal Scrolling

Use `scroll-fade-x` on containers that scroll horizontally, i.e. the element that has `overflow-x-auto`.

::prose-show-case

:DocsScrollFadeHorizontal

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollFade/DocsScrollFadeHorizontal.vue" code lang="vue" -->

```vue [DocsScrollFadeHorizontal.vue]
<script setup lang="ts">
  const tags = [
    "Design",
    "Engineering",
    "Marketing",
    "Product",
    "Research",
    "Sales",
    "Support",
    "Operations",
    "Finance",
    "Legal",
    "People",
    "Security",
  ];
</script>

<template>
  <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
    <div class="scroll-fade-x scrollbar-none overflow-x-auto">
      <div class="flex w-max gap-1.5 p-1.5">
        <div
          v-for="tag in tags"
          :key="tag"
          class="bg-muted shrink-0 rounded-lg px-3 py-2.5 text-sm"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

```vue
<template>
  <div class="flex scroll-fade-x overflow-x-auto">
    <!-- ... -->
  </div>
</template>
```

The horizontal fade is direction-aware. In RTL layouts, the crisp edge and the fade follow the reading direction with no extra classes needed. `scroll-fade-<number>` and `scroll-fade-none` work the same for both axes.

## Edge Fades

Use edge utilities when only one edge should track the scroll position.

::prose-show-case

:DocsScrollFadeEdge

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollFade/DocsScrollFadeEdge.vue" code lang="vue" -->

```vue [DocsScrollFadeEdge.vue]
<script setup lang="ts">
  const items = [
    "Inbox triage",
    "Design review",
    "API contract",
    "QA pass",
    "Launch notes",
    "Metrics follow-up",
  ];

  const tags = [
    "Design",
    "Engineering",
    "Marketing",
    "Product",
    "Research",
    "Sales",
    "Support",
    "Operations",
  ];
</script>

<template>
  <div class="mx-auto flex max-w-xs min-w-0 flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-t h-36 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-t</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-b h-36 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-b</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-s scrollbar-none overflow-x-auto">
          <div class="flex w-max gap-1.5 p-1.5">
            <div
              v-for="tag in tags"
              :key="tag"
              class="bg-muted shrink-0 rounded-xl px-4 py-2.5 text-sm"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-s</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-e scrollbar-none overflow-x-auto">
          <div class="flex w-max gap-1.5 p-1.5">
            <div
              v-for="tag in tags"
              :key="tag"
              class="bg-muted shrink-0 rounded-xl px-4 py-2.5 text-sm"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-e</p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

```vue
<template>
  <div class="scroll-fade-b overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

The edge utilities are scroll-aware. Start edges fade in after you scroll away from the start, and end edges fade out when you reach the end. Use `scroll-fade-t`, `scroll-fade-b`, `scroll-fade-l`, and `scroll-fade-r` for physical edges. Use `scroll-fade-s` and `scroll-fade-e` for logical inline edges that mirror in RTL.

## Fade Size

The fade depth defaults to `12%` of the container, capped at `40px` so tall scrollers stay subtle. Use `scroll-fade-<number>` to set a fixed size on the spacing scale instead, the same way `scroll-mt-<number>` works.

::prose-show-case

:DocsScrollFadeSize

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollFade/DocsScrollFadeSize.vue" code lang="vue" -->

```vue [DocsScrollFadeSize.vue]
<script setup lang="ts">
  const items = Array.from({ length: 8 }, (_, index) => `Item ${index + 1}`);
</script>

<template>
  <div class="mx-auto flex w-full max-w-xs flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade scroll-fade-4 h-48 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-4</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade scroll-fade-24 h-48 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-24</p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

```vue
<template>
  <div class="scroll-fade scroll-fade-24 overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

For one-off values, use an arbitrary length or percentage:

```vue
<template>
  <div class="scroll-fade scroll-fade-[15%] overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

To fade opposite edges by different amounts, use the per-edge modifiers `scroll-fade-t-<number>`, `scroll-fade-b-<number>`, `scroll-fade-s-<number>`, and `scroll-fade-e-<number>`. They override `scroll-fade-<number>` on the edge they target and accept arbitrary values too.

```vue
<template>
  <div class="scroll-fade scroll-fade-b-8 scroll-fade-t-2 overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

Use the logical `s`/`e` modifiers for horizontal scrollers so the sizes mirror in RTL.

The fade eases in and out over a fixed scroll distance rather than appearing instantly. That distance is the `--scroll-fade-reveal` variable, `96px` by default and independent of the fade depth. Lower it for a snappier reveal or raise it for a more gradual one:

```vue
<template>
  <div class="scroll-fade overflow-y-auto [--scroll-fade-reveal:64px]">
    <!-- ... -->
  </div>
</template>
```

## Disabling the Fade

Use `scroll-fade-none` to remove the fade. It works in any class order, so the typical use is responsive or stateful:

```vue
<template>
  <div class="scroll-fade overflow-y-auto md:scroll-fade-none">
    <!-- ... -->
  </div>
</template>
```

::prose-show-case

:DocsScrollFadeNone

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollFade/DocsScrollFadeNone.vue" code lang="vue" -->

```vue [DocsScrollFadeNone.vue]
<script setup lang="ts">
  const items = Array.from({ length: 8 }, (_, index) => `Item ${index + 1}`);
</script>

<template>
  <div class="mx-auto flex w-full max-w-xs min-w-0 flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade h-48 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade scroll-fade-none h-48 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">
        scroll-fade scroll-fade-none
      </p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

## Fallback

The scroll-aware behavior is implemented with [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations), with no JavaScript and no scroll listeners. In browsers that do not support scroll-driven animations, `scroll-fade` falls back to a static fade on both edges, and edge utilities fall back to a static fade on the selected edge.

Since the mask is applied to the scroll container itself, a visible scrollbar fades with the content at the edges. Pair `scroll-fade` with `scrollbar-none`, which ships in the same package, if you want to hide the scrollbar entirely.

## RTL

`scroll-fade-x` follows the reading direction. At rest, the start edge is crisp and the end edge fades. In RTL layouts that means a crisp right edge and a fade on the left, mirrored from LTR.

::prose-show-case

:DocsScrollFadeR_T_L

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollFade/DocsScrollFadeRTL.vue" code lang="vue" -->

```vue [DocsScrollFadeRTL.vue]
<script setup lang="ts">
  const ltrTags = [
    "Design",
    "Engineering",
    "Marketing",
    "Product",
    "Research",
    "Sales",
    "Support",
    "Operations",
    "Finance",
    "Legal",
  ];

  const rtlTags = [
    "تصميم",
    "هندسة",
    "تسويق",
    "منتج",
    "أبحاث",
    "مبيعات",
    "دعم",
    "عمليات",
    "مالية",
    "قانوني",
  ];
</script>

<template>
  <div class="mx-auto grid w-full max-w-lg gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-3">
      <div dir="ltr" class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-x scrollbar-none overflow-x-auto">
          <div class="flex w-max gap-1.5 p-1.5">
            <div
              v-for="tag in ltrTags"
              :key="tag"
              class="bg-muted shrink-0 rounded-lg px-3 py-2.5 text-sm"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">dir="ltr"</p>
    </div>
    <div class="flex flex-col gap-3">
      <div dir="rtl" class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-x scrollbar-none overflow-x-auto">
          <div class="flex w-max gap-1.5 p-1.5">
            <div
              v-for="tag in rtlTags"
              :key="tag"
              class="bg-muted shrink-0 rounded-lg px-3 py-2.5 text-sm"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">dir="rtl"</p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
