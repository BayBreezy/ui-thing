<template>
  <Motion
    as-child
    initial="initial"
    while-in-view="animate"
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { when: 'beforeChildren', delayChildren: stagger(0.1), duration: 0.3 },
      },
    }"
  >
    <UiCard class="border-dashed shadow-md hover:border-primary">
      <UiCardContent>
        <div class="mb-6 text-center">
          <Motion
            :variants="{
              initial: { scale: 0, y: 10 },
              animate: {
                scale: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 400, damping: 20 },
              },
            }"
            class="mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-full bg-radial via-transparent to-primary/40"
          >
            <Motion
              as-child
              :variants="{
                initial: {},
                animate: {
                  rotate: [0, 15, -15, 15, -15, 0],
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 3,
                    repeatType: 'loop',
                  },
                },
              }"
            >
              <Icon name="lucide:bell-ring" class="size-7 text-primary" />
              <span class="sr-only">Notifications</span>
            </Motion>
          </Motion>
          <Motion
            as="h3"
            :variants="{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }"
            class="mb-2 text-xl font-bold"
          >
            Never miss an update
          </Motion>
          <Motion
            as="p"
            :variants="{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }"
            class="text-sm text-muted-foreground"
          >
            Subscribe to get our latest articles and updates
          </Motion>
        </div>

        <form class="space-y-3">
          <Motion
            :variants="{
              initial: { opacity: 0, x: -30 },
              animate: { opacity: 1, x: 0 },
            }"
          >
            <UiVeeInput
              required
              placeholder="name@company.com"
              type="email"
              aria-label="Email address"
              icon="lucide:mail"
            />
          </Motion>

          <Motion
            :variants="{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }"
          >
            <UiButton size="lg" class="w-full" type="submit">
              Subscribe to newsletter
              <Icon name="lucide:arrow-right" class="size-4" />
            </UiButton>
          </Motion>
        </form>

        <Motion
          :variants="{
            initial: { opacity: 0, scaleX: 0 },
            animate: { opacity: 1, scaleX: 1, transition: { delay: 0.4, type: 'keyframes' } },
          }"
          class="my-5 h-px origin-top bg-border"
        />

        <Motion
          :variants="{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
          }"
          class="flex items-center justify-between text-xs text-muted-foreground"
        >
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:lock" class="size-3.5" />
            <span>100% Secure</span>
          </div>
          <UiSeparator orientation="vertical" class="h-3" />
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:check" class="size-3.5" />
            <span>No spam</span>
          </div>
          <UiSeparator orientation="vertical" class="h-3" />
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:x-circle" class="size-3.5" />
            <span>Easy unsubscribe</span>
          </div>
        </Motion>
      </UiCardContent>
    </UiCard>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
</script>
