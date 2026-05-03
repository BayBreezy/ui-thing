<template>
  <Motion
    :initial="{ opacity: 0, y: -20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ type: 'spring', stiffness: 300, damping: 25 }"
  >
    <UiContainer
      class="from-primary/10 via-primary/5 to-background relative overflow-hidden rounded-lg border bg-linear-to-r p-4 shadow-lg lg:p-5"
    >
      <div class="bg-primary/10 absolute -top-8 -right-8 size-32 rounded-full blur-3xl" />
      <div class="bg-primary/10 absolute -bottom-8 -left-8 size-32 rounded-full blur-3xl" />

      <div class="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-start">
          <Motion
            :initial="{ scale: 0, rotate: -180 }"
            :animate="{ scale: 1, rotate: 0 }"
            :transition="{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }"
            class="bg-primary text-primary-foreground flex size-12 shrink-0 items-center justify-center rounded-full shadow-lg"
          >
            <Icon :name="icon" class="size-6" />
          </Motion>
          <div class="flex-1">
            <Motion
              :initial="{ opacity: 0, x: -10 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ delay: 0.2 }"
            >
              <h3 class="text-lg font-bold" v-html="title" />
            </Motion>
            <Motion
              :initial="{ opacity: 0, x: -10 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ delay: 0.3 }"
            >
              <p class="text-muted-foreground mt-1 text-sm" v-html="description" />
            </Motion>
          </div>
        </div>
        <Motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ delay: 0.4, type: 'spring', stiffness: 300, damping: 25 }"
          class="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap"
        >
          <UiButton size="sm" class="shadow-sm">
            <Icon name="lucide:arrow-right" class="size-4" />
            Get Started
          </UiButton>
          <UiButton size="sm" variant="outline" class="bg-transparent shadow-sm">
            Learn More
          </UiButton>
          <UiButton class="hidden lg:flex" size="icon-sm" variant="ghost" aria-label="Close banner">
            <Icon name="lucide:x" class="text-muted-foreground size-4" />
          </UiButton>
        </Motion>
      </div>

      <UiButton
        class="absolute top-2 right-2 lg:hidden"
        size="icon-sm"
        variant="ghost"
        aria-label="Close banner"
      >
        <Icon name="lucide:x" class="text-muted-foreground size-4" />
      </UiButton>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
    }>(),
    {
      title: "🎉 New Feature Available!",
      description:
        "We've just launched our most requested feature. Try it now and boost your productivity.",
      icon: "lucide:rocket",
    }
  );
</script>
