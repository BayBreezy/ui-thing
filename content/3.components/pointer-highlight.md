---
title: Pointer Highlight
description: Draw attention to any element with an animated rectangle and pointer reveal.
---

## Source code

Click :SourceCodeLink{component="PointerHighlight.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add pointer-highlight"}

## Usage

### Inline text

::prose-show-case

:DocsPointerHighlightInline

#code

<!-- automd:file src="../../app/components/content/Docs/PointerHighlight/DocsPointerHighlightInline.vue" code lang="vue" -->

```vue [DocsPointerHighlightInline.vue]
<template>
  <div class="mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl">
    The best way to grow is to
    <UiPointerHighlight container-class="mx-1 inline-block align-middle">
      <span>collaborate</span>
    </UiPointerHighlight>
  </div>
</template>
```

<!-- /automd -->

::

### Basic example

::prose-show-case

:DocsPointerHighlightBasic

#code

<!-- automd:file src="../../app/components/content/Docs/PointerHighlight/DocsPointerHighlightBasic.vue" code lang="vue" -->

```vue [DocsPointerHighlightBasic.vue]
<template>
  <div class="flex justify-center py-10">
    <UiPointerHighlight>
      <div>
        <p class="text-lg font-semibold">Everything important deserves a little attention.</p>
      </div>
    </UiPointerHighlight>
  </div>
</template>
```

<!-- /automd -->

::

### Animated background

::prose-show-case

:DocsPointerHighlightBackground

#code

<!-- automd:file src="../../app/components/content/Docs/PointerHighlight/DocsPointerHighlightBackground.vue" code lang="vue" -->

```vue [DocsPointerHighlightBackground.vue]
<template>
  <div class="mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl">
    There has to be some
    <UiPointerHighlight
      rectangle-class="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
      pointer-class="text-yellow-500"
    >
      <span class="relative z-10">background to animate too</span>
    </UiPointerHighlight>
  </div>
</template>
```

<!-- /automd -->

::

### Styled card

::prose-show-case

:DocsPointerHighlightCard

#code

<!-- automd:file src="../../app/components/content/Docs/PointerHighlight/DocsPointerHighlightCard.vue" code lang="vue" -->

```vue [DocsPointerHighlightCard.vue]
<template>
  <div class="flex justify-center py-10">
    <UiPointerHighlight
      container-class="rounded-lg"
      rectangle-class="rounded-lg border-primary/60"
      pointer-class="text-primary"
    >
      <UiCard
        class="from-background via-muted/40 to-background m-1! w-full max-w-[320px] rounded-lg border-dashed bg-linear-to-br py-0"
      >
        <UiCardHeader class="border-b py-6">
          <UiCardTitle>Early access invite</UiCardTitle>
          <UiCardDescription>
            Join the next release preview and test features before they ship.
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-4 py-6">
          <p class="text-muted-foreground text-sm">
            Get early builds, changelog previews, and a private feedback channel with the team.
          </p>
          <UiButton class="w-full">Request invite</UiButton>
        </UiCardContent>
      </UiCard>
    </UiPointerHighlight>
  </div>
</template>
```

<!-- /automd -->

::

### Marketing grid

::prose-show-case

:DocsPointerHighlightMarketing

#code

<!-- automd:file src="../../app/components/content/Docs/PointerHighlight/DocsPointerHighlightMarketing.vue" code lang="vue" -->

```vue [DocsPointerHighlightMarketing.vue]
<template>
  <div class="mx-auto grid max-w-4xl grid-cols-1 gap-4 py-20 sm:grid-cols-3">
    <div class="rounded-md p-6">
      <div class="h-40 w-full rounded-lg bg-linear-to-r from-blue-200 to-sky-200" />
      <div class="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
        <UiPointerHighlight
          container-class="mr-1 inline-block align-middle"
          rectangle-class="rounded-xl border-neutral-300 bg-neutral-200 leading-loose dark:border-neutral-600 dark:bg-neutral-700"
          pointer-class="size-3 text-yellow-500"
        >
          <span class="relative z-10">collab tool</span>
        </UiPointerHighlight>
        of the century with max benefits and minimal effort.
      </div>
      <p class="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Our state of the art collab tool of the century with max benefits.
      </p>
    </div>

    <div class="rounded-md p-6">
      <div class="h-40 w-full rounded-lg bg-linear-to-r from-blue-200 to-purple-200" />
      <div class="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
        Discover our
        <UiPointerHighlight
          container-class="mx-1 inline-block align-middle"
          rectangle-class="rounded-xl border-blue-300 bg-blue-100 leading-loose dark:border-blue-700 dark:bg-blue-900"
          pointer-class="size-3 text-blue-500"
        >
          <span class="relative z-10">innovative </span>
        </UiPointerHighlight>
        solutions for your business needs.
      </div>
      <p class="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Transforming ideas into reality with cutting-edge technology and expert guidance.
      </p>
    </div>

    <div class="rounded-md p-6">
      <div class="h-40 w-full rounded-lg bg-linear-45 from-green-200 to-yellow-200" />
      <div class="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
        Experience the future with our
        <UiPointerHighlight
          container-class="ml-1 inline-block align-middle"
          rectangle-class="rounded-xl border-green-300 bg-green-100 leading-loose dark:border-green-700 dark:bg-green-900"
          pointer-class="size-3 text-green-500"
        >
          <span class="relative z-10">sustainable technology</span>
        </UiPointerHighlight>
        .
      </div>
      <p class="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Eco-friendly solutions designed for a better tomorrow and reduced environmental impact.
      </p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Class customization

Use `containerClass`, `rectangleClass`, and `pointerClass` to control the spacing and appearance of the highlight treatment.

::prose-show-case

:DocsPointerHighlightClasses

#code

<!-- automd:file src="../../app/components/content/Docs/PointerHighlight/DocsPointerHighlightClasses.vue" code lang="vue" -->

```vue [DocsPointerHighlightClasses.vue]
<template>
  <div class="grid gap-8 py-10 @4xl:grid-cols-3">
    <div class="flex justify-center">
      <UiPointerHighlight container-class="rounded-[2rem] bg-muted/40 ">
        <UiButton variant="outline" class="m-4! rounded-xl">Container spacing</UiButton>
      </UiPointerHighlight>
    </div>

    <div class="flex justify-center">
      <UiPointerHighlight
        rectangle-class="rounded-2xl border-dashed border-emerald-500/70 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]"
      >
        <div class="bg-card rounded-2xl border px-6 py-4 text-sm font-medium">Custom rectangle</div>
      </UiPointerHighlight>
    </div>

    <div class="flex justify-center">
      <UiPointerHighlight
        pointer-class="text-rose-500 size-6 drop-shadow-[0_0_12px_rgba(244,63,94,0.45)]"
      >
        <div class="bg-primary/10 text-primary rounded-2xl px-6 py-4 text-sm font-medium">
          Custom pointer
        </div>
      </UiPointerHighlight>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
