<template>
  <Motion
    as-child
    initial="initial"
    while-in-view="animate"
    :variants="{
      initial: { opacity: 0, scale: 0.95, y: 10 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.1),
          type: 'keyframes',
        },
      },
    }"
  >
    <UiCard class="relative overflow-hidden shadow-xs">
      <div class="absolute top-0 right-0 size-40 bg-primary/10 blur-3xl" />
      <div class="absolute bottom-0 left-0 size-52 bg-primary/5 blur-3xl" />

      <UiCardContent class="relative">
        <div class="mb-6 flex items-start justify-between">
          <div>
            <Motion
              :variants="{
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
              }"
            >
              <UiBadge variant="default" class="mb-3">
                <Icon name="lucide:zap" class="size-3" />
                Weekly insights
              </UiBadge>
            </Motion>
            <Motion
              as="h3"
              :variants="{
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
              }"
              class="text-2xl font-bold"
            >
              Join our newsletter
            </Motion>
          </div>
          <Motion
            :variants="{
              initial: { scale: 0, opacity: 0 },
              animate: {
                scale: 1,
                opacity: 1,
                transition: { type: 'spring', stiffness: 200, damping: 15 },
              },
            }"
            class="flex size-14 shrink-0 items-center justify-center rounded-full bg-radial via-transparent via-40% to-primary/40"
          >
            <Icon name="lucide:newspaper" class="size-5 text-primary" />
          </Motion>
        </div>

        <Motion
          as="p"
          :variants="{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="mb-6 text-muted-foreground"
        >
          Subscribe to receive curated articles, industry news, and expert tips delivered weekly.
        </Motion>

        <Motion
          :variants="{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="mb-6 space-y-2"
        >
          <div class="flex items-center gap-2 text-sm">
            <Icon name="lucide:check-circle-2" class="size-4 text-primary" />
            <span>Exclusive content and early access</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <Icon name="lucide:check-circle-2" class="size-4 text-primary" />
            <span>No spam, unsubscribe anytime</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <Icon name="lucide:check-circle-2" class="size-4 text-primary" />
            <span>Join 10,000+ readers worldwide</span>
          </div>
        </Motion>

        <form class="space-y-3">
          <Motion
            :variants="{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }"
          >
            <UiVeeInput required placeholder="Enter your email" aria-label="Email address" />
          </Motion>
          <Motion
            :variants="{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }"
          >
            <UiButton size="lg" class="w-full" type="submit">
              Get started free
              <Icon name="lucide:arrow-right" class="size-4" />
            </UiButton>
          </Motion>
        </form>
      </UiCardContent>
    </UiCard>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
</script>
