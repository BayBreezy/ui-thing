---
title: Button
description: A button is a component that is used to trigger an action.
---

## Source code

Click :SourceCodeLink{component="Button.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add button
```

## Plain Buttons

Here we have a few examples of the plain buttons.

### Default Button

::ShowCase

:DocsButtonDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonDefault.vue" code lang="vue" -->

```vue [DocsButtonDefault.vue]
<template>
  <div class="text-center">
    <UiButton>Default</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Secondary Button

::ShowCase

:DocsButtonSecondary

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonSecondary.vue" code lang="vue" -->

```vue [DocsButtonSecondary.vue]
<template>
  <div class="text-center">
    <UiButton variant="secondary">Secondary</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### With Icon

::ShowCase

:DocsButtonWithIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonWithIcon.vue" code lang="vue" -->

```vue [DocsButtonWithIcon.vue]
<template>
  <div class="text-center">
    <UiButton><Icon class="size-4" name="lucide:mail" /> Login with Email</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Loading

::ShowCase

:DocsButtonLoading

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonLoading.vue" code lang="vue" -->

```vue [DocsButtonLoading.vue]
<template>
  <div class="text-center">
    <UiButton loading>Please wait...</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Outline

::ShowCase

:DocsButtonOutline

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonOutline.vue" code lang="vue" -->

```vue [DocsButtonOutline.vue]
<template>
  <div class="text-center">
    <UiButton variant="outline">Outline</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Destructive

::ShowCase

:DocsButtonDestructive

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonDestructive.vue" code lang="vue" -->

```vue [DocsButtonDestructive.vue]
<template>
  <div class="text-center">
    <UiButton variant="destructive">Destructive</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Ghost

::ShowCase

:DocsButtonGhost

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonGhost.vue" code lang="vue" -->

```vue [DocsButtonGhost.vue]
<template>
  <div class="text-center">
    <UiButton variant="ghost"><Icon name="lucide:ghost" class="size-4" />Ghost</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Link

::ShowCase

:DocsButtonLink

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonLink.vue" code lang="vue" -->

```vue [DocsButtonLink.vue]
<template>
  <div class="text-center">
    <UiButton variant="link">Visit Page</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Icon

::ShowCase

:DocsButtonIconOnly

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonIconOnly.vue" code lang="vue" -->

```vue [DocsButtonIconOnly.vue]
<template>
  <div class="text-center">
    <UiButton size="icon" variant="outline">
      <Icon class="size-4" name="lucide:activity" />
    </UiButton>
  </div>
</template>
```

<!-- /automd -->

::

## Sizes

Here are the different sizes that are available for the buttons.

### Regular Button Sizes

::ShowCase

:DocsButtonSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonSizes.vue" code lang="vue" -->

```vue [DocsButtonSizes.vue]
<template>
  <div class="flex items-center justify-center gap-2">
    <UiButton v-for="s in sizes" :key="s" :size="s" variant="outline" class="capitalize"
      >Size {{ s }}</UiButton
    >
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["xs", "sm", "default", "lg"] as const;
</script>
```

<!-- /automd -->

::

### Icon Button Sizes

::ShowCase

:DocsButtonIconSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonIconSizes.vue" code lang="vue" -->

```vue [DocsButtonIconSizes.vue]
<template>
  <div class="flex items-center justify-center gap-3">
    <UiButton v-for="s in sizes" :key="s" :size="s" variant="outline">
      <Icon name="lucide:activity" class="size-4" />
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["icon-xs", "icon-sm", "icon"] as const;
</script>
```

<!-- /automd -->

::

## Enhanced Buttons

These are some buttons that I found today over here [Enhanced Buttons](https://enhanced-button.vercel.app/). I think they are cool.

### Expand Icon - Right

::ShowCase

:DocsButtonExpandIconRight

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonExpandIconRight.vue" code lang="vue" -->

```vue [DocsButtonExpandIconRight.vue]
<template>
  <div class="text-center">
    <UiButton variant="expandIcon" icon-placement="right" icon="lucide:arrow-right"
      >Right Icon</UiButton
    >
  </div>
</template>
```

<!-- /automd -->

::

### Expand Icon - Left

::ShowCase

:DocsButtonExpandIconLeft

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonExpandIconLeft.vue" code lang="vue" -->

```vue [DocsButtonExpandIconLeft.vue]
<template>
  <div class="text-center">
    <UiButton variant="expandIcon" icon-placement="left" icon="lucide:arrow-left"
      >Left Icon</UiButton
    >
  </div>
</template>
```

<!-- /automd -->

::

### Gooey - Left

::ShowCase

:DocsButtonGooeyLeft

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonGooeyLeft.vue" code lang="vue" -->

```vue [DocsButtonGooeyLeft.vue]
<template>
  <div class="text-center">
    <UiButton variant="gooeyLeft">Gooey Left</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Gooey - Right

::ShowCase

:DocsButtonGooeyRight

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonGooeyRight.vue" code lang="vue" -->

```vue [DocsButtonGooeyRight.vue]
<template>
  <div class="text-center">
    <UiButton variant="gooeyRight">Gooey Right</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Shine

::ShowCase

:DocsButtonShine

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonShine.vue" code lang="vue" -->

```vue [DocsButtonShine.vue]
<template>
  <div class="text-center">
    <UiButton variant="shine">Shining ✨</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Ring Hover

::ShowCase

:DocsButtonRingHover

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonRingHover.vue" code lang="vue" -->

```vue [DocsButtonRingHover.vue]
<template>
  <div class="text-center">
    <UiButton variant="ringHover">Ring Hover</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Link Hover 1

::ShowCase

:DocsButtonLinkHover1

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonLinkHover1.vue" code lang="vue" -->

```vue [DocsButtonLinkHover1.vue]
<template>
  <div class="text-center">
    <UiButton variant="linkHover1">Link Hover 1</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Link Hover 2

::ShowCase

:DocsButtonLinkHover2

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonLinkHover2.vue" code lang="vue" -->

```vue [DocsButtonLinkHover2.vue]
<template>
  <div class="text-center">
    <UiButton variant="linkHover2">Link Hover 2</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/buttons). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Animated Close Button

::ShowCase

:DocsButtonAnimatedMenu

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonAnimatedMenu.vue" code lang="vue" -->

```vue [DocsButtonAnimatedMenu.vue]
<template>
  <div class="text-center">
    <UiButton
      class="group"
      variant="outline"
      size="icon"
      :aria-expanded="open"
      :aria-label="open ? 'Close menu' : 'Open menu'"
      @click="open = !open"
    >
      <svg
        class="pointer-events-none"
        :width="16"
        :height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12L20 12"
          class="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
          d="M4 12H20"
          class="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
          d="M4 12H20"
          class="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
      </svg>
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(false);
</script>
```

<!-- /automd -->

::

### Animated Rotate Plus

::ShowCase

:DocsButtonRotatePlus

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonRotatePlus.vue" code lang="vue" -->

```vue [DocsButtonRotatePlus.vue]
<template>
  <div class="text-center">
    <UiButton
      class="group rounded-full"
      variant="outline"
      size="icon"
      :aria-expanded="open"
      :aria-label="open ? 'Close menu' : 'Open menu'"
      @click="open = !open"
    >
      <Icon
        name="lucide:plus"
        class="size-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]"
      />
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(false);
</script>
```

<!-- /automd -->

::

### Group Outline Counter

::ShowCase

:DocsButtonGroupOutlineCounter

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonGroupOutlineCounter.vue" code lang="vue" -->

```vue [DocsButtonGroupOutlineCounter.vue]
<template>
  <div class="text-center">
    <div class="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
      <UiButton
        class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        variant="outline"
        size="icon"
        aria-label="Upvote"
        @click="increment"
      >
        <Icon name="lucide:chevron-up" class="size-4" :aria-hidden="true" />
      </UiButton>
      <span class="flex items-center border border-input px-3 text-sm font-medium">{{
        counter
      }}</span>
      <UiButton
        class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        variant="outline"
        size="icon"
        aria-label="Downvote"
        @click="decrement"
      >
        <Icon name="lucide:chevron-down" class="size-4" :aria-hidden="true" />
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const counter = ref(256);
  const increment = () => counter.value++;
  const decrement = () => counter.value--;
</script>
```

<!-- /automd -->

::

### Volume Control

::ShowCase

:DocsButtonVolume

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonVolume.vue" code lang="vue" -->

```vue [DocsButtonVolume.vue]
<template>
  <div class="text-center">
    <div class="inline-flex items-center" role="group" aria-labelledby="volume-control">
      <span id="volume-control" class="sr-only"> Volume Control </span>
      <UiButton
        class="rounded-full"
        variant="outline"
        size="icon"
        aria-label="Decrease volume"
        :disabled="volume === 0"
        @click="decreaseVolume"
      >
        <Icon name="lucide:minus" size="16" aria-hidden="true" />
      </UiButton>
      <div class="flex items-center px-3 text-sm font-medium tabular-nums" aria-live="polite">
        <Icon :name="VolumeIcon" size="16" aria-hidden="true" />
        <span class="ms-2" :aria-label="`Current volume is ${volume}`">
          {{ volume }}
        </span>
      </div>
      <UiButton
        class="rounded-full"
        variant="outline"
        size="icon"
        aria-label="Increase volume"
        :disabled="volume === 6"
        @click="increaseVolume"
      >
        <Icon name="lucide:plus" size="16" aria-hidden="true" />
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const volume = ref(3);
  const decreaseVolume = () => {
    if (volume.value === 0) return;
    volume.value--;
  };
  const increaseVolume = () => {
    if (volume.value === 6) return;
    volume.value++;
  };

  const VolumeIcon = computed(() =>
    volume.value === 0
      ? "lucide:volume-x"
      : volume.value < 3
        ? "lucide:volume"
        : volume.value < 5
          ? "lucide:volume-1"
          : "lucide:volume-2"
  );
</script>
```

<!-- /automd -->

::

### Animated Copy

::ShowCase

:DocsButtonAnimatedCopy

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonAnimatedCopy.vue" code lang="vue" -->

```vue [DocsButtonAnimatedCopy.vue]
<template>
  <div class="text-center">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton
          variant="outline"
          size="icon"
          class="disabled:opacity-100"
          :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
          :disabled="copied"
          @click="copy('string to copy')"
        >
          <TransitionScale mode="out-in">
            <Icon v-if="!copied" name="lucide:copy" size="16" aria-hidden="true" />
            <Icon
              v-else
              name="lucide:check"
              size="16"
              aria-hidden="true"
              class="text-emerald-500"
            />
          </TransitionScale>
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent align="center" class="px-2 py-1 text-xs"> Click to copy </UiTooltipContent>
    </UiTooltip>
  </div>
</template>

<script lang="ts" setup>
  const { copied, copy } = useClipboard();
</script>
```

<!-- /automd -->

::

### Upload Button w/ Icon

::ShowCase

:DocsButtonUpload

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonUpload.vue" code lang="vue" -->

```vue [DocsButtonUpload.vue]
<template>
  <div class="mx-auto text-center">
    <div class="inline-flex items-center gap-2 align-top">
      <div
        class="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-input"
        :aria-label="previewUrl ? 'Preview of uploaded image' : 'Default user avatar'"
      >
        <Icon
          v-if="!previewUrl"
          aria-hidden="true"
          class="size-4 opacity-60"
          name="lucide:circle-user"
        />

        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt="Preview of uploaded image"
          class="size-full object-cover"
        />
      </div>
      <div class="relative inline-block">
        <UiButton aria-haspopup="dialog" @click="open()">
          {{ fileName ? "Change image" : "Upload image" }}
        </UiButton>
      </div>
    </div>

    <TransitionExpand>
      <div v-if="fileName" class="mt-2">
        <div class="inline-flex gap-2 text-xs">
          <p class="truncate text-muted-foreground" aria-live="polite">
            {{ fileName }}
          </p>
          <button
            class="font-medium text-red-500 hover:underline"
            :aria-label="`Remove ${fileName}`"
            @click="handleRemove"
          >
            Remove
          </button>
        </div>
      </div>
    </TransitionExpand>

    <div class="sr-only" aria-live="polite" role="status">
      {{ previewUrl ? "Image uploaded and preview available" : "No image uploaded" }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { open, onChange } = useFileDialog({ accept: "image/*", multiple: false, reset: true });
  const previewUrl = ref<string | null>(null);
  const fileName = ref<string | null>(null);
  onChange(async (files) => {
    if (!files) return;
    const file = files[0];
    if (!file) return;
    fileName.value = file.name;
    const { execute } = useBase64(file);
    previewUrl.value = await execute();
  });

  const handleRemove = () => {
    previewUrl.value = null;
    fileName.value = null;
  };
</script>
```

<!-- /automd -->

::

### Arrows

::ShowCase

:DocsButtonArrows

#code

<!-- automd:file src="../../app/components/content/Docs/Button/DocsButtonArrows.vue" code lang="vue" -->

```vue [DocsButtonArrows.vue]
<template>
  <div class="text-center">
    <div class="inline-grid w-fit grid-cols-3 gap-1">
      <UiButton class="col-start-2" variant="outline" size="icon" aria-label="Pan camera up">
        <Icon name="lucide:chevron-up" class="size-4" aria-hidden="true" />
      </UiButton>
      <UiButton class="col-start-1" variant="outline" size="icon" aria-label="Pan camera left">
        <Icon name="lucide:chevron-left" class="size-4" aria-hidden="true" />
      </UiButton>
      <div class="flex items-center justify-center" aria-hidden="true">
        <Icon name="lucide:circle" class="size-5 opacity-60" />
      </div>
      <UiButton variant="outline" size="icon" aria-label="Pan camera right">
        <Icon name="lucide:chevron-right" class="size-4" aria-hidden="true" />
      </UiButton>
      <UiButton class="col-start-2" variant="outline" size="icon" aria-label="Pan camera down">
        <Icon name="lucide:chevron-down" class="size-4" aria-hidden="true" />
      </UiButton>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
