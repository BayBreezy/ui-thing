---
title: Border Beam
description: An animated beam of light which travels along the border of its container.
---

## Credits

Shout out to [Magic UI](https://magicui.design/docs/components/border-beam) for the inspiration. I actually discovered this package while browsing their website.

## Source code

Click :SourceCodeLink{component="BorderBeam.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add border-beam"}

## Usage

### Basic

Just place the border beam component inside a div with relative positioning, width, and height. You will notice the beam automatically moves around the perimeter of it's container.

::ShowCase

:DocsBorderBeam

#code

<!-- automd:file src="../../app/components/content/Docs/BorderBeam/DocsBorderBeam.vue" code lang="vue" -->

```vue [DocsBorderBeam.vue]
<template>
  <UiCard class="relative mx-auto w-[350px] overflow-hidden">
    <UiCardHeader>
      <UiCardTitle>Login</UiCardTitle>
      <UiCardDescription> Enter your credentials to access your account. </UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <UiLabel for="email">Email</UiLabel>
            <UiInput id="email" type="email" placeholder="Enter your email" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <UiLabel for="password">Password</UiLabel>
            <UiInput id="password" type="password" placeholder="Enter your password" />
          </div>
        </div>
      </form>
    </UiCardContent>
    <UiCardFooter class="flex justify-between">
      <UiButton variant="outline">Register</UiButton>
      <UiButton>Login</UiButton>
    </UiCardFooter>
    <UiBorderBeam :duration="8" :size="100" />
  </UiCard>
</template>
```

<!-- /automd -->

::

### 2 Border Beams

::ShowCase

:DocsBorderBeamTwo

#code

<!-- automd:file src="../../app/components/content/Docs/BorderBeam/DocsBorderBeamTwo.vue" code lang="vue" -->

```vue [DocsBorderBeamTwo.vue]
<template>
  <UiCard class="relative mx-auto w-[350px] overflow-hidden border-0">
    <UiCardHeader>
      <UiCardTitle>Now Playing</UiCardTitle>
      <UiCardDescription>Stairway to Heaven - Led Zeppelin</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <div class="flex flex-col items-center gap-4">
        <div class="size-48 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-xs" />
        <UiProgress :model-value="26.5" class="h-1" />
        <div class="flex w-full justify-between text-sm text-muted-foreground">
          <span>2:45</span>
          <span>8:02</span>
        </div>
      </div>
    </UiCardContent>
    <UiCardFooter class="flex justify-center gap-4">
      <UiButton variant="outline" size="icon" class="rounded-full">
        <Icon name="lucide:skip-back" class="size-4" />
      </UiButton>
      <UiButton size="icon" class="rounded-full">
        <Icon name="lucide:play" class="size-4" />
      </UiButton>
      <UiButton variant="outline" size="icon" class="rounded-full">
        <Icon name="lucide:skip-forward" class="size-4" />
      </UiButton>
    </UiCardFooter>
    <UiBorderBeam :duration="6" :size="400" class="from-transparent via-red-500 to-transparent" />
    <UiBorderBeam
      :size="400"
      :delay="3"
      :duration="6"
      class="from-transparent via-blue-500 to-transparent"
    />
  </UiCard>
</template>
```

<!-- /automd -->

::

### Reverse

::ShowCase

:DocsBorderBeamReverse

#code

<!-- automd:file src="../../app/components/content/Docs/BorderBeam/DocsBorderBeamReverse.vue" code lang="vue" -->

```vue [DocsBorderBeamReverse.vue]
<template>
  <UiCard class="relative mx-auto w-[350px] overflow-hidden border-border/30">
    <UiCardHeader>
      <UiCardTitle>Login</UiCardTitle>
      <UiCardDescription> Enter your credentials to access your account. </UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <UiLabel :for="emailId">Email</UiLabel>
            <UiInput :id="emailId" type="email" placeholder="Enter your email" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <UiLabel :for="passwordId">Password</UiLabel>
            <UiInput :id="passwordId" type="password" placeholder="Enter your password" />
          </div>
        </div>
      </form>
    </UiCardContent>
    <UiCardFooter class="flex justify-between">
      <UiButton variant="outline">Register</UiButton>
      <UiButton>Login</UiButton>
    </UiCardFooter>
    <UiBorderBeam
      :duration="4"
      :size="300"
      reverse
      class="from-transparent via-green-500 to-transparent"
    />
  </UiCard>
</template>

<script lang="ts" setup>
  const emailId = useId();
  const passwordId = useId();
</script>
```

<!-- /automd -->

::

### Spring Animation

::ShowCase

:DocsBorderBeamSpring

#code

<!-- automd:file src="../../app/components/content/Docs/BorderBeam/DocsBorderBeamSpring.vue" code lang="vue" -->

```vue [DocsBorderBeamSpring.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButton class="relative overflow-hidden" size="lg" variant="outline">
      Buy Now
      <UiBorderBeam
        :size="40"
        :initial-offset="20"
        class="from-transparent via-yellow-500 to-transparent"
        :transition="{
          type: 'spring',
          stiffness: 60,
          damping: 20,
        }"
      />
    </UiButton>
  </div>
</template>
```

<!-- /automd -->

::
