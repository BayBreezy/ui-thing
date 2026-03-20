<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="containerVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <div class="grid gap-8 lg:grid-cols-[1fr_550px]">
        <Motion as-child :variants="childVariant">
          <div>
            <h2 class="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
              Get our latest updates
            </h2>
            <p class="text-muted-foreground">
              Join thousands of professionals who stay ahead with our weekly newsletter.
            </p>
          </div>
        </Motion>
        <Motion as-child :variants="childVariant">
          <div>
            <form class="space-y-4">
              <div class="flex flex-col gap-3 sm:flex-row">
                <UiVeeInput
                  class="flex-1"
                  type="email"
                  required
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                />
                <UiButton type="submit" class="whitespace-nowrap">Subscribe</UiButton>
              </div>
              <div class="grid gap-4 sm:grid-cols-3">
                <div class="flex items-start gap-3">
                  <div class="mt-1 rounded-lg bg-primary/10 p-2">
                    <Icon name="lucide:mail" class="size-4 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium">Weekly digest</p>
                    <p class="text-sm text-muted-foreground">Curated content every Monday</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="mt-1 rounded-lg bg-primary/10 p-2">
                    <Icon name="lucide:bell" class="size-4 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium">Instant updates</p>
                    <p class="text-sm text-muted-foreground">Breaking news alerts</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="mt-1 rounded-lg bg-primary/10 p-2">
                    <Icon name="lucide:gift" class="size-4 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium">Exclusive offers</p>
                    <p class="text-sm text-muted-foreground">Subscriber-only deals</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const containerVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.15),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };
</script>
