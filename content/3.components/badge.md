---
title: Badge
description: A badge is a component that is used to highlight an item's status for quick recognition.
---

## Source code

Click :SourceCodeLink{component="Badge.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add badge"}

## Variants

### Default

::prose-show-case

:DocsBadgeDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeDefault.vue" code lang="vue" -->

```vue [DocsBadgeDefault.vue]
<template>
  <div class="text-center">
    <UiBadge>Default</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Destructive

::prose-show-case

:DocsBadgeDestructive

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeDestructive.vue" code lang="vue" -->

```vue [DocsBadgeDestructive.vue]
<template>
  <div class="text-center">
    <UiBadge variant="destructive">Destructive</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Outline

::prose-show-case

:DocsBadgeOutline

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeOutline.vue" code lang="vue" -->

```vue [DocsBadgeOutline.vue]
<template>
  <div class="text-center">
    <UiBadge variant="outline">Outline</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Secondary

::prose-show-case

:DocsBadgeSecondary

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeSecondary.vue" code lang="vue" -->

```vue [DocsBadgeSecondary.vue]
<template>
  <div class="text-center">
    <UiBadge variant="secondary">Secondary</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Shadcn

::prose-show-case

:DocsBadgeShadcn

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeShadcn.vue" code lang="vue" -->

```vue [DocsBadgeShadcn.vue]
<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="flex w-full flex-wrap justify-center gap-2">
        <UiBadge>Badge</UiBadge>
        <UiBadge variant="secondary">Secondary</UiBadge>
        <UiBadge variant="destructive">Destructive</UiBadge>
        <UiBadge variant="outline">Outline</UiBadge>
      </div>
      <div class="flex w-full flex-wrap justify-center gap-2">
        <UiBadge variant="secondary" class="bg-blue-500 text-white dark:bg-blue-600">
          <Icon name="lucide:badge-check" />
          Verified
        </UiBadge>
        <UiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"> 8 </UiBadge>
        <UiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="destructive">
          99
        </UiBadge>
        <UiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
          20+
        </UiBadge>
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Origin UI

::prose-show-case

:DocsBadgeOriginU-I

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeOriginUI.vue" code lang="vue" -->

```vue [DocsBadgeOriginUI.vue]
<template>
  <div class="flex justify-center">
    <div class="flex flex-wrap justify-center gap-2">
      <UiBadge>
        <Icon name="lucide:zap" class="-ms-0.5 size-3 opacity-60" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge class="items-baseline gap-1.5">
        Badge
        <span class="text-primary-foreground/60 text-[0.625rem] font-medium"> 73 </span>
      </UiBadge>
      <UiBadge variant="outline" class="gap-1">
        <Icon name="lucide:check" class="size-3 text-emerald-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge variant="outline" class="gap-1.5">
        <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge variant="outline" class="gap-1.5">
        <span class="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge variant="outline" class="gap-1.5">
        <span class="size-1.5 rounded-full bg-red-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge
        class="has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-data-[state=unchecked]:bg-muted has-data-[state=unchecked]:text-muted-foreground relative outline-none has-focus-visible:ring-[3px]"
      >
        <UiCheckbox :id class="peer sr-only after:absolute after:inset-0" default-checked />
        <div class="hidden items-center justify-center peer-data-[state=checked]:flex">
          <Icon name="lucide:check" class="size-2.5" aria-hidden="true" />
        </div>
        <label :for="id" class="cursor-pointer select-none after:absolute after:inset-0">
          Selectable
        </label>
      </UiBadge>

      <UiBadge v-if="open" class="gap-0 rounded-full">
        Removable
        <button
          class="text-primary-foreground/60 hover:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 -my-px -ms-px -me-1.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
          @click="open = false"
        >
          <Icon name="lucide:x" class="size-3" aria-hidden="true" />
        </button>
      </UiBadge>

      <UiBadge v-if="tagActive" variant="outline" class="gap-0 rounded-md px-2">
        Tag
        <button
          class="text-foreground/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 -my-[5px] -ms-0.5 -me-2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
          aria-label="Delete"
          @click="tagActive = false"
        >
          <Icon name="lucide:x" class="size-3" aria-hidden="true" />
        </button>
      </UiBadge>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();

  const open = ref(true);
  const tagActive = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
  watch(tagActive, (value) => {
    if (!value) {
      setTimeout(() => {
        tagActive.value = true;
      }, 1000);
    }
  });
</script>
```

<!-- /automd -->

::

## Sizes

Three sizes are available for badges: `sm`, `md`, and `lg`.

::prose-show-case

:DocsBadgeSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeSizes.vue" code lang="vue" -->

```vue [DocsBadgeSizes.vue]
<template>
  <div class="flex items-center justify-center gap-2">
    <UiBadge v-for="s in sizes" :key="s" :size="s" variant="secondary">Label</UiBadge>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md", "lg"] as const;
</script>
```

<!-- /automd -->

::
