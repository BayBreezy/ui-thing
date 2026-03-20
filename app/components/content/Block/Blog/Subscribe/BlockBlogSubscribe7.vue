<template>
  <Motion
    as-child
    initial="initial"
    while-in-view="animate"
    :variants="{
      initial: { opacity: 0, rotateX: -15 },
      animate: {
        opacity: 1,
        rotateX: 0,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.1),
        },
      },
    }"
  >
    <UiCard class="bg-primary text-primary-foreground shadow-2xl">
      <UiCardContent>
        <div class="mb-6 flex items-start justify-between">
          <div class="flex-1">
            <Motion
              :variants="{
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
              }"
            >
              <UiBadge
                variant="secondary"
                class="mb-3 bg-primary-foreground/20 text-primary-foreground"
              >
                <Icon name="lucide:trending-up" class="size-3" />
                Popular choice
              </UiBadge>
            </Motion>
            <Motion
              as="h3"
              :variants="{
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
              }"
              class="mb-2 text-2xl font-bold"
            >
              Get premium content
            </Motion>
            <Motion
              as="p"
              :variants="{
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
              }"
              class="text-primary-foreground/80"
            >
              Access exclusive articles, in-depth guides, and expert analysis.
            </Motion>
          </div>
          <Motion
            :variants="{
              initial: { scale: 0, rotate: -180 },
              animate: {
                scale: 1,
                rotate: 0,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              },
            }"
            class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20"
          >
            <Icon name="lucide:crown" class="size-6" />
          </Motion>
        </div>

        <Motion
          :variants="{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="mb-6 grid grid-cols-2 gap-3"
        >
          <div class="rounded-lg bg-primary-foreground/10 p-3">
            <div class="mb-1 text-2xl font-bold">50+</div>
            <div class="text-xs text-primary-foreground/80">Articles monthly</div>
          </div>
          <div class="rounded-lg bg-primary-foreground/10 p-3">
            <div class="mb-1 text-2xl font-bold">5K+</div>
            <div class="text-xs text-primary-foreground/80">Active readers</div>
          </div>
        </Motion>

        <form class="space-y-3">
          <Motion
            :variants="{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }"
          >
            <UiVeeInput
              required
              placeholder="Enter your email"
              aria-label="Email address"
              class="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:border-primary-foreground focus-visible:ring-primary-foreground/30"
            />
          </Motion>
          <Motion
            :variants="{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }"
          >
            <UiButton
              size="lg"
              class="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              type="submit"
            >
              Start reading
              <Icon name="lucide:arrow-right" class="size-4" />
            </UiButton>
          </Motion>
        </form>

        <Motion
          :variants="{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
          }"
          class="mt-4 flex items-center justify-center gap-2 text-xs text-primary-foreground"
        >
          <Icon name="lucide:shield" class="size-3.5" />
          <span>Your data is safe with us. No spam, ever.</span>
        </Motion>
      </UiCardContent>
    </UiCard>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
</script>
