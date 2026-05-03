<template>
  <!-- 
    Minimal career page with search and featured positions
    Features: Search bar, featured job highlight, clean minimal design
  -->
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.1),
        },
      },
    }"
  >
    <UiContainer class="py-16 lg:py-24">
      <!-- Header with search -->
      <div class="mx-auto mb-16 max-w-3xl text-center">
        <Motion as="h1" :variants="childVariant" class="mb-4 text-4xl font-bold lg:text-5xl">
          Work with us
        </Motion>
        <Motion as="p" :variants="childVariant" class="text-muted-foreground mb-8 text-lg">
          Help us build products that millions of people love to use
        </Motion>

        <Motion :variants="childVariant">
          <div class="relative mx-auto max-w-md">
            <UiVeeInput placeholder="Search positions..." icon="lucide:search" />
          </div>
        </Motion>
      </div>

      <!-- Featured position -->
      <Motion :variants="childVariant" class="mb-12">
        <UiCard class="border-primary/20 bg-primary/5 overflow-hidden border-2 py-0">
          <UiCardContent class="p-0">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-12">
              <!-- Image -->
              <div class="md:col-span-4">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Featured role"
                  class="h-full w-full object-cover md:min-h-[300px]"
                />
              </div>

              <!-- Content -->
              <div class="p-6 md:col-span-8 md:flex md:flex-col md:justify-center">
                <UiBadge class="bg-primary text-primary-foreground mb-3 w-fit">Featured</UiBadge>
                <h3 class="mb-2 text-2xl font-bold lg:text-3xl">Head of Engineering</h3>
                <p class="text-muted-foreground mb-4 lg:text-lg">
                  Lead our engineering team and shape the future of our technology stack. We're
                  looking for a visionary leader with deep technical expertise.
                </p>

                <div class="mb-4 flex flex-wrap gap-4 text-sm">
                  <span class="flex items-center gap-2">
                    <Icon name="lucide:map-pin" class="text-primary h-4 w-4" />
                    San Francisco, CA / Remote
                  </span>
                  <span class="flex items-center gap-2">
                    <Icon name="lucide:briefcase" class="text-primary h-4 w-4" />
                    Full-time
                  </span>
                  <span class="flex items-center gap-2">
                    <Icon name="lucide:dollar-sign" class="text-primary h-4 w-4" />
                    $180k - $250k
                  </span>
                </div>

                <div class="flex flex-wrap gap-3">
                  <UiButton>
                    Apply now
                    <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
                  </UiButton>
                  <UiButton variant="outline">Learn more</UiButton>
                </div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </Motion>

      <!-- All positions list -->
      <Motion :variants="childVariant" class="mb-8">
        <h2 class="text-2xl font-semibold">All open positions</h2>
      </Motion>

      <div class="space-y-4">
        <Motion
          v-for="n in 8"
          :key="n"
          :variants="childVariant"
          :transition="{
            delay: n * 0.05,
          }"
        >
          <UiCard class="group hover:border-primary/30 transition-all hover:shadow-md">
            <UiCardContent class="p-6">
              <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div class="flex-1">
                  <div class="mb-2 flex flex-wrap items-center gap-2">
                    <h3 class="group-hover:text-primary text-lg font-semibold transition-colors">
                      Software Engineer
                    </h3>
                    <UiBadge variant="outline" size="sm">Engineering</UiBadge>
                  </div>
                  <div class="text-muted-foreground flex flex-wrap gap-4 text-sm">
                    <span class="flex items-center gap-1">
                      <Icon name="lucide:map-pin" class="h-3.5 w-3.5" />
                      Remote
                    </span>
                    <span class="flex items-center gap-1">
                      <Icon name="lucide:clock" class="h-3.5 w-3.5" />
                      Full-time
                    </span>
                    <span class="flex items-center gap-1">
                      <Icon name="lucide:dollar-sign" class="h-3.5 w-3.5" />
                      $100k - $140k
                    </span>
                  </div>
                </div>

                <div class="flex gap-2">
                  <UiButton variant="outline" size="sm"> View details </UiButton>
                  <UiButton size="sm">Apply</UiButton>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

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
