<template>
  <div class="flex flex-col items-center gap-5">
    <Tippy v-bind="options">
      <UiButton variant="outline">Hello World</UiButton>
    </Tippy>

    <Tippy max-width="320px" interactive :hide-on-click="false">
      <UiButton>Tip!</UiButton>
      <template #content="props">
        <div class="relative flex flex-col gap-1 px-2 py-3 text-sm">
          <UiButton
            variant="ghost"
            size="icon-xs"
            class="absolute right-0 top-2 size-5 p-1"
            @click="props.hide()"
          >
            <Icon class="size-3" name="lucide:x" />
          </UiButton>
          <p class="font-semibold">Building a Design System with Nuxt and Tailwind CSS</p>
          <p class="text-muted-foreground">
            Learn how to build a comprehensive design system using Tailwind CSS, including component
            architecture, and theme customization.
          </p>
          <div class="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
            8 min read <span>•</span> Updated 2 days ago
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>

<script lang="ts" setup>
  import type { TippyOptions } from "vue-tippy";

  const options: TippyOptions = {
    content: "Hello World",
    placement: "top",
    interactive: true,
  };
</script>
