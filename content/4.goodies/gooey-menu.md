---
title: Gooey Menu
description: Display a gooey menu that expands to display a list of items.
---

## Credits

Shout out to [Julien Thibeaut](https://ibelick.com/) for the source code. I discovered this gooey menu while browsing his website.

## Usage

### Basic

This may not be a component that can be reused across multiple projects, but it's a fun one to have in your back pocket.

::ShowCase

:DocsGooeyMenu

#code

<!-- automd:file src="../../app/components/content/Docs/GooeyMenu/DocsGooeyMenu.vue" code lang="vue" -->

```vue [DocsGooeyMenu.vue]
<template>
  <div>
    <div class="relative h-[300px] w-full">
      <nav
        class="menu"
        :style="{
          filter: 'url(#gooey)',
          width: '100%',
          height: '100%',
          '--spring-easing':
            'linear(0, 0.88117 15.492%, 1.09261 23.232%, 1.10421 28.713%, 0.99031 49.585%,0.99995)',
        }"
      >
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <input id="menu" type="checkbox" class="peer hidden" name="menu" />
        <label
          class="absolute bottom-10 right-10 z-10 flex size-14 scale-125 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-1000 [transition-timing-function:var(--spring-easing)] peer-checked:rotate-[135deg] peer-checked:scale-100"
          for="menu"
        >
          <Icon name="lucide:plus" class="size-5" />
        </label>
        <button
          class="absolute bottom-10 right-10 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 ease-in peer-checked:translate-y-[-80px] peer-checked:duration-1000 peer-checked:[transition-timing-function:var(--spring-easing)]"
        >
          <Icon name="lucide:settings-2" class="size-5" />
        </button>
        <button
          class="absolute bottom-10 right-10 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 ease-in peer-checked:translate-y-[-162px] peer-checked:duration-1000 peer-checked:[transition-timing-function:var(--spring-easing)]"
        >
          <Icon name="lucide:heart" class="size-5" />
        </button>
      </nav>
      <svg
        class="absolute hidden"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
