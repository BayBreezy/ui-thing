<template>
  <Motion
    :variants="parentVariant"
    initial="initial"
    while-in-view="animate"
    class="relative overflow-hidden"
  >
    <div class="from-primary/5 via-background to-background absolute inset-0 bg-linear-to-br" />

    <div class="relative flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:p-5">
      <div class="flex flex-1 items-center gap-4">
        <Motion
          :variants="dotParentVariant"
          initial="initial"
          while-in-view="animate"
          class="border-primary/50 flex size-16 shrink-0 items-center justify-center gap-2 rounded-full border"
        >
          <Motion
            v-for="dot in 3"
            :key="dot"
            :variants="dotVariant"
            class="bg-primary size-2 rounded-full"
          />
        </Motion>
        <div class="flex-1">
          <Motion
            :variants="{
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
            }"
          >
            <div class="flex items-center gap-2">
              <h3 class="font-semibold" v-html="title" />
              <UiBadge variant="secondary" class="h-5">
                <Icon name="lucide:sparkles" class="size-3" />
                {{ badgeText }}
              </UiBadge>
            </div>
          </Motion>
          <Motion
            :variants="{
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
            }"
          >
            <p class="text-muted-foreground mt-1 text-sm" v-html="description" />
          </Motion>
        </div>
      </div>

      <Motion
        :variants="{
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
        }"
        class="grid shrink-0 items-center gap-2 lg:flex"
      >
        <UiButton size="sm" variant="default" class="group shadow-sm">
          {{ buttonText }}
          <Icon
            name="lucide:arrow-right"
            class="size-4 transition-transform group-hover:translate-x-1"
          />
        </UiButton>
        <UiButton aria-label="Close banner" size="icon-sm" variant="ghost" class="hidden lg:flex">
          <Icon name="lucide:x" class="text-muted-foreground size-4" />
        </UiButton>
      </Motion>
    </div>

    <Motion
      :variants="{
        initial: { width: 0 },
        animate: { width: progressWidth, transition: { duration: 1, ease: 'easeOut' } },
      }"
      class="bg-primary relative h-1"
    />
    <Motion
      as-child
      :variants="{
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
      }"
    >
      <UiButton
        aria-label="Close banner"
        size="icon-sm"
        variant="ghost"
        class="absolute top-4 right-4 lg:hidden"
      >
        <Icon name="lucide:x" class="text-muted-foreground size-4" />
      </UiButton>
    </Motion>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { delayChildren: stagger(0.1) },
    },
  };
  const dotParentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1, when: "beforeChildren", delayChildren: stagger(0.1) },
    },
  };
  const dotVariant: MotionProps["variants"] = {
    initial: { scale: 0.5, opacity: 0, x: -10 },
    animate: {
      scale: 1,
      opacity: 1,
      x: 0,
    },
  };
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      buttonText?: string;
      badgeText?: string;
      progressWidth?: string;
    }>(),
    {
      title: "Limited Time Offer",
      description: "Get 3 months free when you sign up for an annual plan today.",
      buttonText: "Claim offer",
      badgeText: "Trending",
      progressWidth: "60%",
    }
  );
</script>
